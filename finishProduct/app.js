const fs = require('fs');

fs.readFile('../data/newTest.json', 'utf8', (err, data) => {
  if (err) throw err;

  const json = JSON.parse(data);
  console.log(json[0]);
});