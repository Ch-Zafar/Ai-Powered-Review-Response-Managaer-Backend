const fs = require("fs");
const csv = require("csv-parser");

const uploadController = (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded"
        });
    }

    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => {
            results.push(data);
        })
        .on("end", () => {
            console.log(results);

            res.json({
                message: "CSV Uploaded Successfully",
                data: results
            });
        })
        .on("error", (error) => {
            console.log(error);

            res.status(500).json({
                message: "Error reading CSV file",
                error
            });
        });
};

module.exports = { uploadController };