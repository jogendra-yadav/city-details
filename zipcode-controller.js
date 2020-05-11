'use strict';

const request = require('request');

const https = require('https');
const fs = require('fs');
const file = fs.createWriteStream("./downloads/node_download.pdf");

const ZipcodeModel = require("./zipcode-model.js");

var initDownloadZipcodeFile = function(){
    request({
        uri: "http://lms.labyrinthelab.com/api/ws_get_zipcode_details.php?zipcode=33186",
        method: 'GET',
        headers: {
            'access_token': 'ZiPcoDeDetAiLs'
        }
    }, async function (err, res, body) {
        if(!err){
            let responseJSON = JSON.parse(body);

            if(responseJSON.CODE == "WS200"){
                let apiData = responseJSON.RESPONSE_DATA;

                let sql = `INSERT INTO city_details (state_id, city_name, city_id, state_name, country_id, country_name) VALUES ('${ apiData.state_id }', '${ apiData.city_name }', '${ apiData.city_id }', '${ apiData.state_name }', '${ apiData.country_id }', '${ apiData.country_name }')`;

                let city_log = await ZipcodeModel(sql);

                console.log(`City logged successfully with Insert Id : ${ city_log.insertId }`);

                https.get(responseJSON.RESPONSE_DATA.file_url, function(response) {
                    response.pipe(file);
                    console.log("File Downloaded Successfully.");
                });
            }else{
                console.log(`Error : ${ responseJSON.MESSAGE }`);
            }
        }
    }).on('error', function (err) {
        console.log(err);
    });
}

var fetchCityList = async function(){
    let sql = `SELECT * FROM city_details`;

    let city_list = await ZipcodeModel(sql);

    return city_list;
}

module.exports = { initDownloadZipcodeFile: initDownloadZipcodeFile, getCityList: fetchCityList };