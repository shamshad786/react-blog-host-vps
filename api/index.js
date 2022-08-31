const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const authRoute  = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const multer = require('multer');
const path  = require('path');
const cors = require('cors');

const port = process.env.PORT || 5001

app.use(cors());
app.options('*', cors());

mongoose.connect(process.env.MONGO_URL, {
useNewUrlParser: true,
useUnifiedTopology: true
}).then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log("Database Not Connected"+ err);
}); 

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

//TODO: Uploading image

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'images');
    },
    filename: (req,file,cb)=>{
        cb(null, req.body.name);
    }
});

const upload = multer({storage: storage});
app.post('/api/upload', upload.single("file"),(req,res)=>{
    res.json({
        status: 201,
        message: 'Image Uploaded succesfully'
    })
})


app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);

app.use('/', (req,res)=>{
    res.send('REACT-BLOG Backend API Work');
});

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});