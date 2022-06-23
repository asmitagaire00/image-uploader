const express = require("express");
const cors = require("cors");
const app = express();
const multer = require('multer');
const path = require('path');

//configure dotenv
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());

app.use("/images",express.static(path.join(__dirname, "public/images")))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, req.body.name)
    }
  })
  
  const upload = multer({ storage: storage });

  app.post('/upload', upload.single("file"), (req,res)=>{
    try{
      console.log("success"); 
        res.status(200).json({message:"File uploaded successfully"})
    }
    catch(err){console.log("couldnot upload",err)}
  })

app.listen(8800, ()=>{
    console.log("server is running ")
})