const device = require('express-device');
const DeviceDetector = require('node-device-detector');
const DeviceHelper = require('node-device-detector/helper');
const ClientHints = require('node-device-detector/client-hints')

exports = (req) => {
    const detector = new DeviceDetector;
    const clientHints = new ClientHints;
    const userAgent = req.headers['user-agent'];
    const clientHintData = clientHints.parse(req.headers);
    const result = detector.detect(userAgent, clientHintData);
    return result;
}