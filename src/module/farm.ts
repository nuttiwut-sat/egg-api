import _ from 'lodash';
import 'source-map-support/register';
import {GetDataFromToken} from '../engine/auth_util';
import {PRouter} from '../engine/router';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const currentRouter = new PRouter();

const getFarm = {
    ID: true,
    name: true,
    createdAt: true,
    updatedAt: true,
};

currentRouter.post('/', async (req: any, _req) => {
    const dataFromToken = await GetDataFromToken(req).catch(e => {
        console.error(e);
        throw new Error('Unauthorized');
    });
    const name = req.body.name as string;

    const farm = await prisma.farm.create({
        data: {
            name: name.trim(),
        },
    });

    return farm;
});

currentRouter.get('/', async (req: any, _req) => {
    const dataFromToken = await GetDataFromToken(req).catch(e => {
        console.error(e);
        throw new Error('Unauthorized');
    });
    const farm = await prisma.farm.findMany({
        select: {
            ...getFarm,
        },
    });

    return farm;
});

export const farmRouter = currentRouter.router;
