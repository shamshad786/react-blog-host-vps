const router = require('express').Router()
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Post = require('../models/Post');

 
//TODO: UPDATE
router.put('/:id', async(req, res)=>{

    console.log(req.body)
 
if(req.body.userId === req.params.id){

    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id ,{$set: req.body}
            ,{new: true});
       res.json({
           status: 201,
           message: "Update Successfully...",
           response: updatedUser
       })
    }catch(err){
        res.status(500).json(err);
    }
}else{
    res.status(401).json('you can update only your account');
}
});

//TODO: DELETE you can delete user by sending delete request on this routes

router.delete('/:id', async(req,res)=>{
    console.log(req.body.userId);
    console.log(req.params.id);
    if(req.body.userId === req.params.id){
        try{
                const user = await User.findById(req.params.id);
                try{
                    await Post.deleteMany({ username: user.username});
                    await User.findByIdAndDelete(req.params.id);
                    res.status(200).json("user has been deleted")
                }catch(err){
                    res.status(500).json(err);
                }
        }catch(err){
            res.status(401).json('user not found');
        }
    }else{
        res.status(401).json('you can delete only your account');
    }
});


//TODO: GET single user

router.get('/:id', async(req,res)=>{

    try{
        const user = await User.findById(req.params.id);
        const {password, ...otherUserData} =  user._doc
        res.json({
            status: 200,
            message: 'single user has been found',
            response: otherUserData
        })
     }catch(err){
        res.json({
            status: 500,
            message: 'Internal server error'
        })
        console.log(err)
    }
});

module.exports = router;