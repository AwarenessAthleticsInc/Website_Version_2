const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const Assets = require("../modules/assets");
const path = require('path');
const fs = require('fs');

exports.assets = (app) => {
    app.route('/api/assets').get((req, res) => {
        // get data
        const files = [];
        fs.readdir("./assets", function (err, files) {
            //handling error
            if (err) {
                res.status(404).send(`Unable to scan directory: ${err}`);
                return;
            }
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                var stats = fs.statSync(`./assets/${file}`);
                if(stats.isFile()) {
                    files.push(`/upload/${file}`);  
                } else if(stats.isDirectory()){
                    // files.push(`Directory: ${file}`);  
                }
            });
            res.status(200).send(files);
        });
    }).post(upload.single("filetoupload"), (req, res) => {
        // upload a new file
        Assets.upload(req.body.location, req.file, 500).then((path) => {
            res.status(200).send(path);
        }).catch((error) => {
            console.log(error);
            res.status(400).send("Couldn't upload your file");
        });
    }).put((req, res) => {
        // update exciting data
        res.status(405).send("Method not used!");
    }).delete((req, res) => {
        // delete data 
        const array = req.body.items;
        const badArray = [];
        array.map((locations) => {
            fs.unlink(locations, (error) => {
                if(error) {
                    badArray.push(location);
                }
            });
        });
        if(badArray.length > 0) {
           res.status(200).send(`${Number(array.length - badArray.length)} out of ${array.length} were deleted successfully! ${badArray.length} file(s) failed to delete.`);
        } else {
            res.status(200).send("Files deleted successfully!");   
        }
    });

}

// require('./routes').routeName(app);