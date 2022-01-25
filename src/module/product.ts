import _ from 'lodash';
import 'source-map-support/register';
import {GetDataFromToken} from '../engine/auth_util';
import {PRouter} from '../engine/router';
import {PrismaClient, Product} from '@prisma/client';
import {uploadFile} from '../engine/upload_file';

const prisma = new PrismaClient();

const currentRouter = new PRouter();

const inputProduct = (product: Product, imgName: string) => {
    return {
        name: product.name || '',
        img: imgName || '',
        type: product.type || 'EGG',
        cost: product.cost || 0,
        price: product.price || 0,
    };
};

currentRouter.post('/', async (req: any, _req) => {
    const dataFromToken = await GetDataFromToken(req).catch(e => {
        console.error(e);
        throw new Error('Unauthorized');
    });

    const body = req.body;
    const files: any[] = req.files;

    const fileName = await uploadFile(files[0]);
    const productData: any = JSON.parse(body.data);
    const input = inputProduct(productData, fileName);
    const product = await prisma.product.create({
        data: {
            ...input,
        },
    });
    return product;
});

currentRouter.get('/', async (req: any, _req) => {
    const dataFromToken = await GetDataFromToken(req).catch(e => {
        console.error(e);
        throw new Error('Unauthorized');
    });
    const product = await prisma.product.findMany({
        select: {
            ID: true,
            name: true,
            img: true,
            cost: true,
            price: true,
            stockAmount: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return product;
});

export const productRouter = currentRouter.router;
