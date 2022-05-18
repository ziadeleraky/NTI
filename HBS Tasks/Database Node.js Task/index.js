const user = require("./controller/user");
const yargs = require("yargs");
const chalk = require("chalk");
const dealWithJson = require("./controller/dealWithJson");

const headers = ["id", "name", "age", "email", "status", "createdAt"];

// Command: add ------ Done
yargs.command({
  command: "addUser",
  describe: "Add New User Data",
  builder: {
    id: {
      type: "number",
      default: Date.now(),
    },
    name: {
      type: "string",
      demandOption: true,
    },
    email: {
      type: "string",
      demandOption: true,
    },
    status: {
      type: "boolean",
      default: false,
    },
    age: {
      type: "number",
      demandOption: true,
    },
    createdAt: {
      type: "date",
      default: new Date(),
    },
  },
  handler: function (argv) {
    console.log(chalk.gray("New User Data is being added..."));
    let userData = {};
    headers.forEach((head) => {
      userData[head] = argv[head];
    });
    user.addUser(userData);
  },
});

// Command: showAll ------ Done
yargs.command({
  command: "showAll",
  describe: "Show All Users Data",
  handler: function () {
    console.log(chalk.gray("Getting Data, Please wait..."));
    let allUsersData = user.allUsers();
    allUsersData.forEach((user, i) => {
      headers.forEach((head) => {
        console.log(chalk.green(`${head} = ${user[head]}`));
      });
      console.log(
        chalk.blue(`\n\t\t ----------------< ${i + 1} >----------------\n`)
      );
    });
    console.log(chalk.green("\t\t\t   Successfully Done!"));
  },
});

// showUser ------ Done
yargs.command({
  command: "showUser",
  describe: "Show User Data",
  builder: {
    id: {
      type: "number",
      demandOption: true,
    },
  },
  handler: function (argv) {
    console.log(chalk.gray("Getting user data, Please wait...\n"));
    user.showUser(argv.id);
  },
});

// delUser ------ Done
yargs.command({
  command: "delUser",
  describe: "Delete User Data",
  builder: {
    id: {
      type: "number",
      demandOption: true,
    },
  },
  handler: function (argv) {
    console.log("Deleting User Data...\n");
    user.delUser(argv.id);
  },
});

yargs.command({
  command: "editUser",
  describe: "Edit User Data",
  builder: {
    userId: {
      type: "number",
      demandOption: true,
    },
    id: {
      type: "number",
    },
    name: {
      type: "string",
      demandOption: true,
    },
    email: {
      type: "string",
      demandOption: true,
    },
    status: {
      type: "boolean",
      default: false,
    },
    age: {
      type: "number",
      demandOption: true,
    },
  },
  handler: function (argv) {
    console.log(chalk.gray("Editing User Data..."));
    const allData = dealWithJson.readData();
    let showData = user.editUser(argv.userId);
    try {
      allData.splice(showData[1], 1);
      console.log(allData);
      headers.forEach((head) => {
        if (argv[head]) {
          showData[0][head] = argv[head];
        }
      });
      allData.push(showData[0]);
      dealWithJson.writeData(allData);
    } catch (e) {}
  },
});

yargs.argv;