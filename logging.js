#! /usr/bin/env node

let moment = require("moment");
let fs = require("fs");

let writeStream =  fs.createWriteStream("./logs/"+
    `${moment().format("YYYY_MMM_DD")}.log`,{flags:"a"
    //"YYYY_MMM_DD_hh_mm_ss"
    ,autoclose:true});

module.exports = ({name:name = "server", timestamp:timestamp =
moment().format("YYYY:MMM:DD:hh:mm:ss"), text:text
    , type:type="Info"}) => {
    console.log(text);
    let output = `${type}: `;

    output += timestamp;

    if (name){
        output +=`: Name: ${name}`;
    }
    if (text){
        output +=`: Message: ${text}`;
    }

    writeStream.write(output + "\n");
};
