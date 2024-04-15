const express = require("express");
const emailController = require('../controllers/emailController')
const fileHandleMiddleware = require('../middleware/fileHandleMiddleware')
const router =express.Router();


router.post('/sendMail',fileHandleMiddleware.single('attachment') ,emailController.sendMail)
router.post('/sendMailwithCount', emailController.sendMailCount)

module.exports = router;