const fs = require("fs");

const readFromJSON = (fileName) => {
  let data = [];
  try {
    data = JSON.parse(fs.readFileSync(fileName));
    if (!Array.isArray(data)) {
      throw new Error();
    }
  } catch (e) {
    data = [];
  }
  return data;
};

const writeToJSON = (data, fileName) => {
  try {
    fs.writeFileSync(fileName, JSON.stringify(data));
  } catch (e) {
    console.log(e.message);
  }
};

const removeJSON = (fileName) => {
  try {
    fs.unlinkSync(fileName);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  readFromJSON,
  writeToJSON,
  removeJSON,
};
