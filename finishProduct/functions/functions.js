
// check if this card_id is already in newArray
export const checkIfThere = (json) => {
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
        thisEntry.visits += element.visits;
        thisEntry.web_contacts_count += element.web_contacts_count;
        thisEntry.application_contacts_count += element.application_contacts_count;
        thisEntry.calls += element.calls;
    }
  });

  return newArray;
}
    
    
      // if is not, push it there
      // if is, then add to old entry:
      // visits, web_contacts_count, application_contacts_count, calls