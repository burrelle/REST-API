var express = require('express');
var router = express.Router();
var Ninja = require('../models/ninjas');

//Get a list of ninjas from the database
router.get('/ninjas',function(req,res,next){
  /* Find all of the ninjas
  Ninja.find({}).then(function(ninjas){
    res.send(ninjas);
  })
  */

  //Geolocation ninjas
  Ninja.geoNear(
        {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance: 100000, spherical: true}
    ).then(function(ninjas){
        res.send(ninjas);
    }).catch(next);
});

//Add a new ninjas to the database
router.post('/ninjas', function(req, res, next){
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});

//Update a ninja in the database
router.put('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja);
        });
    }).catch(next);
});

//Delete a ninja from the database
router.delete('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    }).catch(next);
});


module.exports = router;
