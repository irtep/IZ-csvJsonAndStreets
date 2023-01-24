// sorts listings data by zip_codes
const sortByZips = (json) => {
  let zip_codes = [];
  let byZipCodes = [];

  // check all zip_codes and push them to array
  json.forEach( element => {
    dublicated = false;
      
    for (let i = 0; i < zip_codes.length; i++) {
      if (element['zip_code'] === zip_codes[i]) {
        dublicated = true;
      }
    }
    if (dublicated === false) {
      zip_codes.push(element['zip_code']);
    }

  });
  
  // give values properties, where calculations are made
  zip_codes.forEach( key => {
    const fileByZip = json.filter( entry => key === entry.zip_code );
    byZipCodes.push(fileByZip);
  })

  return byZipCodes;
};

// this makes the statistics, and divides it by build years
const createStatsByBuildYears = (json) => {
  console.log('lS starts');
  const values = {};
  const zip_codes = [];
  const priceList = []; // this gets returned
  const totalRooms = 11;        
  const yearRanges = [
    'all',
    'buildYears2021to2030',
    'buildYears2011to2020',
    'buildYears2001to2010',
    'buildYears1991to2000',
    'buildYears1981to1990',
    'buildYears1971to1980',
    'buildYears1961to1970',
    'olderThan1960'
  ];
  const prices = {};
  // fill prices and priceList:
  yearRanges.forEach( yearRange => {
    prices[yearRange] = [];
    priceList[yearRange] = [];
  })  

  // check all zip_codes and push them to array
  json.forEach( element => {
    dublicated = false;
      
    for (let i = 0; i < zip_codes.length; i++) {
      if (element['zip_code'] === zip_codes[i]) {
        dublicated = true;
      }
    }
    if (dublicated === false) {
      zip_codes.push(element['zip_code']);
    }

  });

  // give values properties, where calculations are made
  zip_codes.forEach( key => {
    values[key] = {};
    
    // add year ranges
    yearRanges.forEach( i => {
      values[key][i] = {};
    });
  })

  // ads object, where statistics are added
  for (let i = 1; i < totalRooms; i++) {
    zip_codes.forEach( zip => {
      yearRanges.forEach( yearRange => {
        values[zip][yearRange][i] = {average: 0, highest: 0, lowest: 0, quantity: 0};
      })
    });
  } 

  // check all rows and fill the values
  json.forEach( element => {
    let correctYearRange = 'undefined';

    // check correct year range
    // i dont like hardcoding, but head is empty, how i would get this nicer...
    if (element['build_year'] < 1961) { correctYearRange =  'olderThan1960'}
    if (element['build_year'] > 1960) { correctYearRange =  'buildYears1961to1970'}
    if (element['build_year'] > 1970) { correctYearRange =  'buildYears1971to1980'}
    if (element['build_year'] > 1980) { correctYearRange =  'buildYears1981to1990'}
    if (element['build_year'] > 1990) { correctYearRange =  'buildYears1991to2000'}
    if (element['build_year'] > 2000) { correctYearRange =  'buildYears2001to2010'}
    if (element['build_year'] > 2010) { correctYearRange =  'buildYears2011to2020'}
    if (element['build_year'] > 2020) { correctYearRange =  'buildYears2021to2030'}
        
    // fill prices
    // can't set the year, if user did not give, but if gave, lets put it to right place
    const summary = {
      zip: element['zip_code'], price: element['price'], year: element['build_year'], rooms: element['rooms']
    }

    if (element['build_year'] !== '' && element['price'] > 0) {
      prices[correctYearRange].push(summary);
    }
    // also, all goes to all
    if (element['price'] > 0) {        
      prices.all.push(summary);
    }
  });

  // calculate and set all to proper places
  // for each the yearRanges to access all from prices
  yearRanges.forEach( yearRange => {
    const totals = {};
    let highestRoomCount = 0;

    // check highest room count on this year range:
    prices[yearRange].forEach( range => {
      if (range.rooms > highestRoomCount) { highestRoomCount = Number(range.rooms); }
    });
    //console.log('highest room count: ', highestRoomCount);
    // create totals object:
    for (let i = 0; i < highestRoomCount + 1; i++) {
      totals[i] = {
        total: 0,
        highest: 0,
        lowest: 100000000000,
        average: 0,
        quantity: 0,
      }
    }
  // console.log('totals: ', totals[1].quantity);
    for (let i = 0; i < prices[yearRange].length; i++) {
      const currentRow = prices[yearRange][i];
      const rooms = Number(currentRow.rooms);
    // console.log('currentRow: ', currentRow);
      totals[rooms].quantity++;
      totals[rooms].total += Number(currentRow.price);
      if (totals[rooms].highest < Number(currentRow.price)) { totals[rooms].highest = Number(currentRow.price); }
      if (totals[rooms].lowest > Number(currentRow.price)) { totals[rooms].lowest = Number(currentRow.price); }
      totals[rooms].average = totals[rooms].total / totals[rooms].quantity;
    // console.log('ok, with i ', i, ' totals: ', totals[rooms]);
    }

    priceList[yearRange].summary = totals;      

  });
  console.log('pl ', priceList);
  return priceList;
}


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
  // also sanitates the streets
  sortEntries: function (json) {
    console.log('sort entries starts');
    const newArray = [];
    let indexFound = undefined;
    let dublicates = 0;
  
    json.forEach( (element, i) => {
      let isAlreadyThere = false;    
  
      // check if this card_id is already in newArray
      newArray.forEach( (ele, ii) => {
        if (ele.card_id === element.card_id) {
          isAlreadyThere = true;
          indexFound = ii;
          dublicates++;
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
  
    console.log('dublicates found: ', dublicates);
    return newArray;
  },

  // only calculates empty values as customer asked (WIP)
  calculateEmptyValues: function (json) {
    const values = {};
    var keys = [];

    // get keys from entry. json[0] is the first entry
    for(var key in json[0]) {
      if(json[0].hasOwnProperty(key)) { //to be safe
        keys.push(key);
      }
    }

    // give values properties, where calculations are made
    keys.forEach( key => {
      values[key] = {filled: 0, empty: 0, percentEmpty: 0};
    })
    
    // check all rows and fill the values
    json.forEach( element => {
      for(var key in element) {
        if(element.hasOwnProperty(key)) { //to be safe
          //console.log(element[key]);
          if (element[key] === '') {
            values[key].empty++;
          } else {
            values[key].filled++;
          }
        }
      }     
    });

    // calculate percent values
    for(var key in values) {
      const totalRows = values[key].filled + values[key].empty;

      values[key].percentEmpty = (values[key].empty / totalRows) * 100;
    }

    console.log('values: ', values);
    return values;
  },
  
  // this sanitates the streets by GDBR regulation, no visits or clicks in these handled
  // removes dublicates as well as Jatke did not want them
  streetSanitation: function (json) {
    console.log('street sanitation starts');
    const newArray = [];
    let indexFound = undefined;
    let dublicates = 0;
  
    json.forEach( (element, i) => {
      let isAlreadyThere = false;    
  
      // check if this street_address is already in newArray
      // in apartment can compare address, in other cases if address, price, size, floor matches
      newArray.forEach( (ele, ii) => {
        if (ele.street_address === element.street_address &&
        ele.price === element.price &&
        ele.floor === element.floor) {
          isAlreadyThere = true;
          indexFound = ii;
          dublicates++;
          console.log('dublicate: ', ele.street_address, ele.price, ' / ', element.street_address, element.price);
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
      } 
    });
    
    console.log('dublicates removed: ', dublicates);
    return newArray;
  },  

    // this gives statistic summary of listings
    listingsStats: function (json) {
      // first, divide by post numbers (zip_code)
      const all = [];
      const divided = sortByZips(json);
      //console.log('divided: ', divided);

      // roll all of those to createStats and push to all constant
      divided.forEach( zip => {
        const zips = createStatsByBuildYears(zip)
        all.push({area: zip[0].zip_code, stats: zips});
      });
      
      //console.log('all: ', all);
      // these are ok, just need to simplify them, so that csv will be readable.
      /*
      this kind of json works:
      values:  {
  card_id: { filled: 100, empty: 0, percentEmpty: 0 },
  card_type: { filled: 100, empty: 0, percentEmpty: 0 },
  oikotie_company_id: { filled: 64, empty: 36, percentEmpty: 36 },
  contract_type: { filled: 100, empty: 0, percentEmpty: 0 },
  street_address: { filled: 100, empty: 0, percentEmpty: 0 }...
  shows in excel:
  Column1                 Column2
  card.id.filled          100
  card.id.empty           0
  card.is.percentEmpty    0
  card_type.filled        100.....
      */
     /*
    maybe should be like:
    40100: {buildYears2021to2030: {low: 100, high: 400, average: 300}, buildYears.....} 
    */
      return all;
    },

    // crypts values of streets, for SALO case...
    cryptedAddress: function (json) {
      // not sure if this will be needed, as rare case.
      // maybe those rare cases when used, could use the old app, TheCleaner
      // https://dpera005xamk.github.io/addressCleaner/
      const all = [];
     
      return all;
    }    
}
