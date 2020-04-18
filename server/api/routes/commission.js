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
    try{
        const fileName = path.resolve("server",'../commission.json');
        const file = require(fileName);
        
        file.commission.interlines = req.body.interlines;
        file.commission.domestic = req.body.domestic;

        fs.writeFile(fileName, JSON.stringify(file, null, 2), function(err){
            if (err){
                return console.log(err);
            }
            console.log("the file was saved");
            res.status(200).json({
                response: file
            });
        });
    } catch(err){
        res.status(500).json({
            message: "Error writing to file",
            error: err
        });
    }
})

module.exports = router;