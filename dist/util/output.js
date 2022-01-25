"use strict";
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
exports.Out = exports.OutAPIExpress = exports.Res = void 0;
const Res = function (status_code, data) {
    return {
        statusCode: status_code,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
            // 'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(data, null, 2),
    };
};
exports.Res = Res;
function OutAPIExpress(req, res, func) {
    return __awaiter(this, void 0, void 0, function* () {
        const NS_PER_SEC = 1e9;
        const MS_PER_NS = 1e-6;
        const time = process.hrtime();
        try {
            console.info(`[ REST_API ] => '${req.originalUrl}' from ip:${req.ip}`);
            const result = yield func(req, res);
            const diff = process.hrtime(time);
            const milisecondProcessTime = Math.round((diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS);
            res.status(200).json({
                statusCode: 200,
                message: '',
                errors: null,
                result,
                'x-request-id': req.headers['x-request-id'],
                processing_time: milisecondProcessTime / 1000,
            });
            const logicProcessTime = Math.round((diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS);
            console.info(`[ SUCCESS_API  '${req.originalUrl}' ] from ip:${req.ip} : Logic Processing Time ${logicProcessTime} millisecond`);
        }
        catch (e) {
            if (e.message == 'Unauthorized') {
                console.error(`Unauthorized User Trying to '${req.originalUrl}'`);
            }
            else {
                console.error(`User Access to '${req.originalUrl}' with Error!!`);
                console.error(e);
            }
            const diff = process.hrtime(time);
            const milisecondProcessTime = Math.round((diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS);
            res.status(e.message == 'Unauthorized' ? 401 : 400).json({
                statusCode: e.message == 'Unauthorized' ? 401 : 400,
                message: e.message,
                errors: e,
                result: null,
                'x-request-id': req.headers['x-request-id'],
                processing_time: milisecondProcessTime / 1000,
            });
            const logicProcessTime = Math.round((diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS);
            console.info(`[ FAILED_API  '${req.originalUrl}' ] from ip:${req.ip} : Logic Processing Time ${logicProcessTime} millisecond`);
        }
    });
}
exports.OutAPIExpress = OutAPIExpress;
function Out(req, res, func) {
    return __awaiter(this, void 0, void 0, function* () {
        const NS_PER_SEC = 1e9;
        const MS_PER_NS = 1e-6;
        const time = process.hrtime();
        try {
            console.info(`[ REST_API ] => '${req.originalUrl}' from ip:${req.ip}`);
            const result = yield func(req, res);
            const diff = process.hrtime(time);
            const milisecondProcessTime = Math.round((diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS);
            const logicProcessTime = Math.round((diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS);
            console.info(`[ SUCCESS_API  '${req.originalUrl}' ] from ip:${req.ip} : Logic Processing Time ${logicProcessTime} millisecond`);
        }
        catch (e) {
            const diff = process.hrtime(time);
            const milisecondProcessTime = Math.round((diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS);
            const logicProcessTime = Math.round((diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS);
            console.info(`[ FAILED_API  '${req.originalUrl}' ] from ip:${req.ip} : Logic Processing Time ${logicProcessTime} millisecond`);
            res.status(e.message == 'Unauthorized' ? 401 : 400).json({
                statusCode: e.message == 'Unauthorized' ? 401 : 400,
                message: e.message,
                errors: e,
                result: null,
                'x-request-id': req.headers['x-request-id'],
                processing_time: milisecondProcessTime / 1000,
            });
        }
    });
}
exports.Out = Out;
//# sourceMappingURL=output.js.map