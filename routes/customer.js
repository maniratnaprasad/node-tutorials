// const mongoose = require('mongoose');
// const express = require('express');
// const {User , validate } =require('../model/user');

// const router =express.Router();



// router.post('/', async (req,res)=>{
//     const { error } = validate(req.body);
//     if(error ) return res.status(404).send(error.details[0].message);

//     let user = await User.findOne({email:req.body.email});
//     if(user) return res.status(400).send('user already regustered');
    


//         user = new User({
//         name:req.body.name,
//         email:req.body.email,
//         password:req.body.password
//     });

//     await user.save();
//     res.send(user);

    
// });

// module.exports = router ;



const express = require('express');
const { User , validate} = require('../model/customer');



router=express.Router();

router.post('/', async (req,res)=>{
    const {error} = validate(req.body);
    if(error ) return res.status(404).send("invalid");

    let user = await User.findOne({email:req.body.email});

    if(user) return res.status(404).send("user already existed");


    user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })

    await user.save();
    res.send(user);

});


module.exports =router;