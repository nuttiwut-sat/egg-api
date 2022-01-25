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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
require("source-map-support/register");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router_1 = require("../engine/router");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const currentRouter = new router_1.PRouter();
const secretKey = process.env.SECRET_AUTH_PASS || 'KEY';
const inputUser = (user) => {
    return {
        name: user.name.trim() || '',
        username: user.username.trim() || '',
        password: bcryptjs_1.default.hashSync(user.password.trim() || '', 8),
        role: user.role,
    };
};
const getUser = {
    id: true,
    name: true,
    username: true,
    role: true,
};
currentRouter.post('/', (req, _req) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log('=================', body);
    const userInput = inputUser(body);
    const user = yield prisma.user.create({
        data: Object.assign({}, userInput),
    });
    return {
        message: 'Add user success',
    };
}));
currentRouter.get('/', (req, _req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findMany({
        select: Object.assign({}, getUser),
    });
    return user;
}));
// currentRouter.put('/:id/role', async (req: any, _req) => {
//     const id = req.params.id;
//     const role = req.body.role as Role;
//     const user = await prisma.user.update({
//         where: {
//             ID: id,
//         },
//         data: {
//             role: role,
//         },
//     });
//     return {
//         message: 'Update role success',
//     };
// });
// currentRouter.post('/login', async (req: any, _res) => {
//     const body = req.body;
//     const username = body.username as string;
//     const user = await prisma.user.findFirst({
//         where: {
//             username: username.trim(),
//         },
//         select: {
//             ...getUser,
//             password: true,
//         },
//     });
//     if (!user) {
//         throw new Error('User not found');
//     }
//     const keyIsValid = bcrypt.compareSync(body.password, user.password);
//     if (!keyIsValid) {
//         throw new Error('Invalid password');
//     }
//     var token = jwt.sign({id: user.id}, secretKey, {
//         expiresIn: 86400, // 24 hours
//     });
//     return {
//         id: user.id,
//         name: user.name,
//         username: user.username,
//     };
// });
// currentRouter.post('/reset-pass-mail', async (req: any, _res) => {
//     const body = req.body;
//     const emails: string[] = [body.email];
//     if (emails.length < 0) {
//         throw new Error('No email');
//     }
//     let user = await prisma.user.findUnique({
//         where: {
//             email: body.email,
//         },
//         select: {
//             ID: true,
//             name: true,
//             username: true,
//         },
//     });
//     if (!user) {
//         return 'Send re password success.';
//     }
//     const userId = user.ID;
//     const rdKey = uuidv4();
//     const gen = rdKey.substring(0, 5);
//     const repassKey = bcrypt.hashSync(gen, 5);
//     user = await prisma.user.update({
//         where: {
//             id: userId,
//         },
//         data: {
//             repassKey: repassKey,
//         },
//     });
//     const key = `${userId}--${rdKey}`;
//     const fromName = 'PodduangXPD';
//     const fromMail = process.env.EMAIL_ACCOUNT_MAILER!;
//     const frontAppUrl = process.env.FRONT_APP_URL!;
//     const content = textResetPassword(
//         user.name,
//         `${frontAppUrl}/#/repass/${key}`,
//     );
//     sendMailAWS(emails, 'Reset password', content, fromName, fromMail)
//         .then(res => {
//             if (res) {
//                 return 'Send re password success.';
//             } else {
//                 throw new Error('Something wrong');
//             }
//         })
//         .catch(err => {
//             throw new Error(err.message);
//         });
//     return 'Send re password success.';
// });
// currentRouter.post('/reset-pass', async (req: any, _res) => {
//     const body = req.body;
//     const userId = body.userId;
//     const user = await prisma.user.findFirst({
//         where: {
//             id: userId,
//         },
//         select: {
//             id: true,
//             name: true,
//             repassKey: true,
//         },
//     });
//     if (!user || !user.repassKey) {
//         throw new Error('Error re password');
//     }
//     const repassKey: string = body.repassKey;
//     const gen = repassKey.substring(0, 5);
//     const keyIsValid = bcrypt.compareSync(gen, user.repassKey);
//     if (!keyIsValid) {
//         console.log('============================2');
//         throw new Error('Error re password');
//     }
//     const password = bcrypt.hashSync(body.password.trim() || '', 8);
//     await prisma.user.update({
//         where: {
//             id: userId,
//         },
//         data: {
//             password: password,
//         },
//     });
//     return 'Re password success';
// });
// currentRouter.post('/get-user-by-token', async (req: any, _res) => {
//     const accessToken = req.headers.authorization;
//     if (!accessToken) {
//         throw new Error('No token');
//     }
//     const userId = (jwt.verify(accessToken, secretKey) as any).ID as string;
//     const user = await prisma.user.findFirst({
//         where: {
//             ID: userId,
//         },
//         select: {
//             ...getUser,
//         },
//     });
//     if (!user) {
//         throw new Error('User not found');
//     }
//     var token = jwt.sign({id: user.id}, secretKey, {
//         expiresIn: 86400, // 24 hours
//     });
//     return {
//         id: user.id,
//         name: user.name,
//         username: user.username,
//         role: user.role,
//         accessToken: token,
//     };
// });
exports.authRouter = currentRouter.router;
//# sourceMappingURL=auth.js.map