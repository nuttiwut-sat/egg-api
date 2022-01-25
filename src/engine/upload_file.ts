import fs from 'fs';
import moment from 'moment';

const uploadFile = (file: any) => {
    const path = file.path;
    const nameFile = path;
    const fileStream = fs.createReadStream(nameFile);
    return nameFile;
};

export {uploadFile};
