import {Request, Response} from 'express';
import {Handler} from '../engine/router';

export const Res = function (status_code: number, data: any) {
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

export async function OutAPIExpress(
    req: Request,
    res: Response,
    func: Handler,
) {
    const NS_PER_SEC = 1e9;
    const MS_PER_NS = 1e-6;
    const time = process.hrtime();

    try {
        console.info(`[ REST_API ] => '${req.originalUrl}' from ip:${req.ip}`);

        const result = await func(req, res);

        const diff = process.hrtime(time);
        const milisecondProcessTime = Math.round(
            (diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS,
        );

        res.status(200).json({
            statusCode: 200,
            message: '',
            errors: null,
            result,
            'x-request-id': req.headers['x-request-id'],
            processing_time: milisecondProcessTime / 1000,
        });

        const logicProcessTime = Math.round(
            (diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS,
        );
        console.info(
            `[ SUCCESS_API  '${req.originalUrl}' ] from ip:${req.ip} : Logic Processing Time ${logicProcessTime} millisecond`,
        );
    } catch (e: any) {
        if (e.message == 'Unauthorized') {
            console.error(`Unauthorized User Trying to '${req.originalUrl}'`);
        } else {
            console.error(`User Access to '${req.originalUrl}' with Error!!`);
            console.error(e);
        }

        const diff = process.hrtime(time);
        const milisecondProcessTime = Math.round(
            (diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS,
        );

        res.status(e.message == 'Unauthorized' ? 401 : 400).json({
            statusCode: e.message == 'Unauthorized' ? 401 : 400,
            message: e.message,
            errors: e,
            result: null,
            'x-request-id': req.headers['x-request-id'],
            processing_time: milisecondProcessTime / 1000,
        });

        const logicProcessTime = Math.round(
            (diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS,
        );
        console.info(
            `[ FAILED_API  '${req.originalUrl}' ] from ip:${req.ip} : Logic Processing Time ${logicProcessTime} millisecond`,
        );
    }
}

export async function Out(req: Request, res: Response, func: Handler) {
    const NS_PER_SEC = 1e9;
    const MS_PER_NS = 1e-6;
    const time = process.hrtime();

    try {
        console.info(`[ REST_API ] => '${req.originalUrl}' from ip:${req.ip}`);
        const result = await func(req, res);
        const diff = process.hrtime(time);
        const milisecondProcessTime = Math.round(
            (diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS,
        );
        const logicProcessTime = Math.round(
            (diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS,
        );
        console.info(
            `[ SUCCESS_API  '${req.originalUrl}' ] from ip:${req.ip} : Logic Processing Time ${logicProcessTime} millisecond`,
        );
    } catch (e: any) {
        const diff = process.hrtime(time);
        const milisecondProcessTime = Math.round(
            (diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS,
        );
        const logicProcessTime = Math.round(
            (diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS,
        );
        console.info(
            `[ FAILED_API  '${req.originalUrl}' ] from ip:${req.ip} : Logic Processing Time ${logicProcessTime} millisecond`,
        );
        res.status(e.message == 'Unauthorized' ? 401 : 400).json({
            statusCode: e.message == 'Unauthorized' ? 401 : 400,
            message: e.message,
            errors: e,
            result: null,
            'x-request-id': req.headers['x-request-id'],
            processing_time: milisecondProcessTime / 1000,
        });
    }
}
