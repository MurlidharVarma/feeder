const express = require('express');
const pantry = require('../lib/pantry.lib.js');
const router = express.Router();

const makeCall = (data)=>{
    let response = null;
    try{
        response = pantry.put(data);
    }catch(err){
        console.error("Error Occurred: ",err);
        response ="error";
    }
    return response;
}

router.get("/",(req, res, next) => {
    let value = req.query.value;
    let unit = req.query.unit;
    const data = {"value": value, "unit": unit};
    const resp = makeCall(data);
    res.send(resp);
});

module.exports = router