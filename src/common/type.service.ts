import multer from 'multer'
import path from 'path'
import { BASE_URL } from './constant';
export class TypeService {
    constructor() {

    }

    //#region convert utc time
    static convertUTC(date: Date | string) {
        if (!date) return null
        date = new Date(date)
        const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        return utcDate
    }
    //#endregion


}


// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/'); // specify the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        if (file) {
            const filePath = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
            req.body[file.fieldname] = BASE_URL + 'upload' + "/" + filePath
            cb(null, filePath);
        }
    },
});
export const upload = multer({ storage: storage });

