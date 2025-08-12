
const express = require("express");
const router = express.Router();

const { createFAQ, getAllFAQs, deletefaq, updatefaq } = require("../controllers/faqController");

router.post('/createfaq', createFAQ);
router.get('/getallfaq', getAllFAQs);
router.delete('/deletefaq/:id',deletefaq)
router.put('/updatefaq/:id',updatefaq)
module.exports = router;
