const users = require('../../modules/users');

exports.upload = (app) => {
    const multer = require("multer");
    const storage = multer.memoryStorage();
    const upload = multer({ storage });
    const uploadImage = require('../../upload'); //is for images
    const uploadDocument = require('../../docUpload');

    app.post("/uploadImage/:location", upload.single("filetoupload"), (req, res) => {
        uploadImage.upload(req.file, req.params.location, req).then((path) => {
            res.status(200).send(path);
            res.end();
        }).catch((error) => {
            console.log(error);
            res.status(400).send("Couldn't upload your file");
        });
    });
    app.post("/uploadFile/:location", (req, res) => {
        uploadDocument.upload(req, res, req.params.location).then((path) => {
            res.status(200).send(path);
        }).catch((error) => {
            console.log(error);
            res.status(400).send("Couldn't upload your file");
        });
    });
}

// require('./routes').upload(app);