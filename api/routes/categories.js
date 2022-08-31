const router = require('express').Router();
const Categories = require('../models/Category');



//TODO: Create Category 

router.post('/', async(req,res)=>{

    const category = req.body;

   try{

    const newCategory = new Categories(category);
    const saveCategory = await newCategory.save()

    if(saveCategory){
        res.json({
            status: 201,
            message: "Category has been created",
            response: saveCategory
        })

    }else{
        res.json({
            status: 404,
            message: 'Category not found'
        })
    }
   }catch(err){
    res.json({
        status: 500,
        message: 'Intenal server error'
    })
   }


});

//TODO: Fetch All category

router.get('/', async(req,res)=>{
    try{
        const allCat = await Categories.find();
        if(allCat){
            res.json({
                status: 200,
                message: 'All categories fetched',
                response: allCat
            })
        }else{
            res.json({
                status: 404,
                message: 'No categories found',
            })
        }

    }catch(err){
            res.json({
                status: 500,
                message: 'Intenal Server Error'
            });
    }
});


module.exports = router;

