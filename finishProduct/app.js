const fs = require('fs');
const jsonexport = require('jsonexport');

let sortedArray = undefined;

// this sorts it so, that only one entry per card, contacts added.
// also sanitates the streets (not yet done)
const sortEntries = (json) => {
  const newArray = [];
  let indexFound = undefined;

  json.forEach( (element, i) => {
    let isAlreadyThere = false;    

    // check if this card_id is already in newArray
    newArray.forEach( (ele, ii) => {
      if (ele.card_id === element.card_id) {
        isAlreadyThere = true;
        indexFound = ii;
      }
    });

    // if is not, push it there
    if (isAlreadyThere === false) {
        newArray.push(element);
    } else {
        // if is, then add to old entry to these fields:
        const thisEntry = newArray[indexFound];

        // visits, web_contacts_count, application_contacts_count, calls
        thisEntry.VISITS = Number(thisEntry.VISITS) + Number(element.VISITS);
        thisEntry.WEB_CONTACTS_COUNT = Number(thisEntry.WEB_CONTACTS_COUNT) + Number(element.WEB_CONTACTS_COUNT);
        thisEntry.APPLICATION_CONTACTS_COUNT = Number(thisEntry.APPLICATION_CONTACTS_COUNT) + Number(element.APPLICATION_CONTACTS_COUNT);
        thisEntry.CALLS = Number(thisEntry.CALLS) + Number(element.CALLS);
    }
  });

  return newArray;
}

fs.readFile('../dataInput/newTest.json', 'utf8', async (err, data) => {

  if (err) throw err;

  const json = await JSON.parse(data);
  
  sortedArray = sortEntries(json);
  console.log('sorted: ', sortedArray.length);

  const convert = jsonexport(sortedArray, function (err, csv){
    fs.writeFile('../dataOutput/outputTest.csv', csv, function(err) {
      if (err) return console.error(err);
      console.log('saved!');
    });
  });

});



  