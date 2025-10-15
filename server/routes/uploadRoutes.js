import express from 'express'
import multer from 'multer'
import { getReports, uploadXML } from '../controllers/xmlController.js';


const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post("/upload", upload.single('file'), uploadXML);
router.get('/reports', getReports)

export default router;