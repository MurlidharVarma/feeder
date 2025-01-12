//https://getpantry.cloud/apiv1/pantry/f07e0fc1-0fff-45e3-9be1-c66bb88e3e8c/basket/SpeedOmeter
const https = require('https');
const PANTRY_NODE = "INPUT_PANTRY_ID";
const PANTRY_BASKET = "SpeedOmeter";
const PANTRY_HOST = "getpantry.cloud";
const PANTRY_PATH = `/apiv1/pantry/${PANTRY_NODE}/basket/${PANTRY_BASKET}`;

const call = (method, payload)=>{

    return new Promise((resolve, reject)=>{
        let headers = {
            'Content-Type': 'application/json',
        }

        let payloadStr = null;
        if(payload && payload!=null){
            payloadStr = JSON.stringify(payload);
            headers['Content-Length'] = payloadStr.length;
        }
        var options = {
            host: PANTRY_HOST,
            port: '443',
            path: PANTRY_PATH,
            method: method,
            headers: headers
        };
      
        // Set up the request
        var req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log('Body: ', data);
                resolve(data);
            });
        }).on("error",err=>{
            console.error("An Error Occurred: ",err);
            reject(err);
        })
      
        if(payload && payload!=null){
            // post the data
            req.write(payloadStr);
        }
        req.end();
    });

}

const get = async ()=>{
    let res = "";
    try{
        res =  await call("GET",{});
    }catch(err){
        console.log("Error Occurred", err);
    }finally{
        return res;
    }
}

const put = async (payload)=>{
    let res = "";
    try{
        res =  await call("PUT",payload);
    }catch(err){
        console.log("Error Occurred", err);
    }finally{
        return res;
    }
}

const post = async (payload)=>{
    let res = "";
    try{
        res =  await call("POST",payload);
    }catch(err){
        console.log("Error Occurred", err);
    }finally{
        return res;
    }
}

module.exports = {
    put,
    get,
    post
}