const router = require('express').Router()
const User = require('../models/User');
const Post = require('../models/Post');


//TODO: Create Posts

router.post('/', async(req,res)=>{
    const postData = new Post(req.body);
    try{
        const post = await postData.save()
        res.json({
            status: 201,
            message: 'your post has been created',
            response: post
        })
    }catch(err){
        res.json({
            status: 500,
            message: 'Internal server error',
        })
        console.log(err)
    }
});


//TODO: Update post

router.put('/:id', async(req,res)=>{

  
    const post =  await Post.findById(req.params.id);
    try{
        if(post.username === req.body.username){
        try{
            const singlePost = await Post.findByIdAndUpdate(req.params.id, {$set:  req.body },{new: true});
            res.json({
                status: 200,
                message: 'Post Updated',
                response: singlePost
            });
        }catch(err){
                res.json({
                    status: 500,
                    message: 'Internal server err'
                })
                console.log(err)
        }
        }else{
            res.json({
                status: 500,
                message: 'you can only update your post'
            });
        }
    }catch(err){
        res.json({
            status: 500,
            message: 'Something Went Wrong'
        })
    }
}) 


//TODO: Delete Post


router.delete('/:id', async(req,res)=>{
    const post = await Post.findById(req.params.id);
    try{
        if(post.username === req.body.username){

        try{
            // await post.delete() ye bhi direct likh sakte hai kyu ki uper post ko id se pehle hi dundh liya hai to dubsara id find karne ki jagah direct post ko delete() ke sath call kar ke delete kar sakte  hai
             await Post.findByIdAndDelete(req.params.id)
            res.json({
                status: 200,
                message:'Your Post has been deleted'
            })
        }catch(err){
            res.json({
                status: 500,
                message: 'Internal Server Error'
            })
        }
        }else{
            res.json({
                status: 500,
                message: 'You can delete only your posts'
            })
        }
    }catch(err){
        res.json({
            status: 500,
            message: 'Something went wriong'
        })
        console.log(err)
    }
});


//TODO: GET single post

router.get('/:id', async(req,res)=>{
    
    try{
    const singlePost = await Post.findById(req.params.id);
    res.json({
        status: 200,
        message: 'fetched single post',
        response: singlePost
    });

    }catch(err){
        res.json({
            status: 500,
            message: 'Internal Server error'
        });
    }
}); 

//TODO: GET all posts & all posts of single user

router.get('/', async(req,res)=>{

    const username = req.query.username;
    const catName = req.query.cat;
    try{
        let posts;
        if(username){
            
            posts = await Post.find({username : username}).sort({"_id" : -1});
        }else if(catName){
            posts =  await Post.find({categories : {$in: [catName]}})
        }else{
            posts = await Post.find().sort({"_id" : -1});
        }
        res.json({
            status: 200,
            message: "posts Data fetched succefully",
            response: posts
        });
    }catch(err){
        res.json({
            status: 500,
            message: 'Internal Server Error'
        });
    }
});


module.exports = router