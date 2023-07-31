const express = require('express');
const router = express.Router();
const Agencies= require("../Models/Agencies");
const jwt = require("jsonwebtoken");
const News = require("../Models/News");

//Get all Agencies
router.get("/", async function(req, res,){
    try {
    const allAgencies=await Agencies.find();
    return res.json(allAgencies);
    } catch(err){
        console.log(err);
        return res.json({"error": err});
    }
});

// register for agencies
router.post("/register", async function(req, res){
    const agency = req.body;
    try {
    const foundAgency=await Agencies.findOne({ $or: [{ publisher:agency.publisher }, { email:agency.email }] });
    if (foundAgency){
        return res.json({"Error": "Email already registered"});
    }
    await Agencies.create(agency);
    console.log("agencies created successfully");
    return res.json({"status": "Success"});
    } catch(err){
        console.log(err);
        return res.json({"error": err});
    }
});


// login for agencies
router.post("/login", async function(req, res){
    const  {email ,password,userType} = req.body;
    try {
    const foundAgency= await Agencies.findOne({email:email});
    if (!foundAgency){
        return  res.json({message : "Agency didn't existi!"})
    }
        const isPasswordValid = await bcrypt.compare(password,foundAgency.password)
    if(!isPasswordValid){
        return res.json({message:"Username or Password is not correct"})
    }

    // else if ( password ==foundAgency.password  & email == foundAgency.email)
    return res.json({message:"Username wellcome"})


      const token = jwt.sign({id: admin._id},process.env.SECRET)

//     return res.json({token,adminID: admin._id})


    } catch(err){
        console.log(err);
        return res.json({"error": err});
    }
});


router.post("/add", async function(req, res){
    const news = req.body;
    try {
    const foundNews=await News.findOne({title : news.title});
    if (foundNews){
        return res.json({"Error": "News already registered"});
    }
    await News.create(news);
    console.log("news created successfully");
    return res.json({"status": "Success"});
    } catch(err){
        console.log(err);
        return res.json({"error": err});
    }
});





module.exports = router;