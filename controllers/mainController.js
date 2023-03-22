const fs = require("fs");
const path = require("path");

const mainController = {

    index: (req, res) => {
        res.send('Estamos trabajando!')

    }
};

module.exports = mainController;