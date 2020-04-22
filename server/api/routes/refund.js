const express = require("express");
const fs = require('fs');
const path = require('path')
const router = express.Router();

router.post("/", function(req, res){
    const fileName = path.resolve("server",'../refundlog.json');

    fs.readFile(fileName, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now its an object
        country = 'somalia';
        value = 111;
        obj[country] = value; //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile(fileName, JSON.stringify(obj, null, 2), 'utf8', function(error){
            if(error){
                return console.log(error)
            }
        }); 
    }});

})

module.exports = router;


    //     fs.writeFile(fileName, JSON.stringify(comms, null, 2), function(err){
    //         if (err){
    //             return console.log(err);
    //         }
    //         console.log("the file was saved");
    //         res.status(200).json();
    //        // console.log(comms);
    //     });
    // } catch(err){
    //     res.status(500).json({
    //         message: "Error writing to file",
    //         error: err
    //     });
    // }
