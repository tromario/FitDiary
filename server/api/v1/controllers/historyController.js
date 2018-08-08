const mongoose = require("mongoose");
const History = require("../models/historyModel");
const moment = require("moment");

exports.getHistories = function (req, res) {
    if (req.query.q) return getRequestedHistory(req, res);
    return getAllHistory(req, res);
};

var getAllHistory = function (req, res) {
    console.log("data-params from query - getAllMeals: ", req.params);

    History
        .find()
        .populate([{
            path: "meals",
            model: "Meal",
            populate: {
                path: "products.product",
                model: "Product"
            }
        }])
        .exec(function (err, docs) {
            if (err) return res.status(400).send();
            res.json(docs);
        })
};

var getRequestedHistory = function (req, res) {
    var query = JSON.parse(req.query.q);
    var date = query.date;

    console.log("data-query from query - getSearchMeals: ", query);

    var today = moment(date).startOf("day");
    var tomorrow = moment(today).add(1, "days");

    History
        .find({date: {$gte: today.toDate(), $lt: tomorrow.toDate()}})
        .populate([{
            path: "meals",
            model: "Meal",
            populate: {
                path: "products.product",
                model: "Product"
            }
        }])
        .exec(function (err, docs) {
            if (err) return res.status(400).send();
            res.json(docs);
        })
};