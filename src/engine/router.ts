import * as express from 'express';
import {Request, Response} from 'express';
import { OutAPIExpress } from '../util/output';

const bodyParser = require('body-parser');

export type Handler = (request?: Request, response?: Response) => any;

export class PRouter {
    constructor(public router = express.Router()) {}

    public all(path: string, callback: Handler) {
        this.router.post(path, (req, res) => OutAPIExpress(req, res, callback));
    }
    public get(path: string, callback: Handler) {
        this.router.get(path, (req, res) => OutAPIExpress(req, res, callback));
    }
    public post(path: string, callback: Handler) {
        this.router.post(path, (req, res) => OutAPIExpress(req, res, callback));
    }
    public put(path: string, callback: Handler) {
        this.router.put(path, (req, res) => OutAPIExpress(req, res, callback));
    }
    public delete(path: string, callback: Handler) {
        this.router.delete(path, (req, res) =>
            OutAPIExpress(req, res, callback),
        );
    }
    public patch(path: string, callback: Handler) {
        this.router.patch(path, (req, res) =>
            OutAPIExpress(req, res, callback),
        );
    }
    public options(path: string, callback: Handler) {
        this.router.options(path, (req, res) =>
            OutAPIExpress(req, res, callback),
        );
    }
    public head(path: string, callback: Handler) {
        this.router.head(path, (req, res) => OutAPIExpress(req, res, callback));
    }
}
