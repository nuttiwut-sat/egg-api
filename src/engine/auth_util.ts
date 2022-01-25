import * as jwtIn from 'jsonwebtoken';
import * as _ from 'lodash';

const signKey = process.env.SECRET_AUTH_PASS || '';

export const verifyToken = (
    token: string,
    func: jwtIn.VerifyOptions & {
        complete: true;
    },
) => {
    return jwtIn.verify(token, signKey, func);
};

export const getDecodedDataToken = async (token: string) => {
    const data = await new Promise((resolve, reject) => {
        // console.log(`Decoding token '${token}' with Secret '${signKey}' ` );
        jwtIn.verify(token, signKey, (err, decoded) => {
            if (err) {
                console.error('jwt Verify Error with ' + err);
                reject('Token Error');
            } else {
                resolve(decoded);
            }
        });
    });

    return data;
};

export const _GetDataFromToken = async (event: any) => {
    let ObjFromToken = null;

    let token = event.headers['Authorization']
        ? event.headers['Authorization']
        : null;
    // console.log('token', token);
    token = event.headers['authorization']
        ? event.headers['authorization']
        : null;

    if (token) {
        ObjFromToken = (await getDecodedDataToken(token)) as any;

        if (ObjFromToken['data']) {
            ObjFromToken = ObjFromToken['data'];
        }

        return ObjFromToken;
    } else {
        throw new Error();
    }
};

export const GetDataFromToken = async (event: any) => {
    return _GetDataFromToken(event).then(tokenData => {
        console.info(`Authentication Success with Token Data`);
        console.info(tokenData);
        return tokenData;
    });
};
