const fs = require("fs");
function csvToJson (filePath, header) {
    const permissions = fs.readFileSync(filePath, {encoding: "utf-8"});
  let result = []
  for (let i of permissions.split('\n')) {
    if (Object.keys(i).length === 0 ) {
      continue;
    } 
    let data = i.split(',');
    let map = {}
    data.forEach((value, index) => {
      if (!isNaN(value)) {
        value = Number(value);
      }
      map[header[index]] = value
    });
    result.push(map);
  };
  return result;
};

module.exports = csvToJson;