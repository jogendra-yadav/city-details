'use strict';

const express = require('express');
const app = express();
const Zipcode = require("./zipcode-controller.js");

app.listen(3001, function(){
    console.log("Yey..Server started..!!!");
    Zipcode.initDownloadZipcodeFile();
});

app.get('/getCityList', async function(req, res){
    let cityList = await Zipcode.getCityList();
    res.status(200).send({ status: "success", cityList: cityList });
});