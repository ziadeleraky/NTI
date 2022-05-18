const fs = require("fs");
const chalk = require("chalk");

// creating database file and overwriting old database with the new one
const writeData = (data) => {
  fs.writeFileSync("data.json", JSON.stringify(data));
  console.log(chalk.green("Database Updated"));
};

/* read all data from the database file 
if there isn't data create variable Data with an empty array */
const readData = () => {
  let data;
  try {
    data = JSON.parse(fs.readFileSync("data.json")) || [];
    if (!Array.isArray(data)) {
      throw new Error();
    }
  } catch (e) {
    data = [];
  }
  return data;
};
module.exports = {
  writeData,
  readData,
};