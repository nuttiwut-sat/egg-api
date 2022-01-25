"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRouter = void 0;
const express = __importStar(require("express"));
const output_1 = require("../util/output");
const bodyParser = require('body-parser');
class PRouter {
    constructor(router = express.Router()) {
        this.router = router;
    }
    all(path, callback) {
        this.router.post(path, (req, res) => (0, output_1.OutAPIExpress)(req, res, callback));
    }
    get(path, callback) {
        this.router.get(path, (req, res) => (0, output_1.OutAPIExpress)(req, res, callback));
    }
    post(path, callback) {
        this.router.post(path, (req, res) => (0, output_1.OutAPIExpress)(req, res, callback));
    }
    put(path, callback) {
        this.router.put(path, (req, res) => (0, output_1.OutAPIExpress)(req, res, callback));
    }
    delete(path, callback) {
        this.router.delete(path, (req, res) => (0, output_1.OutAPIExpress)(req, res, callback));
    }
    patch(path, callback) {
        this.router.patch(path, (req, res) => (0, output_1.OutAPIExpress)(req, res, callback));
    }
    options(path, callback) {
        this.router.options(path, (req, res) => (0, output_1.OutAPIExpress)(req, res, callback));
    }
    head(path, callback) {
        this.router.head(path, (req, res) => (0, output_1.OutAPIExpress)(req, res, callback));
    }
}
exports.PRouter = PRouter;
//# sourceMappingURL=router.js.map