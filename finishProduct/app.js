const fs = require('fs');
const jsonexport = require('jsonexport');
const tools = require('./functions/functions');

let sortedArray = undefined;

fs.readFile('../dataInput/newTest.json', 'utf8', async (err, data) => {

  if (err) throw err;

  const json = await JSON.parse(data);
  
  sortedArray = tools.sortEntries(json);
  console.log('sorted: ', sortedArray.length);

  const convert = jsonexport(sortedArray, function (err, csv){
    fs.writeFile('../dataOutput/outputTest.csv', csv, function(err) {
      if (err) return console.error(err);
      console.log('saved!');
    });
  });

});



  