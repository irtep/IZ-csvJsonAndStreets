const fs = require('fs');
const jsonexport = require('jsonexport');
const tools = require('./functions/functions');

// input where should be a json-file
const inputFile = '../dataInput/newJson.json';
// output, where the final product comes. Should be .csv
const outputFile = '../dataOutput/visitsStatsExpample_hki_dec22.csv'

// save file. switch this, if testing and is not necessary save the results
// options: 'csv', false
const saveFile = 'csv';

// select mode, so change that string here if need to change:
const mode = 'demandStats';
/*
Modes:
'withVisits': this leaves only one row per card id, without it, every months statistics would have 
 its own row. For example: Case HardHome and Case ERBC
'calculateEmptyValues': this gives to console numbers and percentages of empty values,
 Case ERBC as well
'sanitateStreets: in this there are no visits, clicks etc. Just regular street sanitation,
for example in Case Continuacion. Also removes dublicates (wish from Continuacion),
'listingsStats': This creates a statistic display, by zip_codes, listings.
'demandStats': Same as above, but gives stats about demands (visits)
//
*/

let sortedArray = undefined;

fs.readFile(inputFile, 'utf8', async (err, data) => {

  if (err) throw err;

  const json = await JSON.parse(data);
  
  // here selects functions, depending what mode
  if (mode === 'withVisits') {
    sortedArray = tools.sortEntries(json);
    console.log('(withVisits mode) rows sorted: ', sortedArray.length);
  }
  
  if (mode === 'sanitateStreets') {
    sortedArray = tools.streetSanitation(json);
    console.log('(sanitateStreets mode)rows sorted: ', sortedArray.length);
  }  

  if (mode === 'calculateEmptyValues') {
    console.log('calculate empty values, calling...');
    sortedArray = tools.calculateEmptyValues(json);
    //console.log('(calculateEmptyValues mode)rows sorted: ', sortedArray.length);
  }   

  if (mode === 'listingsStats') {
    console.log('listings stats, calling...');
    //console.log('json: ', json);
    sortedArray = tools.listingsStats(json);
    //console.log('(calculateEmptyValues mode)rows sorted: ', sortedArray.length);
  }     

  if (mode === 'demandStats') {
    console.log('demand stats, calling...');
    //console.log('json: ', json);
    sortedArray = tools.demandStats(json);
    //console.log('(calculateEmptyValues mode)rows sorted: ', sortedArray.length);
  } 

  if (mode === 'cryptedAddress') {
    console.log('calling cryptedAddresses');
    sortedArray = tools.cryptedAddress(json);
    console.log('sorted: ', sortedArray);
  }
  // then in most cases, where we need output, this happens:
  // commented out as might need condition, while developing new stuff
  if (saveFile === 'csv') {
    const convert = jsonexport(sortedArray, function (err, csv){
      fs.writeFile(outputFile, csv, function(err) {
        if (err) return console.error(err);
        console.log(`saved as: ${outputFile}`);
      });
    });
  }

  if (saveFile === 'json') {
    // fs.writeFile( file, data, options, callback )
    fs.writeFile(outputFile, JSON.stringify(sortedArray), function(err) {
      if (err) return console.error(err);
        console.log(`saved as: ${outputFile}`);
    });
  }
});

// to start:
// check mode, from row: 11
// then maybe you want to choose a good name for this in row 8
// check that you are in right direction. Probably need to write:
// cd finishProduct first, then: 
//node app.js

  