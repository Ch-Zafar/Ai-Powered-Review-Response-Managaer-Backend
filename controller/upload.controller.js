const fs = require("fs");
const csv = require("csv-parser");
const reviewModel = require("../db/models/review.schema");

const uploadController = async (req, res) => {

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
        .on("end", async () => {
            try {

                console.log(results);

                const insertedData = await reviewModel.insertMany(results);

                return res.status(200).json({
                    message: "CSV uploaded and data inserted successfully",
                    count: insertedData.length,
                    data: insertedData
                });

            } catch (error) {

                console.log(error);

                return res.status(500).json({
                    message: "Database insertion failed",
                    error
                });
            }
        })
        .on("error", (error) => {

            console.log(error);

            return res.status(500).json({
                message: "Error reading CSV file",
                error
            });
        });
};

module.exports = { uploadController };