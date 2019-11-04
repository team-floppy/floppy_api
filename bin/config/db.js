var mongoose = require('mongoose');
const uri = process.env.DB_URI;
const Grid = require('gridfs-stream');

let gfs;

module.exports = function init() {
    if (uri) {
        mongoose.connect(
            uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        },
            (err) => {
                if (err) {
                    console.log("Database connection failed");
                }
                else {
                     gfs = Grid(uri, mongoose.mongo);
                    console.log("Sucessfully connected to MongoDB");
                }  
            }

        );
    } else {
        throw new Error("DB URI not found, please kindly check your connection strings to mongoose");
    }
}

exports.gfs = gfs;

/**
 * Seeding logic for database should go here
 */
function seedDatabase() {

}