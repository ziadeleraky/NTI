const dealWithData = require("../helper/dealWithData.helper");
const httpRequest = require("../helper/httpRequest.helper");

const home = (req, res) => {
  const apiURL = "https://jsonplaceholder.typicode.com/posts?_limit=10";
  httpRequest.api(apiURL, (res, err) => {
    if (res) {
      console.log("API-DONE");
      dealWithData.removeJSON("database/user.json");
      dealWithData.writeToJSON(res, "database/user.json");
    } else {
      console.log("API-ERROR");
    }
  });
  const data = dealWithData.readFromJSON('database/user.json');
  res.render("home", {
    pageTitle: "Home Page - User App",
    data,
    hasData: data.length,
  });
};

const add = (req, res) => {
  res.render("add", {
    pageTitle: "Add User - User App",
  });
};

const single = (req, res) => {
  const id = req.params.id; // get the id from url - (/:id) => variable -
  const data = dealWithData.readFromJSON("database/user.json"); // get all data
  res.render("single", {
    pageTitle: "User Data - User App",
    user: data[id - 1], // -1 to deal with index
  });
};

module.exports = {
  home,
  add,
  single,
};
