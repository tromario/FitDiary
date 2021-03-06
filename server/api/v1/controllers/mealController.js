const mongoose = require("mongoose");
const Meal = require("../models/mealModel");
const History = require("../models/historyModel");
const moment = require("moment");

const ADD_MEAL = "ADD_MEAL";
const DELETE_MEAL = "DELETE_MEAL";

exports.getMeals = function (req, res) {
    // console.log('data-params from query - getMeals: ', req.params);
    // console.log('data-query from query - getMeals: ', req.query);

    if (req.query.q) return getRequestedMeals(req, res);
    return getAllMeals(req, res);
};

var getAllMeals = function (req, res) {
    console.log("data-params from query - getAllMeals: ", req.params);

    // mongoose.connect(url)
    Meal.find().populate("products.product").exec(function (err, docs) {
        // mongoose.disconnect()
        if (err) return res.status(400).send();
        res.json(docs)
    })
};

var getRequestedMeals = function (req, res) {
    var query = JSON.parse(req.query.q);
    var date = query.date;

    console.log("data-query from query - getSearchMeals: ", query);

    var today = moment(date).startOf("day");
    var tomorrow = moment(today).add(1, "days");

    var getHistory = new Promise(function (resolve, reject) {
        History
            .find({date: {$gte: today.toDate(), $lt: tomorrow.toDate()}})
            .exec(function (err, docs) {
                if (err) return reject(err);
                resolve(docs);
            })
    });

    getHistory
        .then(function (history) {
            Meal
                .find({history: history})
                .populate("products.product")
                .populate("history")
                .exec(function (err, docs) {
                    // mongoose.disconnect()
                    if (err) return res.status(400).send()
                    res.json(docs)
                })
        })
        .catch(function (error) {
            console.log("error from getHistory: ", error);
        })
};

exports.getMeal = function (req, res) {
    var mealId = req.params.id;

    console.log("data from query - getMeal: ", mealId);

    // mongoose.connect(url)
    Meal.findById(mealId).populate("products.product").exec(function (err, meal) {
        // mongoose.disconnect()
        if (err) return res.status(400).send();
        res.json(meal)
    })
};

exports.createMeal = function (req, res) {
    if (!req.body) return res.status(404).send();

    var mealData = req.body.data;
    var meal = new Meal(mealData);

    console.log("data from query - createMeal: ", mealData);

    updateCalculatingHistory(meal, ADD_MEAL)
        .then(function (history) {
            meal.history = history.id;
            meal.save(function (error) {
                if (!error) {
                    Meal
                        .findById(meal._id)
                        .populate("products.product")
                        .exec(function (error, doc) {
                            // mongoose.disconnect()
                            res.json(doc);
                        })
                } else {
                    // mongoose.disconnect()
                    res.status(400).send();
                }
            })
        }).catch(function (error) {
        console.log("error from getHistory: ", error);
    });
};

var getHistory = function (date) {
    return new Promise(function (resolve, reject) {
        var today = moment(date).startOf("day");
        var tomorrow = moment(today).add(1, "days");

        History
            .findOne({date: {$gte: today.toDate(), $lt: tomorrow.toDate()}})
            .populate("meals")
            .exec(function (err, docs) {
                if (!err && docs) {
                    resolve(docs);
                } else {
                    var history = new History({date: date})
                        .save(function (error) {
                            if (error) return reject(error);
                            resolve(history);
                        });
                }
            })
    });
};

/** Обновление суточной статистики по приемам пищи */
var updateCalculatingHistory = function (meal, actionForMeal) {
    return new Promise(function (resolve, reject) {
        var date = meal.date;

        getHistory(date)
            .then(function (history) {
                switch (actionForMeal) {
                    case ADD_MEAL:
                        history.meals.push(meal);
                        break;
                    case DELETE_MEAL:
                        var indexToRemove = history.meals.findIndex(obj => obj._id.toString() === meal._id.toString());
                        if (indexToRemove > -1) history.meals.splice(indexToRemove, 1);
                        break;
                    default:
                        break;
                }

                history.totalAmount = 0;
                history.totalProteins = 0;
                history.totalFats = 0;
                history.totalCarbohydrates = 0;
                history.totalCellulose = 0;
                history.totalCaloricity = 0;
                history.totalEnergy = 0;
                history.meals.map(function (meal) {
                    history.totalAmount += meal.totalAmount;
                    history.totalProteins += meal.totalProteins;
                    history.totalFats += meal.totalFats;
                    history.totalCarbohydrates += meal.totalCarbohydrates;
                    history.totalCellulose += meal.totalCellulose;
                    history.totalCaloricity += meal.totalCaloricity;
                    history.totalEnergy += meal.totalEnergy;
                });
                history.save(function (error) {
                    if (error) return reject(error);
                    resolve(history);
                });
            });
    });
};

exports.deleteMeal = function (req, res) {
    var mealId = req.params.id;

    console.log("data from query - deleteMeal: ", req.params);

    getMealById(mealId)
        .then(function (meal) {
            updateCalculatingHistory(meal, DELETE_MEAL)
                .then(function (history) {
                    meal.remove(function (error, meal) {
                        if (error) return res.status(400).send();
                        res.json(meal);
                    });
                }).catch(function (error) {
                res.status(400).send();
            });
        });
};

exports.updateMeal = function (req, res) {
    if (!req.params) return res.status(404).send();

    var mealId = req.params.id;
    var mealData = req.body.data;

    console.log("data from query - updateMeal: ", mealData);

    var updateMeal = new Promise(function (resolve, reject) {
        getMealById(mealId)
            .then(function (meal) {
                for (var key in mealData) {
                    if (key != "id") meal[key] = mealData[key];
                }
                meal.save(function (error) {
                    if (error) return reject(error);
                    resolve(meal);
                });
            });
    });

    updateMeal
        .then(function (meal) {
            updateCalculatingHistory(meal)
                .then(function (history) {
                    res.json(meal);
                }).catch(function (error) {
                res.status(400).send();
            });
        })
        .catch(function (error) {
            res.status(400).send();
        });
};

var getMealById = function (id) {
    return new Promise(function (resolve, reject) {
        Meal
            .findById(id)
            .populate("products.product")
            .exec(function (error, meal) {
                if (error) return reject(error);
                resolve(meal);
            });
    });
};