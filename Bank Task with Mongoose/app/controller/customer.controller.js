const customerModel = require("../../database/models/customer.model");

class customer {
    static home = async (req, res) => {
        try {
            const data = await customerModel.find();
            res.render("home", {
                pagetitle: "Home - Bank",
                data,
                headers: [
                    "ID",
                    "Name",
                    "Account Number",
                    "Balance",
                    "Last Transaction",
                    "Actions",
                ],
                hasData: data.length,
            });
        } catch (e) {
            res.render("error404", {
                pagetitle: "Error",
                errMsg: "Invalid",
            });
        }
    };
    static addView = (req, res) => {
        res.render('addCustomer', {
            pagetitle: 'Add New Customer'
        })
    };
    static addLogic = async (req, res) => {
        try {
            const data = customerModel(req.query);
            await data.save();
            res.redirect('/')
        } catch (e) {
            res.render("error404", {
                pagetitle: "Error",
                errMsg: "Invalid",
            });
        }
    };
    static addTransactionView = async (req, res) => {
        try {
            const customer = await customerModel.findById(req.params.id);
            res.render("addTrans", {
                pagetitle: "Add Transaction",
                customer,
                type: ["Add", "Withdraw"],
            });
        } catch (e) {
            res.render('error404', {
                pagetitle: 'Error',
                errMsg: 'Invalid'
            });
        }
    };
    static addTransactionLogic = async (req, res) => {
        try {
            await customerModel.findByIdAndUpdate(req.params.id, req.body);
            const data = await customerModel.findById(req.params.id)
            data.balance += Number(req.body.transactions.value);
            await data.save();
            res.redirect("/");
        } catch (e) {
            res.send(e.message);
        }
    };
    static del = async (req, res) => {
        try {
            await customerModel.findByIdAndDelete(req.params.id);
            res.redirect('/')
        } catch (e) {
            res.render("error404", {
                pagetitle: "Error",
                errMsg: "Invalid",
            });
        }
    };
    static err = (req, res) => {
        res.render('error404', {
            pagetitle: 'Not Found',
            errMsg: 'Invalid URL'
        })
    };
    static show = async (req, res) => {
        try {
            const customer = await customerModel.findById(req.params.id);
            res.render('single', {
                pagetitle: 'Customer Data',
                customer
            })
        } catch (e) {
            res.render('error404', {
                pagetitle: 'Error',
                errMsg: 'Invalid'
            })
        }
    };
}

module.exports = customer;
