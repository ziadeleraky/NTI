const dealWithData = require("../helper/dealWithData.helper");

const home = (req, res) => {
  const data = dealWithData.readFromJSON("Database/customers.json");
  res.render("home", {
    pagetitle: "Home - Bank App",
    data,
    headers: [
      "ID",
      "Name",
      "Account Number",
      "Balance",
      "Transactions",
      "Actions",
    ],
    hasData: data.length,
  });
};

/* **************** ADD ****************** */
const addView = (req, res) => {
  res.render("addCustomer", {
    pagetitle: "Add - Bank",
  });
};

const addLogic = (req, res) => {
  const customer = {
    id: Date.now(),
    trans: {
      type: false,
      value: 0,
    },
    ...req.query, // values of the form - name,accNum,balance -
  };
  console.log(customer);
  const data = dealWithData.readFromJSON("Database/customers.json");
  data.push(customer); // [object,object,...]
  dealWithData.writeToJSON(data, "Database/customers.json");
  res.redirect("/");
};

/* **************** ADD Transaction ****************** */
const addTransactionView = (req, res) => {
  const data = dealWithData.readFromJSON("Database/customers.json");
  const id = req.params.id;
  const customer = data.find((customer) => customer.id == id);
  res.render("addTransactions", {
    pagetitle: "Add Transaction - Bank",
    customer,
    type: ["Add", "Withdraw"],
  });
};

const addTransactionLogic = (req, res) => {
  const data = dealWithData.readFromJSON("Database/customers.json");
  const id = req.params.id;
  const customerIndex = data.findIndex((customer) => customer.id == id);
  data[customerIndex].trans = {
    type: req.body.type,
    value: req.body.value,
  };
  data[customerIndex].balance =
    Number(data[customerIndex].balance) + Number(req.body["value"]);
  console.log(data[customerIndex]);
  dealWithData.writeToJSON(data, "Database/customers.json");
  res.redirect("/");
};

/* **************** Show ****************** */
const show = (req, res) => {
  const id = req.params.id;
  const data = dealWithData.readFromJSON("Database/customers.json");
  const customer = data.find((c) => c.id == id);
  console.log(customer);
  res.render("show", {
    pagetitle: "Customer Data - Bank",
    customer,
  });
};

/* **************** Show ****************** */
const del = (req, res) => {
  const id = req.params.id;
  const data = dealWithData.readFromJSON("Database/customers.json");
  const newData = data.filter((c) => c.id != id);
  dealWithData.writeToJSON(newData, "Database/customers.json");
  res.redirect("/");
};

/* **************** ERROR **************** */
const err = (req, res) => {
  res.render("error", {
    pagetitle: "Not Found",
  });
};

module.exports = {
  home,
  addView,
  addLogic,
  err,
  addTransactionView,
  addTransactionLogic,
  show,
  del,
};
