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

module.exports = router;