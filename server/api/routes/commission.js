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

        const customer = {
            name: "Newbie Co.",
            order_count: 0,
            address: "Po Box City",
        }

        var data = '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';
        
     //   file.get(404) = req.body.interlines; //file.404, file("404") ? 
    //    file.get(444) = req.body.domestic;
        var datajson = JSON.stringify(data, null, 4);
        consol

        fs.writeFile(fileName, JSON.stringify(cus, null, 2), function(err){
            if (err){
                return console.log(err);
            }
            console.log("the file was saved");
            res.status(200).json();
        });
    } catch(err){
        res.status(500).json({
            message: "Error writing to file",
            error: err
        });
    }
})

module.exports = router;