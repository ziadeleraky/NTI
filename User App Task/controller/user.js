const chalk = require("chalk");
const dealWithJson = require("./dealWithJson");

// Done
const addUser = (userData) => {
  const data = dealWithJson.readData(); // -> data = []
  data.push(userData);
  dealWithJson.writeData(data);
};

// Done
const allUsers = () => {
  return dealWithJson.readData();
  // console.log(chalk.greenBright(">----------<[Done!]>----------<"));
};

// Done
const showUser = (id) => {
  const allData = dealWithJson.readData();
  let showData;
  for (let data of allData) {
    if (data.id === id) {
      showData = data;
    }
  }
  if (showData === undefined) {
    return console.log(chalk.red("Can't Find User\nPlease Enter ID again."));
  }
  console.log(showData, chalk.green("\n\nSuccessfully Done!"));
};

// Done
const delUser = (id) => {
  const allData = dealWithJson.readData();
  // check if id is correct
  let delData;
  allData.forEach((data, i) => {
    if (data.id === id) {
      delData = i;
      console.log(i);
    }
  });
  if (delData) {
    allData.splice(delData, 1);
    dealWithJson.writeData(allData);
    console.log(chalk.green("Successfully Deleted"));
  } else {
    console.log(chalk.red("Can't Find User\nPlease Enter ID again."));
  }
};

const editUser = (id) => {
  const allData = dealWithJson.readData();
  // check if id is correct
  let showData;
  allData.forEach((data, i) => {
    if (data.id === id) {
      showData = [data, i];
    }
  });
  if (showData === undefined) {
    return console.log(chalk.red("Can't Find User\nPlease Enter ID again."));
  } else {
    return showData;
  }
};

module.exports = {
  addUser,
  editUser,
  allUsers,
  showUser,
  delUser,
};
