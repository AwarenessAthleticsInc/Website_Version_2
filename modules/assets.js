const multer = require("multer");
const sharp = require("sharp");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadFile = (location, file, size) => {
    return new Promise((resolve, reject) => {
        fs.access("../assets/" + location, (error) => {
            if (error) {
                fs.mkdirSync("../assets/" + location);
            }
        });
        const buffer = file.buffer;
        const path = "/" + location + "/" + size + "-" + file.originalname;
        const timestamp = new Date().toISOString();
        sharp(buffer)
            .resize(size)
            .toFile("assets" + path, (err, info) => {
                if (err) {
                    reject(err);
                }
                resolve(path);
            });
    });
}
exports.upload = uploadFile;

