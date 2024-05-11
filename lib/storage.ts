import multer from 'multer';

export const uploadStorage = multer({ dest: 'uploads/' });