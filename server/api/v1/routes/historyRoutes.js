module.exports = function (app) {
    const historyController = require("../controllers/historyController");

    app.route("/api/v1/histories")
        .get(historyController.getHistories)
};