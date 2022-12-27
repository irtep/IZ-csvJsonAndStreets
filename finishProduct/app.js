import * as fs from 'fs';

import { checkIfThere } from './functions/functions.js';

let sortedArray = undefined;

fs.readFile('../dataInput/newTest.json', 'utf8', (err, data) => {

  if (err) throw err;

  const json = JSON.parse(data);
  //console.log(json[0]);
  // this removes dublicates and ads those contacts from that, to earlier
  sortedArray = checkIfThere(json);
  console.log('sorted: ', sortedArray.length);

  // then from json to csv
// could try this: https://stackoverflow.com/questions/38244285/how-to-convert-json-array-to-csv-using-node-js
  // choose another string to temporally replace commas if necessary
let stringToReplaceComas = '!!!!';

sortedArray.map((singleRow) => {
  console.log('sR ', singleRow);
  singleRow.map((value, index) => { // tässä joku error...
    singleRow[index] = value.replace(/,/g, stringToReplaceComas);
  })
})

let csv = `"${sortedArray.join('"\n"').replace(/,/g, '","')}"`;
// // or like this
// let csv = `"${myObj.rows.join('"\n"').split(',').join('","')}"`;

csv = csv.replace(new RegExp(`${stringToReplaceComas}`, 'g'), ',');
});



  