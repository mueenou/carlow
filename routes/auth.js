const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req, res) => {

    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send({message: error.details[0].message});
    
    // Check if the user already exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send({message: 'Email already exists'});

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
         name: req.body.name,
         email: req.body.email,
         password: hashedPassword
    });
    try {
        const savedUser = await user.save(); 
        res.send({ user: user._id });
    } catch(err) {
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    // LETS VALIDATE FIRST
    console.log(req.body);
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0]);

    // Check if the user already exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({message: 'Email or password is wrong'});

    // Check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({message: 'Invalid Password'});

    // Create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.status(200).header('auth-token', token).send({token: token});
})

module.exports = router;