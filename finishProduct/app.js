const fs = require('fs');
const jsonexport = require('jsonexport');
const tools = require('./functions/functions');

// input where should be a json-file
const inputFile = '../dataInput/newJson.json';
// output, where the final product comes. Should be .csv
const outputFile = '../dataOutput/nayteLujakoti.csv'

let sortedArray = undefined;

fs.readFile(inputFile, 'utf8', async (err, data) => {

  if (err) throw err;

  const json = await JSON.parse(data);
  
  sortedArray = tools.sortEntries(json);
  console.log('rows sorted: ', sortedArray.length);

  const convert = jsonexport(sortedArray, function (err, csv){
    fs.writeFile(outputFile, csv, function(err) {
      if (err) return console.error(err);
      console.log('saved!');
    });
  });

});

// to start: node app.js

  