const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


//TODO: Register User

router.post('/register', async(req,res)=>{
   
    console.log('Body username ',req.body.username)
    console.log('Body ',req.body.email)

        try{
            const userExist =  await User.findOne({username: req.body.username});
            if(userExist){
                res.json({
                    status: 409,
                    message: "User Already Registered With Same User Name. User Name Should be unique"
                });
            } 
            else{
                const salt = await bcrypt.genSalt(10);
                const hashPass = await bcrypt.hash(req.body.password, salt);       
                    const newUser  =  new User({username: req.body.username, email: req.body.email, password: hashPass});
                    const user = await newUser.save();
                  //  res.status(201).json({userRegisteredSuccessfully: user});
                  res.json({
                      status: 201,
                      message: 'User Registered Successfully',
                      response: user
                  })
            }
        }catch(err){
                res.status(500).json({Error: err});
                console.log('Someting went wrong ',err)
        }
});

//TODO: Login   

router.post('/login', async(req,res)=>{ 
    try{

        const user = await User.findOne({username: req.body.username});
        //FIXME: hum aise bhi validation kar sakte hai but isme error handling kam hai isliye is method ko use nahi kar rahe hai.
        // !user && res.status(404).json('user not found');
        // const validated = await bcrypt.compare(req.body.password, user.password);
        // !validated && res.status(404).json('invalid credentials');
        // res.status(200).json(user);

        //FIXME: isme yaha par mene errors handlings ki hai
        if(!user){
            res.json({
                status: 404,
                message: 'User Not registered'
            })
        }else{
            const validated = await bcrypt.compare(req.body.password, user.password);
            if(!validated){
                res.status(404).json('invalid credentials')
            }else{
                const {password, ...otherFields} = user._doc;
                res.status(200).json(otherFields);
            }
        }
    }catch(err){
        res.status(500).json({Error: "something went wrong"});
        console.log(err)
    }
});





module.exports = router;