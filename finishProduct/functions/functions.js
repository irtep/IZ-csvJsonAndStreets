
// this returns the address so, that all numbers are gone
// for example kopparinkatu 2 b 99 => kopparinkatu
const takeAwayStreetNumber = (address) => {
  const numberLocations = [];
  let streetNameLength = 0;

  // check where are the numbers
  for (let i = 0; i < address.length; i++) {
    if (/^\d+$/.test(address[i])) {
      numberLocations.push(i)
    }
  }

  // determine length of the street name
  streetNameLength = numberLocations[0];

  // cut all after the street name
  let sanitated = address.slice(0, streetNameLength);

  return sanitated;
}

// this returns the address so, that leaves the street name and number, but deletes the rest
// for example kopparinkatu 2 b 99 => kopparinkatu 2, can be used with flats
const takeAwayApartmentDetails = (address) => {
  const numberLocations = [];
  let streetNameLength = 0;
  let breakPoint = null;
  let sanitated = undefined;

  // check where are the numbers
  for (let i = 0; i < address.length; i++) {
    if (/^\d+$/.test(address[i])) {
      numberLocations.push(i)
    }
  }

  //console.log('numberLocs ', numberLocations);

  // determine length of the street name
  streetNameLength = numberLocations[0];

  // remove alphabetic and all after that

  // check where is a alpabetic
  for (let i = streetNameLength; i < address.length; i++) {
  // old  const regex = /^[a-zA-Z]+$/; 
    const regex = /[a-zA-ZäöüÄÖÜ]/u; // has now umlaut support

    if (address[i].match(regex)) {
      //console.log('aspha löyty', address[i]);
      if (breakPoint === null) {
        breakPoint = i;
      }
    }
  }

  // cut everything after number/numbers
  if (breakPoint === null) {
    sanitated = address.slice(0, numberLocations[numberLocations.length-1]+1);
  } else {
    sanitated = address.slice(0, breakPoint);
  }

  return sanitated;  
}

module.exports = {
  // this sorts it so, that only one entry per card, contacts added.
  // also sanitates the streets (not yet done)
  sortEntries: function (json) {
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
          // sanitate the street
          // by building_type
          // if 1 (apartment building), then leave the street number
        if (element.building_type === 1 || element.building_type === '1') {
          element.street_address = takeAwayApartmentDetails(element.street_address);
        } else {
          // if not 1, then remove all after streetname
          element.street_address = takeAwayStreetNumber(element.street_address);
        }
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
}
