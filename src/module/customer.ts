import _ from 'lodash';
import 'source-map-support/register';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {GetDataFromToken} from '../engine/auth_util';
import {PRouter} from '../engine/router';
import {v4 as uuidv4} from 'uuid';
import {PrismaClient, Role, User} from '@prisma/client';

const prisma = new PrismaClient();

const currentRouter = new PRouter();

const secretKey = process.env.SECRET_AUTH_PASS || 'KEY';

const getUser = {
    ID: true,
    name: true,
    username: true,
    role: true,
    createdAt: true,
};

currentRouter.get('/', async (req: any, _req) => {
    const dataFromToken = await GetDataFromToken(req).catch(e => {
        console.error(e);
        throw new Error('Unauthorized');
    });
    const user = await prisma.user.findMany({
        select: {
            ...getUser,
        },
    });

    return user;
});

currentRouter.get('/role/:role', async (req: any, _req) => {
    const dataFromToken = await GetDataFromToken(req).catch(e => {
        console.error(e);
        throw new Error('Unauthorized');
    });
    const role = req.params.role;

    const user = await prisma.customer.findMany({
        where: {
            role,
        },
        select: {
            ID: true,
            email: true,
            name: true,
            lineID: true,
            tel: true,
            createdAt: true,
        },
    });

    return user;
});

export const customerRouter = currentRouter.router;
