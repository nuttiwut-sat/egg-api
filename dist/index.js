"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./module/auth");
// import 'source-map-support/register';
// Instead of:
// import sourceMapSupport from 'source-map-support';
// sourceMapSupport.install();
// import multer from 'multer';
const app = (0, express_1.default)();
const bodyParser = require('body-parser');
// const upload = multer({dest: 'uploads/'});
// const type = upload.array('images');
const frontAppUrl = process.env.FRONT_APP_URL;
app.use((0, cors_1.default)({
    origin: [frontAppUrl, '159.223.93.6'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: '*',
}));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
const mainRouter = express_1.default.Router();
mainRouter.use('/auth', auth_1.authRouter);
// mainRouter.use('/images/:dir/:key', async (req, res) => {
//     const key = req.params.key;
//     const dir = req.params.dir;
//     // const readStream = await getFileStream(key, dir);
//     // readStream.pipe(res);
// });
// app.use('/', mainRouter);
// app.use('/', type, mainRouter);
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
// const handler = serverless(app);
// module.exports.handler = async (
//     event: APIGatewayProxyEvent | APIGatewayProxyEventV2,
//     context: Context,
// ) => {
//     // you can do other things here
//     const result = await handler(event, context);
//     // and here
//     return result;
// };
//# sourceMappingURL=index.js.map