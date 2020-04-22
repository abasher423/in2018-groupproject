const express = require("express");
const fs = require('fs');
const path = require('path')
const router = express.Router();



router.get("/", function(req, res){
    try{
        let comms = JSON.parse(fs.readFileSync(path.resolve("server",'../commission.json')))
        res.status(200).json(comms);
    } catch(err){
        res.status(500).json({
            message: "Error retrieving commission(Server)"
        });
    }
}) 

router.post("/", function(req, res){
    console.log(req.body)
    try{
        const fileName = path.resolve("server",'../commission.json');
        fs.writeFile(fileName, JSON.stringify(req.body, null, 2), function(err){
            if (err){
                return console.log(err);
            }
            console.log("the file was saved");
            res.status(200).json();
            console.log(req.body);
        });
    } catch(err){
        res.status(500).json({
            message: "Error writing to file",
            error: err
        });
    }
})

module.exports = router;