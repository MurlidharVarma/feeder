var express = require('express');
const bodyParser = require('body-parser');

var speedometerRoutes = require('./routes/speedometer.routes.js');

var app = express();
var expressWs = require('express-ws')(app);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/speedometer", speedometerRoutes);

app.listen(8080, (req, res)=>{
    console.log("Server is listening on port 8080");
});