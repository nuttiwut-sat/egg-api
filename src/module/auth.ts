import _ from 'lodash';
import 'source-map-support/register';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {GetDataFromToken} from '../engine/auth_util';
import {PRouter} from '../engine/router';
import {sendMailAWS, textResetPassword} from '../engine/sendmail';
import {v4 as uuidv4} from 'uuid';
import {Customer, PrismaClient, Role, User} from '@prisma/client';

const prisma = new PrismaClient();

const currentRouter = new PRouter();

const secretKey = process.env.SECRET_AUTH_PASS || 'KEY';
const inputUser = (user: User) => {
    return {
        name: user.name.trim() || '',
        username: user.username.trim() || '',
        password: bcrypt.hashSync(user.password.trim() || '', 8),
        role: user.role,
    };
};
const inputCustomer = (user: Customer) => {
    return {
        name: user.name.trim() || '',
        email: user.email.trim() || '',
        lineID: user.lineID.trim() || '',
        tel: user.tel.trim() || '',
        role: user.role,
    };
};

const getUser = {
    ID: true,
    name: true,
    username: true,
    role: true,
};

currentRouter.post('/register', async (req: any, _req) => {
    const body = req.body;
    const customerInput = inputCustomer(body);

    const user = await prisma.customer.create({
        data: {
            ...customerInput,
        },
    });

    return {
        message: 'Add user success',
    };
});

currentRouter.get('/', async (req: any, _req) => {
    const user = await prisma.user.findMany({
        select: {
            ...getUser,
        },
    });

    return user;
});

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

currentRouter.post('/login', async (req: any, _res) => {
    const body = req.body;
    const username = body.username as string;
    const lineID = body.lineID as string;
    if (username) {
        const user = await prisma.user.findFirst({
            where: {
                username: username.trim(),
            },
            select: {
                ...getUser,
                password: true,
            },
        });
        if (!user) {
            throw new Error('ไม่มีชื่อผู้ใช้นี้ในระบบ');
        }
        const keyIsValid = bcrypt.compareSync(body.password, user.password);
        if (!keyIsValid) {
            throw new Error('รหัสผ่านไม่ถูกต้อง');
        }
        var token = jwt.sign({id: user.ID}, secretKey, {
            expiresIn: 86400, // 24 hours
        });
        return {
            id: user.ID,
            name: user.name,
            username: user.name,
            role: user.role,
            accessToken: token,
        };
    } else if (lineID) {
        const customer = await prisma.customer.findFirst({
            where: {
                lineID: lineID.trim(),
            },
        });

        if (!customer) {
            throw new Error('ไม่มีชื่อผู้ใช้นี้ในระบบ');
        }
        var token = jwt.sign({id: customer.ID}, secretKey, {
            expiresIn: 86400, // 24 hours
        });
        return {
            id: customer.ID,
            name: customer.name,
            email: customer.email,
            lineID: customer.lineID,
            tel: customer.tel,
            role: customer.role,
            accessToken: token,
        };
    }
    throw new Error('ไม่มีชื่อผู้ใช้นี้ในระบบ');
});

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

currentRouter.post('/get-user-by-token', async (req: any, _res) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
        throw new Error('No token');
    }
    const userId = (jwt.verify(accessToken, secretKey) as any).ID as string;
    const user = await prisma.user.findFirst({
        where: {
            ID: userId,
        },
        select: {
            ...getUser,
        },
    });
    let token;
    if (!user) {
        // Customer
        const customer = await prisma.customer.findFirst({
            where: {
                ID: userId,
            },
        });

        if (!customer) {
            throw new Error('ไม่มีชื่อผู้ใช้นี้ในระบบ');
        }
        token = jwt.sign({id: customer.ID}, secretKey, {
            expiresIn: 86400, // 24 hours
        });

        return {
            id: customer.ID,
            name: customer.name,
            email: customer.email,
            lineID: customer.lineID,
            tel: customer.tel,
            role: customer.role,
            accessToken: token,
        };
    }
    token = jwt.sign({id: user.ID}, secretKey, {
        expiresIn: 86400, // 24 hours
    });

    return {
        id: user.ID,
        name: user.name,
        username: user.username,
        role: user.role,
        accessToken: token,
    };
});

export const authRouter = currentRouter.router;
