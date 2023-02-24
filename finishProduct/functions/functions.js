
// updates calculations to stat row, for demandStats
const updateDemandStatsRow = (entry, namesOfRows, visits) => {
  //console.log('stat update: ', entry[namesOfRows[0]], Number(visits));
  //if (entry[namesOfRows[0]] === undefined) {
  //  console.log('undefined in: ', namesOfRows);
  //}
  // quantities
  entry[namesOfRows[0]]++;
  // total visits
  entry[namesOfRows[1]] += Number(visits);
  // update calculations
  entry[namesOfRows[2]] = entry[namesOfRows[1]] / entry[namesOfRows[0]];

  return entry;
}

// updates the row, for demandStats
const updateDemandRow = (entry, row) => {
  // apartments:
  if (row.building_type === '1') {
    if (row.rooms === '1') {
      const rowsToUpdate = [
        'kerrostalo_yksioita_yhteensa',
        'kerrostalo_yksioiden_klikkaukset_yhteensa',
        'kerrostalo_yksiot_keskiarvo'
      ];
      entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
    }
    else if (row.rooms === '2') {
      const rowsToUpdate = [
        'kerrostalo_kaksioita_yhteensa',
        'kerrostalo_kaksioiden_klikkaukset_yhteensa',
        'kerrostalo_kaksiot_keskiarvo'
      ];
      entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
    }
    else if (Number(row.rooms) > 2) {
      const rowsToUpdate = [
        'kerrostalo_kolmiotTaiIsommat_yhteensa',
        'kerrostalo_kolmiotTaiIsommat_klikkaukset_yhteensa',
        'kerrostalo_kolmiotTaiIsommat_keskiarvo'
      ];
      entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
    }
  }
  // row houses:
  else if (row.building_type === '2') {
    if (row.rooms === '1') {
      const rowsToUpdate = [
        'rivitalo_yksioita_yhteensa',
        'rivitalo_yksioiden_klikkaukset_yhteensa',
        'rivitalo_yksiot_keskiarvo'
      ];
      entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
    }
    else if (row.rooms === '2') {
      const rowsToUpdate = [
        'rivitalo_kaksioita_yhteensa',
        'rivitalo_kaksioiden_klikkaukset_yhteensa',
        'rivitalo_kaksiot_keskiarvo'
      ];
      entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
    }
    else if (Number(row.rooms) > 2) {
      const rowsToUpdate = [
        'rivitalo_kolmiotTaiIsommat_yhteensa',
        'rivitalo_kolmiotTaiIsommat_klikkaukset_yhteensa',
        'rivitalo_kolmiotTaiIsommat_keskiarvo'
      ];
      entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
    }
  }
  // own houses:
  else if (row.building_type === '4') {
    if (row.rooms === '1') {
      const rowsToUpdate = [
        'omakotitalo_yksioita_yhteensa',
        'omakotitalo_yksioiden_klikkaukset_yhteensa',
        'omakotitalo_yksiot_keskiarvo'
      ];
      entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
    }
    else if (row.rooms === '2') {
      const rowsToUpdate = [
        'omakotitalo_kaksioita_yhteensa',
        'omakotitalo_kaksioiden_klikkaukset_yhteensa',
        'omakotitalo_kaksiot_keskiarvo'
      ];
      entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
    }
    else if (Number(row.rooms) > 2) {
      const rowsToUpdate = [
        'omakotitalo_kolmiotTaiIsommat_yhteensa',
        'omakotitalo_kolmiotTaiIsommat_klikkaukset_yhteensa',
        'omakotitalo_kolmiotTaiIsommat_keskiarvo'
      ];
      entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
    }
  }
  // others
  else {
    if (row.rooms === '1') {
      const rowsToUpdate = [
        'muut_yksioita_yhteensa',
        'muut_yksioiden_klikkaukset_yhteensa',
        'muut_yksiot_keskiarvo'
      ];
      entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
    }
    else if (row.rooms === '2') {
      const rowsToUpdate = [
        'muut_kaksioita_yhteensa',
        'muut_kaksioiden_klikkaukset_yhteensa',
        'muut_kaksiot_keskiarvo'
      ];
      entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
    }
    else if (Number(row.rooms) > 2) {
      const rowsToUpdate = [
        'muut_kolmiotTaiIsommat_yhteensa',
        'muut_kolmiotTaiIsommat_klikkaukset_yhteensa',
        'muut_kolmiotTaiIsommat_keskiarvo'
      ];
      entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
    }
  }
  return entry;
}

// updates calculations to stat row, for listingStats and clientKnowledge
const updateStatsRow = (entry, namesOfRows, price) => {
  /**
   * namesOfRows array: (part "omakotitalo" changes)
                'omakotitalo_yksioita_yhteensa',
                'omakotitalo_yksioiden_hinnat_yhteensa',
                'omakotitalo_yksiot_keskiarvo'
   */
  //}
  // quantities
  entry[namesOfRows[0]]++;
  // total price

  if (entry.postinumero === '00990') {
    console.log('adding: ', entry[namesOfRows[1]], ' and ', Number(price));
    console.log('entyr: ', entry);
  }
  entry[namesOfRows[1]] += Number(price);
  // update calculations

  //console.log('dividing: ', entry[namesOfRows[1]] , entry[namesOfRows[0]]);
  //                      total prices          /     total apartments    / 2 decimals
  entry[namesOfRows[2]] = Number((Number(entry[namesOfRows[1]]) / Number(entry[namesOfRows[0]])).toFixed(2));

  return entry;
}

// updates the row, for listingStats
// this is when creating new
const updateRow = (entry, row, squaremeters) => {
  let priceToUse = Number(row.price);

  // if should be squaremeters, then use this:
  if (squaremeters) {
    priceToUse = Number(row.price_psqm);
  }

  // apartments:
  if (row.building_type === '1') {
    if (row.rooms === '1') {
      const rowsToUpdate = [
        'kerrostalo_yksioita_yhteensa',
        'kerrostalo_yksioiden_hinnat_yhteensa',
        'kerrostalo_yksiot_keskiarvo'
      ];

      entry = updateStatsRow(entry, rowsToUpdate, priceToUse);
    }
    else if (row.rooms === '2') {
      const rowsToUpdate = [
        'kerrostalo_kaksioita_yhteensa',
        'kerrostalo_kaksioiden_hinnat_yhteensa',
        'kerrostalo_kaksiot_keskiarvo'
      ];

      entry = updateStatsRow(entry, rowsToUpdate, priceToUse);
    }
    else if (Number(row.rooms) > 2) {
      const rowsToUpdate = [
        'kerrostalo_kolmiotTaiIsommat_yhteensa',
        'kerrostalo_kolmiotTaiIsommat_hinnat_yhteensa',
        'kerrostalo_kolmiotTaiIsommat_keskiarvo'
      ];

      entry = updateStatsRow(entry, rowsToUpdate, priceToUse);
    }
  }
  // row houses:
  else if (row.building_type === '2') {
    if (row.rooms === '1') {
      const rowsToUpdate = [
        'rivitalo_yksioita_yhteensa',
        'rivitalo_yksioiden_hinnat_yhteensa',
        'rivitalo_yksiot_keskiarvo'
      ];

      entry = updateStatsRow(entry, rowsToUpdate, priceToUse);
    }
    else if (row.rooms === '2') {
      const rowsToUpdate = [
        'rivitalo_kaksioita_yhteensa',
        'rivitalo_kaksioiden_hinnat_yhteensa',
        'rivitalo_kaksiot_keskiarvo'
      ];

      entry = updateStatsRow(entry, rowsToUpdate, priceToUse);
    }
    else if (Number(row.rooms) > 2) {
      const rowsToUpdate = [
        'rivitalo_kolmiotTaiIsommat_yhteensa',
        'rivitalo_kolmiotTaiIsommat_hinnat_yhteensa',
        'rivitalo_kolmiotTaiIsommat_keskiarvo'
      ];

      entry = updateStatsRow(entry, rowsToUpdate, priceToUse);
    }
  }

  // own houses:
  else if (row.building_type === '4') {
    if (row.rooms === '1') {
      const rowsToUpdate = [
        'omakotitalo_yksioita_yhteensa',
        'omakotitalo_yksioiden_hinnat_yhteensa',
        'omakotitalo_yksiot_keskiarvo'
      ];

      entry = updateStatsRow(entry, rowsToUpdate, priceToUse);
    }

    else if (row.rooms === '2') {
      const rowsToUpdate = [
        'omakotitalo_kaksioita_yhteensa',
        'omakotitalo_kaksioiden_hinnat_yhteensa',
        'omakotitalo_kaksiot_keskiarvo'
      ];

      entry = updateStatsRow(entry, rowsToUpdate, priceToUse);
    }
    else if (Number(row.rooms) > 2) {
      const rowsToUpdate = [
        'omakotitalo_kolmiotTaiIsommat_yhteensa',
        'omakotitalo_kolmiotTaiIsommat_hinnat_yhteensa',
        'omakotitalo_kolmiotTaiIsommat_keskiarvo'
      ];

      entry = updateStatsRow(entry, rowsToUpdate, priceToUse);
    }
  }
  // others
  else {
    if (row.rooms === '1') {
      const rowsToUpdate = [
        'muut_yksioita_yhteensa',
        'muut_yksioiden_hinnat_yhteensa',
        'muut_yksiot_keskiarvo'
      ];

      entry = updateStatsRow(entry, rowsToUpdate, priceToUse);
    }
    else if (row.rooms === '2') {
      const rowsToUpdate = [
        'muut_kaksioita_yhteensa',
        'muut_kaksioiden_hinnat_yhteensa',
        'muut_kaksiot_keskiarvo'
      ];

      entry = updateStatsRow(entry, rowsToUpdate, priceToUse);
    }
    else if (Number(row.rooms) > 2) {
      const rowsToUpdate = [
        'muut_kolmiotTaiIsommat_yhteensa',
        'muut_kolmiotTaiIsommat_hinnat_yhteensa',
        'muut_kolmiotTaiIsommat_keskiarvo'
      ];
      entry = updateStatsRow(entry, rowsToUpdate, priceToUse);
    }
  }
  //console.log('returning new; ', entry);
  return entry;
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
    sanitated = address.slice(0, numberLocations[numberLocations.length - 1] + 1);
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

    json.forEach((element, i) => {
      let isAlreadyThere = false;

      // check if this card_id is already in newArray
      newArray.forEach((ele, ii) => {
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
    for (var key in json[0]) {
      if (json[0].hasOwnProperty(key)) { //to be safe
        keys.push(key);
      }
    }

    // give values properties, where calculations are made
    keys.forEach(key => {
      values[key] = { filled: 0, empty: 0, percentEmpty: 0 };
    })

    // check all rows and fill the values
    json.forEach(element => {
      for (var key in element) {
        if (element.hasOwnProperty(key)) { //to be safe
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
    for (var key in values) {
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

    json.forEach((element, i) => {
      let isAlreadyThere = false;

      // check if this street_address is already in newArray
      // in apartment can compare address, in other cases if address, price, size, floor matches
      newArray.forEach((ele, ii) => {
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
  // aka. CLIENTKNOWLEDGE case, shows average price
  listingsStats: function (json) {
    //console.log('looks like this: ', json);

    const stats = [];

    // for each all rows
    json.forEach(row => {
      let dublicated = false;
      // for each all stats, to check if zip_code already there
      stats.forEach((entry, i) => {
        if (row.zip_code === entry.postinumero) {
          // mark as dublicated
          dublicated = true;
          // and add the stats
          entry = updateRow(entry, row);
        }
      });

      // if not there already, make a new entry
      if (dublicated === false) {
        let entry = {
          // averages
          postinumero: row.zip_code,
          kerrostalo_yksiot_keskiarvo: 0,
          kerrostalo_kaksiot_keskiarvo: 0,
          kerrostalo_kolmiotTaiIsommat_keskiarvo: 0,
          rivitalo_yksiot_keskiarvo: 0,
          rivitalo_kaksiot_keskiarvo: 0,
          rivitalo_kolmiotTaiIsommat_keskiarvo: 0,
          omakotitalo_yksiot_keskiarvo: 0,
          omakotitalo_kaksiot_keskiarvo: 0,
          omakotitalo_kolmiotTaiIsommat_keskiarvo: 0,
          muut_yksiot_keskiarvo: 0,
          muut_kaksiot_keskiarvo: 0,
          muut_kolmiotTaiIsommat_keskiarvo: 0,
          // quantities
          kerrostalo_yksioita_yhteensa: 0,
          kerrostalo_kaksioita_yhteensa: 0,
          kerrostalo_kolmiotTaiIsommat_yhteensa: 0,
          rivitalo_yksioita_yhteensa: 0,
          rivitalo_kaksioita_yhteensa: 0,
          rivitalo_kolmiotTaiIsommat_yhteensa: 0,
          omakotitalo_yksioita_yhteensa: 0,
          omakotitalo_kaksioita_yhteensa: 0,
          omakotitalo_kolmiotTaiIsommat_yhteensa: 0,
          muut_yksioita_yhteensa: 0,
          muut_kaksioita_yhteensa: 0,
          muut_kolmiotTaiIsommat_yhteensa: 0,
          // prices total
          kerrostalo_yksioiden_hinnat_yhteensa: 0,
          kerrostalo_kaksioiden_hinnat_yhteensa: 0,
          kerrostalo_kolmiotTaiIsommat_hinnat_yhteensa: 0,
          rivitalo_yksioiden_hinnat_yhteensa: 0,
          rivitalo_kaksioiden_hinnat_yhteensa: 0,
          rivitalo_kolmiotTaiIsommat_hinnat_yhteensa: 0,
          omakotitalo_yksioiden_hinnat_yhteensa: 0,
          omakotitalo_kaksioiden_hinnat_yhteensa: 0,
          omakotitalo_kolmiotTaiIsommat_hinnat_yhteensa: 0,
          muut_yksioiden_hinnat_yhteensa: 0,
          muut_kaksioiden_hinnat_yhteensa: 0,
          muut_kolmiotTaiIsommat_hinnat_yhteensa: 0,
        }

        // add what it is and how much it cost

        // apartments:
        if (row.building_type === '1') {
          if (row.rooms === '1') {
            const rowsToUpdate = [
              'kerrostalo_yksioita_yhteensa',
              'kerrostalo_yksioiden_hinnat_yhteensa',
              'kerrostalo_yksiot_keskiarvo'
            ];
            entry = updateStatsRow(entry, rowsToUpdate, row.price);
          }
          else if (row.rooms === '2') {
            const rowsToUpdate = [
              'kerrostalo_kaksioita_yhteensa',
              'kerrostalo_kaksioiden_hinnat_yhteensa',
              'kerrostalo_kaksiot_keskiarvo'
            ];
            entry = updateStatsRow(entry, rowsToUpdate, row.price);
          }
          else if (Number(row.rooms) > 2) {
            const rowsToUpdate = [
              'kerrostalo_kolmiotTaiIsommat_yhteensa',
              'kerrostalo_kolmiotTaiIsommat_hinnat_yhteensa',
              'kerrostalo_kolmiotTaiIsommat_keskiarvo'
            ];
            entry = updateStatsRow(entry, rowsToUpdate, row.price);
          }
        }
        // row houses:
        else if (row.building_type === '2') {
          if (row.rooms === '1') {
            const rowsToUpdate = [
              'rivitalo_yksioita_yhteensa',
              'rivitalo_yksioiden_hinnat_yhteensa',
              'rivitalo_yksiot_keskiarvo'
            ];
            entry = updateStatsRow(entry, rowsToUpdate, row.price);
          }
          else if (row.rooms === '2') {
            const rowsToUpdate = [
              'rivitalo_kaksioita_yhteensa',
              'rivitalo_kaksioiden_hinnat_yhteensa',
              'rivitalo_kaksiot_keskiarvo'
            ];
            entry = updateStatsRow(entry, rowsToUpdate, row.price);
          }
          else if (Number(row.rooms) > 2) {
            const rowsToUpdate = [
              'rivitalo_kolmiotTaiIsommat_yhteensa',
              'rivitalo_kolmiotTaiIsommat_hinnat_yhteensa',
              'rivitalo_kolmiotTaiIsommat_keskiarvo'
            ];
            entry = updateStatsRow(entry, rowsToUpdate, row.price);
          }
        }
        // own houses:
        else if (row.building_type === '4') {
          if (row.rooms === '1') {
            const rowsToUpdate = [
              'omakotitalo_yksioita_yhteensa',
              'omakotitalo_yksioiden_hinnat_yhteensa',
              'omakotitalo_yksiot_keskiarvo'
            ];
            entry = updateStatsRow(entry, rowsToUpdate, row.price);
          }
          else if (row.rooms === '2') {
            const rowsToUpdate = [
              'omakotitalo_kaksioita_yhteensa',
              'omakotitalo_kaksioiden_hinnat_yhteensa',
              'omakotitalo_kaksiot_keskiarvo'
            ];
            entry = updateStatsRow(entry, rowsToUpdate, row.price);
          }
          else if (Number(row.rooms) > 2) {
            const rowsToUpdate = [
              'omakotitalo_kolmiotTaiIsommat_yhteensa',
              'omakotitalo_kolmiotTaiIsommat_hinnat_yhteensa',
              'omakotitalo_kolmiotTaiIsommat_keskiarvo'
            ];
            entry = updateStatsRow(entry, rowsToUpdate, row.price);
          }
        }
        // others
        else {
          if (row.rooms === '1') {
            const rowsToUpdate = [
              'muut_yksioita_yhteensa',
              'muut_yksioiden_hinnat_yhteensa',
              'muut_yksiot_keskiarvo'
            ];
            entry = updateStatsRow(entry, rowsToUpdate, row.price);
          }
          else if (row.rooms === '2') {
            const rowsToUpdate = [
              'muut_kaksioita_yhteensa',
              'muut_kaksioiden_hinnat_yhteensa',
              'muut_kaksiot_keskiarvo'
            ];
            entry = updateStatsRow(entry, rowsToUpdate, row.price);
          }
          else if (Number(row.rooms) > 2) {
            const rowsToUpdate = [
              'muut_kolmiotTaiIsommat_yhteensa',
              'muut_kolmiotTaiIsommat_hinnat_yhteensa',
              'muut_kolmiotTaiIsommat_keskiarvo'
            ];
            entry = updateStatsRow(entry, rowsToUpdate, row.price);
          }
        }
        stats.push(entry);
      }

    });
    /*
    /**
     * should try this for clientknowdledge:
     * Kerrostalo yksiöt
       Kerrostalo kaksiot
       Kerrostalo kolmiot+
       Rivitalot yhteensä
       Omakotitalot yhteensä
    */
    /*
   maybe should be like:
   {postinumero: 4100, kerrostaloYksiot: 400, kerrostaloKaksiot: 304, RivitaloYksiot: 440}
   */
    /*
       const test = [
         {postinumero: 4100, kerrostaloYksiot: 400, kerrostaloKaksiot: 304, RivitaloYksiot: 440},
         {postinumero: 4140, kerrostaloYksiot: 400, kerrostaloKaksiot: 304, RivitaloYksiot: 440},
         {postinumero: 4340, kerrostaloYksiot: 400, kerrostaloKaksiot: 304, RivitaloYksiot: 440}
       ];
       */
    //console.log('stats: ', stats);
    return stats;
  },
  // this gives statistic summary of demand
  // 
  demandStats: function (json) {
    //console.log('looks like this: ', json);

    const stats = [];

    // for each all rows
    json.forEach(row => {
      let dublicated = false;
      // for each all stats, to check if zip_code already there
      stats.forEach((entry, i) => {
        if (row.zip_code === entry.postinumero) {
          // mark as dublicated
          dublicated = true;
          // and add the stats
          entry = updateDemandRow(entry, row);
        }
      });

      // if not there already, make a new entry
      if (dublicated === false) {
        let entry = {
          // averages
          postinumero: row.zip_code,
          kerrostalo_yksiot_keskiarvo: 0,
          kerrostalo_kaksiot_keskiarvo: 0,
          kerrostalo_kolmiotTaiIsommat_keskiarvo: 0,
          rivitalo_yksiot_keskiarvo: 0,
          rivitalo_kaksiot_keskiarvo: 0,
          rivitalo_kolmiotTaiIsommat_keskiarvo: 0,
          omakotitalo_yksiot_keskiarvo: 0,
          omakotitalo_kaksiot_keskiarvo: 0,
          omakotitalo_kolmiotTaiIsommat_keskiarvo: 0,
          muut_yksiot_keskiarvo: 0,
          muut_kaksiot_keskiarvo: 0,
          muut_kolmiotTaiIsommat_keskiarvo: 0,
          // quantities
          kerrostalo_yksioita_yhteensa: 0,
          kerrostalo_kaksioita_yhteensa: 0,
          kerrostalo_kolmiotTaiIsommat_yhteensa: 0,
          rivitalo_yksioita_yhteensa: 0,
          rivitalo_kaksioita_yhteensa: 0,
          rivitalo_kolmiotTaiIsommat_yhteensa: 0,
          omakotitalo_yksioita_yhteensa: 0,
          omakotitalo_kaksioita_yhteensa: 0,
          omakotitalo_kolmiotTaiIsommat_yhteensa: 0,
          muut_yksioita_yhteensa: 0,
          muut_kaksioita_yhteensa: 0,
          muut_kolmiotTaiIsommat_yhteensa: 0,
          // visits total
          kerrostalo_yksioiden_klikkaukset_yhteensa: 0,
          kerrostalo_kaksioiden_klikkaukset_yhteensa: 0,
          kerrostalo_kolmiotTaiIsommat_klikkaukset_yhteensa: 0,
          rivitalo_yksioiden_klikkaukset_yhteensa: 0,
          rivitalo_kaksioiden_klikkaukset_yhteensa: 0,
          rivitalo_kolmiotTaiIsommat_klikkaukset_yhteensa: 0,
          omakotitalo_yksioiden_klikkaukset_yhteensa: 0,
          omakotitalo_kaksioiden_klikkaukset_yhteensa: 0,
          omakotitalo_kolmiotTaiIsommat_klikkaukset_yhteensa: 0,
          muut_yksioiden_klikkaukset_yhteensa: 0,
          muut_kaksioiden_klikkaukset_yhteensa: 0,
          muut_kolmiotTaiIsommat_klikkaukset_yhteensa: 0,
        }

        // add what it is and how many time it was clicked

        // apartments:
        if (row.building_type === '1') {
          if (row.rooms === '1') {
            const rowsToUpdate = [
              'kerrostalo_yksioita_yhteensa',
              'kerrostalo_yksioiden_klikkaukset_yhteensa',
              'kerrostalo_yksiot_keskiarvo'
            ];
            entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
          }
          else if (row.rooms === '2') {
            const rowsToUpdate = [
              'kerrostalo_kaksioita_yhteensa',
              'kerrostalo_kaksioiden_klikkaukset_yhteensa',
              'kerrostalo_kaksiot_keskiarvo'
            ];
            entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
          }
          else if (Number(row.rooms) > 2) {
            const rowsToUpdate = [
              'kerrostalo_kolmiotTaiIsommat_yhteensa',
              'kerrostalo_kolmiotTaiIsommat_klikkaukset_yhteensa',
              'kerrostalo_kolmiotTaiIsommat_keskiarvo'
            ];
            entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
          }
        }
        // row houses:
        else if (row.building_type === '2') {
          if (row.rooms === '1') {
            const rowsToUpdate = [
              'rivitalo_yksioita_yhteensa',
              'rivitalo_yksioiden_klikkaukset_yhteensa',
              'rivitalo_yksiot_keskiarvo'
            ];
            entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
          }
          else if (row.rooms === '2') {
            const rowsToUpdate = [
              'rivitalo_kaksioita_yhteensa',
              'rivitalo_kaksioiden_klikkaukset_yhteensa',
              'rivitalo_kaksiot_keskiarvo'
            ];
            entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
          }
          else if (Number(row.rooms) > 2) {
            const rowsToUpdate = [
              'rivitalo_kolmiotTaiIsommat_yhteensa',
              'rivitalo_kolmiotTaiIsommat_klikkaukset_yhteensa',
              'rivitalo_kolmiotTaiIsommat_keskiarvo'
            ];
            entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
          }
        }
        // own houses:
        else if (row.building_type === '4') {
          if (row.rooms === '1') {
            const rowsToUpdate = [
              'omakotitalo_yksioita_yhteensa',
              'omakotitalo_yksioiden_klikkaukset_yhteensa',
              'omakotitalo_yksiot_keskiarvo'
            ];
            entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
          }
          else if (row.rooms === '2') {
            const rowsToUpdate = [
              'omakotitalo_kaksioita_yhteensa',
              'omakotitalo_kaksioiden_klikkaukset_yhteensa',
              'omakotitalo_kaksiot_keskiarvo'
            ];
            entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
          }
          else if (Number(row.rooms) > 2) {
            const rowsToUpdate = [
              'omakotitalo_kolmiotTaiIsommat_yhteensa',
              'omakotitalo_kolmiotTaiIsommat_klikkaukset_yhteensa',
              'omakotitalo_kolmiotTaiIsommat_keskiarvo'
            ];
            entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
          }
        }
        // others
        else {
          if (row.rooms === '1') {
            const rowsToUpdate = [
              'muut_yksioita_yhteensa',
              'muut_yksioiden_klikkaukset_yhteensa',
              'muut_yksiot_keskiarvo'
            ];
            entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
          }
          else if (row.rooms === '2') {
            const rowsToUpdate = [
              'muut_kaksioita_yhteensa',
              'muut_kaksioiden_klikkaukset_yhteensa',
              'muut_kaksiot_keskiarvo'
            ];
            entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
          }
          else if (Number(row.rooms) > 2) {
            const rowsToUpdate = [
              'muut_kolmiotTaiIsommat_yhteensa',
              'muut_kolmiotTaiIsommat_klikkaukset_yhteensa',
              'muut_kolmiotTaiIsommat_keskiarvo'
            ];
            entry = updateDemandStatsRow(entry, rowsToUpdate, row.VISITS);
          }
        }
        stats.push(entry);
      }

    });
    /*
    /**
     * should try this for clientknowdledge:
     * Kerrostalo yksiöt
       Kerrostalo kaksiot
       Kerrostalo kolmiot+
       Rivitalot yhteensä
       Omakotitalot yhteensä
    */
    /*
   maybe should be like:
   {postinumero: 4100, kerrostaloYksiot: 400, kerrostaloKaksiot: 304, RivitaloYksiot: 440}
   */
    /*
       const test = [
         {postinumero: 4100, kerrostaloYksiot: 400, kerrostaloKaksiot: 304, RivitaloYksiot: 440},
         {postinumero: 4140, kerrostaloYksiot: 400, kerrostaloKaksiot: 304, RivitaloYksiot: 440},
         {postinumero: 4340, kerrostaloYksiot: 400, kerrostaloKaksiot: 304, RivitaloYksiot: 440}
       ];
       */
    //console.log('stats: ', stats);
    return stats;
  },

  // this gives statistic summary of listings
  // aka. CLIENTKNOWLEDGE case, shows average price, but by average by squaremeter
  clientKnowledgeAveragePricesPerSqm: function (json) {
    //console.log('looks like this: ', json);      
    const stats = [];

    // for each all rows
    json.forEach(row => {

      // only, when price is set and only if habitation type is "ownership"
      if (row.price_psqm > 1 && row.habitation_type === '1') {

        let dublicated = false;
        // for each all stats, to check if zip_code already there
        stats.forEach((entry, i) => {
          if (row.zip_code === entry.postinumero) {
            // mark as dublicated
            dublicated = true;
            // and add the stats
            //console.log('dub, goes: ', entry);
            // tässä inffejä hinnassa
            entry = updateRow(entry, row, true);
          }
        });

        // if not there already, make a new entry
        if (dublicated === false) {
          let entry = {
            // averages
            postinumero: row.zip_code,
            kunta: row.city_name,
            kerrostalo_yksiot_keskiarvo: 0,
            kerrostalo_kaksiot_keskiarvo: 0,
            kerrostalo_kolmiotTaiIsommat_keskiarvo: 0,
            rivitalo_yksiot_keskiarvo: 0,
            rivitalo_kaksiot_keskiarvo: 0,
            rivitalo_kolmiotTaiIsommat_keskiarvo: 0,
            omakotitalo_yksiot_keskiarvo: 0,
            omakotitalo_kaksiot_keskiarvo: 0,
            omakotitalo_kolmiotTaiIsommat_keskiarvo: 0,
            muut_yksiot_keskiarvo: 0,
            muut_kaksiot_keskiarvo: 0,
            muut_kolmiotTaiIsommat_keskiarvo: 0,
            // quantities
            kerrostalo_yksioita_yhteensa: 0,
            kerrostalo_kaksioita_yhteensa: 0,
            kerrostalo_kolmiotTaiIsommat_yhteensa: 0,
            rivitalo_yksioita_yhteensa: 0,
            rivitalo_kaksioita_yhteensa: 0,
            rivitalo_kolmiotTaiIsommat_yhteensa: 0,
            omakotitalo_yksioita_yhteensa: 0,
            omakotitalo_kaksioita_yhteensa: 0,
            omakotitalo_kolmiotTaiIsommat_yhteensa: 0,
            muut_yksioita_yhteensa: 0,
            muut_kaksioita_yhteensa: 0,
            muut_kolmiotTaiIsommat_yhteensa: 0,
            // prices total
            kerrostalo_yksioiden_hinnat_yhteensa: 0,
            kerrostalo_kaksioiden_hinnat_yhteensa: 0,
            kerrostalo_kolmiotTaiIsommat_hinnat_yhteensa: 0,
            rivitalo_yksioiden_hinnat_yhteensa: 0,
            rivitalo_kaksioiden_hinnat_yhteensa: 0,
            rivitalo_kolmiotTaiIsommat_hinnat_yhteensa: 0,
            omakotitalo_yksioiden_hinnat_yhteensa: 0,
            omakotitalo_kaksioiden_hinnat_yhteensa: 0,
            omakotitalo_kolmiotTaiIsommat_hinnat_yhteensa: 0,
            muut_yksioiden_hinnat_yhteensa: 0,
            muut_kaksioiden_hinnat_yhteensa: 0,
            muut_kolmiotTaiIsommat_hinnat_yhteensa: 0,
          }

          // add what it is and how much it cost
          const pricePerSqM = Number(row.price_psqm);
          //console.log('price per sqm : ', pricePerSqM);

          // apartments:
          if (row.building_type === '1') {
            if (row.rooms === '1') {
              const rowsToUpdate = [
                'kerrostalo_yksioita_yhteensa',
                'kerrostalo_yksioiden_hinnat_yhteensa',
                'kerrostalo_yksiot_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
            else if (row.rooms === '2') {
              const rowsToUpdate = [
                'kerrostalo_kaksioita_yhteensa',
                'kerrostalo_kaksioiden_hinnat_yhteensa',
                'kerrostalo_kaksiot_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
            else if (Number(row.rooms) > 2) {
              const rowsToUpdate = [
                'kerrostalo_kolmiotTaiIsommat_yhteensa',
                'kerrostalo_kolmiotTaiIsommat_hinnat_yhteensa',
                'kerrostalo_kolmiotTaiIsommat_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
          }
          // row houses:
          else if (row.building_type === '2') {
            if (row.rooms === '1') {
              const rowsToUpdate = [
                'rivitalo_yksioita_yhteensa',
                'rivitalo_yksioiden_hinnat_yhteensa',
                'rivitalo_yksiot_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
            else if (row.rooms === '2') {
              const rowsToUpdate = [
                'rivitalo_kaksioita_yhteensa',
                'rivitalo_kaksioiden_hinnat_yhteensa',
                'rivitalo_kaksiot_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
            else if (Number(row.rooms) > 2) {
              const rowsToUpdate = [
                'rivitalo_kolmiotTaiIsommat_yhteensa',
                'rivitalo_kolmiotTaiIsommat_hinnat_yhteensa',
                'rivitalo_kolmiotTaiIsommat_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
          }
          // own houses:
          else if (row.building_type === '4') {
            if (row.rooms === '1') {
              const rowsToUpdate = [
                'omakotitalo_yksioita_yhteensa',
                'omakotitalo_yksioiden_hinnat_yhteensa',
                'omakotitalo_yksiot_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
            else if (row.rooms === '2') {
              const rowsToUpdate = [
                'omakotitalo_kaksioita_yhteensa',
                'omakotitalo_kaksioiden_hinnat_yhteensa',
                'omakotitalo_kaksiot_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
            else if (Number(row.rooms) > 2) {
              const rowsToUpdate = [
                'omakotitalo_kolmiotTaiIsommat_yhteensa',
                'omakotitalo_kolmiotTaiIsommat_hinnat_yhteensa',
                'omakotitalo_kolmiotTaiIsommat_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
          }
          // others
          else {
            if (row.rooms === '1') {
              const rowsToUpdate = [
                'muut_yksioita_yhteensa',
                'muut_yksioiden_hinnat_yhteensa',
                'muut_yksiot_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
            else if (row.rooms === '2') {
              const rowsToUpdate = [
                'muut_kaksioita_yhteensa',
                'muut_kaksioiden_hinnat_yhteensa',
                'muut_kaksiot_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
            else if (Number(row.rooms) > 2) {
              const rowsToUpdate = [
                'muut_kolmiotTaiIsommat_yhteensa',
                'muut_kolmiotTaiIsommat_hinnat_yhteensa',
                'muut_kolmiotTaiIsommat_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
          }
          //console.log('uusi: ', entry); ok!
          stats.push(entry);
        }
      }
    });
    return stats;
  },

  // this gives statistic summary of listings
  // aka. CLIENTKNOWLEDGE case, shows average price, but by average by squaremeter
  // also, gives decades based on build year
  clientKnowledgeDecades: function (json) {
    //console.log('looks like this: ', json);      
    const stats = [];

    // for each all rows
    json.forEach(row => {

      // only, when price per sqm is set and only if habitation type is "ownership"
      // also build_year is needed 
      if (row.price_psqm > 1 &&
        row.habitation_type === '1' &&
        row.build_year !== undefined &&
        row.build_year !== '') {

        let vuosikymmen = 'ei tietoa';
        let dublicated = false;

        const numbered_year = Number(row.build_year);

        if (numbered_year < 1900) { vuosikymmen = '< 1900'; }
        if (numbered_year > 1899 && numbered_year < 1910) { vuosikymmen = '1900-1909'; }
        if (numbered_year > 1909 && numbered_year < 1920) { vuosikymmen = '1910-1919'; }
        if (numbered_year > 1919 && numbered_year < 1930) { vuosikymmen = '1920-1929'; }
        if (numbered_year > 1929 && numbered_year < 1940) { vuosikymmen = '1930-1939'; }
        if (numbered_year > 1939 && numbered_year < 1950) { vuosikymmen = '1940-1949'; }
        if (numbered_year > 1949 && numbered_year < 1960) { vuosikymmen = '1950-1959'; }
        if (numbered_year > 1959 && numbered_year < 1970) { vuosikymmen = '1960-1969'; }
        if (numbered_year > 1969 && numbered_year < 1980) { vuosikymmen = '1970-1979'; }
        if (numbered_year > 1979 && numbered_year < 1990) { vuosikymmen = '1980-1989'; }
        if (numbered_year > 1989 && numbered_year < 2000) { vuosikymmen = '1990-1999'; }
        if (numbered_year > 1999 && numbered_year < 2010) { vuosikymmen = '2000-2009'; }
        if (numbered_year > 2009 && numbered_year < 2020) { vuosikymmen = '2010-2019'; }
        if (numbered_year > 2019 && numbered_year < 2030) { vuosikymmen = '2020-2029'; }
        if (numbered_year > 2029 && numbered_year < 2040) { vuosikymmen = '2030-2039'; }


        // for each all stats, to check if zip_code already there
        stats.forEach((entry, i) => {
          // postinumero ja vuosikymmen jos täsmää, niin samalle riville
          if (row.zip_code === entry.postinumero &&
            vuosikymmen === entry.vuosikymmen) {
            // mark as dublicated
            dublicated = true;
            // and add the stats
            //console.log('dub, goes: ', entry);
            // tässä inffejä hinnassa
            entry = updateRow(entry, row, true);
          }
        });

        // if not there already, make a new entry
        if (dublicated === false) {

          if (vuosikymmen === 'ei tietoa') {
            console.log('vuosikymmen, ei tietoa: ', row);
          }

          let entry = {
            // averages
            vuosikymmen: vuosikymmen,
            //valmistumisvuosi: row.build_year, was in checking purpose
            postinumero: row.zip_code,
            kunta: row.city_name,
            kerrostalo_yksiot_keskiarvo: 0,
            kerrostalo_kaksiot_keskiarvo: 0,
            kerrostalo_kolmiotTaiIsommat_keskiarvo: 0,
            rivitalo_yksiot_keskiarvo: 0,
            rivitalo_kaksiot_keskiarvo: 0,
            rivitalo_kolmiotTaiIsommat_keskiarvo: 0,
            omakotitalo_yksiot_keskiarvo: 0,
            omakotitalo_kaksiot_keskiarvo: 0,
            omakotitalo_kolmiotTaiIsommat_keskiarvo: 0,
            muut_yksiot_keskiarvo: 0,
            muut_kaksiot_keskiarvo: 0,
            muut_kolmiotTaiIsommat_keskiarvo: 0,
            // quantities
            kerrostalo_yksioita_yhteensa: 0,
            kerrostalo_kaksioita_yhteensa: 0,
            kerrostalo_kolmiotTaiIsommat_yhteensa: 0,
            rivitalo_yksioita_yhteensa: 0,
            rivitalo_kaksioita_yhteensa: 0,
            rivitalo_kolmiotTaiIsommat_yhteensa: 0,
            omakotitalo_yksioita_yhteensa: 0,
            omakotitalo_kaksioita_yhteensa: 0,
            omakotitalo_kolmiotTaiIsommat_yhteensa: 0,
            muut_yksioita_yhteensa: 0,
            muut_kaksioita_yhteensa: 0,
            muut_kolmiotTaiIsommat_yhteensa: 0,
            // prices total
            kerrostalo_yksioiden_hinnat_yhteensa: 0,
            kerrostalo_kaksioiden_hinnat_yhteensa: 0,
            kerrostalo_kolmiotTaiIsommat_hinnat_yhteensa: 0,
            rivitalo_yksioiden_hinnat_yhteensa: 0,
            rivitalo_kaksioiden_hinnat_yhteensa: 0,
            rivitalo_kolmiotTaiIsommat_hinnat_yhteensa: 0,
            omakotitalo_yksioiden_hinnat_yhteensa: 0,
            omakotitalo_kaksioiden_hinnat_yhteensa: 0,
            omakotitalo_kolmiotTaiIsommat_hinnat_yhteensa: 0,
            muut_yksioiden_hinnat_yhteensa: 0,
            muut_kaksioiden_hinnat_yhteensa: 0,
            muut_kolmiotTaiIsommat_hinnat_yhteensa: 0,
          }

          // add what it is and how much it cost
          //const pricePerSqM = Number((Number(row.price) / Number(row.size)).toFixed(2)); // not needed anymore, as row.price_psqm is in snowflake
          const pricePerSqM = Number(row.price_psqm);
          //console.log('price per sqm : ', pricePerSqM);

          // apartments:
          if (row.building_type === '1') {
            if (row.rooms === '1') {
              const rowsToUpdate = [
                'kerrostalo_yksioita_yhteensa',
                'kerrostalo_yksioiden_hinnat_yhteensa',
                'kerrostalo_yksiot_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
            else if (row.rooms === '2') {
              const rowsToUpdate = [
                'kerrostalo_kaksioita_yhteensa',
                'kerrostalo_kaksioiden_hinnat_yhteensa',
                'kerrostalo_kaksiot_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
            else if (Number(row.rooms) > 2) {
              const rowsToUpdate = [
                'kerrostalo_kolmiotTaiIsommat_yhteensa',
                'kerrostalo_kolmiotTaiIsommat_hinnat_yhteensa',
                'kerrostalo_kolmiotTaiIsommat_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
          }
          // row houses:
          else if (row.building_type === '2') {
            if (row.rooms === '1') {
              const rowsToUpdate = [
                'rivitalo_yksioita_yhteensa',
                'rivitalo_yksioiden_hinnat_yhteensa',
                'rivitalo_yksiot_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
            else if (row.rooms === '2') {
              const rowsToUpdate = [
                'rivitalo_kaksioita_yhteensa',
                'rivitalo_kaksioiden_hinnat_yhteensa',
                'rivitalo_kaksiot_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
            else if (Number(row.rooms) > 2) {
              const rowsToUpdate = [
                'rivitalo_kolmiotTaiIsommat_yhteensa',
                'rivitalo_kolmiotTaiIsommat_hinnat_yhteensa',
                'rivitalo_kolmiotTaiIsommat_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
          }
          // own houses:
          else if (row.building_type === '4') {
            if (row.rooms === '1') {
              const rowsToUpdate = [
                'omakotitalo_yksioita_yhteensa',
                'omakotitalo_yksioiden_hinnat_yhteensa',
                'omakotitalo_yksiot_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
            else if (row.rooms === '2') {
              const rowsToUpdate = [
                'omakotitalo_kaksioita_yhteensa',
                'omakotitalo_kaksioiden_hinnat_yhteensa',
                'omakotitalo_kaksiot_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
            else if (Number(row.rooms) > 2) {
              const rowsToUpdate = [
                'omakotitalo_kolmiotTaiIsommat_yhteensa',
                'omakotitalo_kolmiotTaiIsommat_hinnat_yhteensa',
                'omakotitalo_kolmiotTaiIsommat_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
          }
          // others
          else {
            if (row.rooms === '1') {
              const rowsToUpdate = [
                'muut_yksioita_yhteensa',
                'muut_yksioiden_hinnat_yhteensa',
                'muut_yksiot_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
            else if (row.rooms === '2') {
              const rowsToUpdate = [
                'muut_kaksioita_yhteensa',
                'muut_kaksioiden_hinnat_yhteensa',
                'muut_kaksiot_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
            else if (Number(row.rooms) > 2) {
              const rowsToUpdate = [
                'muut_kolmiotTaiIsommat_yhteensa',
                'muut_kolmiotTaiIsommat_hinnat_yhteensa',
                'muut_kolmiotTaiIsommat_keskiarvo'
              ];
              entry = updateStatsRow(entry, rowsToUpdate, pricePerSqM);
            }
          }
          //console.log('uusi: ', entry); ok!
          stats.push(entry);
        }
      }
    });
    return stats;
  }
}
