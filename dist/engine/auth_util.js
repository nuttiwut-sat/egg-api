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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDataFromToken = exports._GetDataFromToken = exports.getDecodedDataToken = exports.verifyToken = void 0;
const jwtIn = __importStar(require("jsonwebtoken"));
const signKey = process.env.SECRET_AUTH_PASS || '';
const verifyToken = (token, func) => {
    return jwtIn.verify(token, signKey, func);
};
exports.verifyToken = verifyToken;
const getDecodedDataToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield new Promise((resolve, reject) => {
        // console.log(`Decoding token '${token}' with Secret '${signKey}' ` );
        jwtIn.verify(token, signKey, (err, decoded) => {
            if (err) {
                console.error('jwt Verify Error with ' + err);
                reject('Token Error');
            }
            else {
                resolve(decoded);
            }
        });
    });
    return data;
});
exports.getDecodedDataToken = getDecodedDataToken;
const _GetDataFromToken = (event) => __awaiter(void 0, void 0, void 0, function* () {
    let ObjFromToken = null;
    let token = event.headers['Authorization']
        ? event.headers['Authorization']
        : null;
    // console.log('token', token);
    token = event.headers['authorization']
        ? event.headers['authorization']
        : null;
    if (token) {
        ObjFromToken = (yield (0, exports.getDecodedDataToken)(token));
        if (ObjFromToken['data']) {
            ObjFromToken = ObjFromToken['data'];
        }
        return ObjFromToken;
    }
    else {
        throw new Error();
    }
});
exports._GetDataFromToken = _GetDataFromToken;
const GetDataFromToken = (event) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, exports._GetDataFromToken)(event).then(tokenData => {
        console.info(`Authentication Success with Token Data`);
        console.info(tokenData);
        return tokenData;
    });
});
exports.GetDataFromToken = GetDataFromToken;
//# sourceMappingURL=auth_util.js.map