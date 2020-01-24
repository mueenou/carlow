const router = require('express').Router();
// const Car = require('../model/Car');

router.get('/cars', function(req,res) {
    res.send('fetching cars');
    // Car.find(function(err,cars) {
    //   if(err) {
    //     console.log(err);
    //   }
    //   else {
    //     res.json(cars);
    //   }
    // });
  });

module.exports = router;
