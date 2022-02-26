import express from 'express';
import cors from 'cors';
import {authRouter} from './module/auth';
import {userRouter} from './module/user';
import {farmRouter} from './module/farm';
import {productRouter} from './module/product';
import multer from 'multer';
import { customerRouter } from './module/customer';
// import 'source-map-support/register';

// Instead of:
// import sourceMapSupport from 'source-map-support';
// sourceMapSupport.install();

const app = express();
const bodyParser = require('body-parser');
const upload = multer({dest: 'uploads/'});
const type = upload.array('images');

const frontAppUrl = process.env.FRONT_APP_URL!;
app.use(
    cors({
        origin: [frontAppUrl, 'http://localhost:4200'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: '*',
    }),
);
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));

const mainRouter = express.Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/farm', farmRouter);
mainRouter.use('/product', productRouter);
mainRouter.use('/customer', customerRouter);

// mainRouter.use('/images/:dir/:key', async (req, res) => {
//     const key = req.params.key;
//     const dir = req.params.dir;
//     // const readStream = await getFileStream(key, dir);
//     // readStream.pipe(res);
// });
app.use('/', type, mainRouter);

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.use('*', (req, res) => {
    console.info(`[REST_API Forbiden] '${req.baseUrl}' from ip:${req.ip}`);

    res.status(403).json({
        statusCode: 403,
        message: 'Forbiden',
        errors: null,
        result: null,
        'x-request-id': req.headers['x-request-id'],
    });
});
