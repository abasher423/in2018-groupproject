const express = require("express");
const fs = require('fs');
const path = require('path')
const router = express.Router();



router.get("/", function(req, res){
    let comms = JSON.parse(fs.readFileSync(path.resolve("server",'../commission.json')))
    res.status(200).json(comms);
}) 

module.exports = router;