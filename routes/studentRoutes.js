const express = require('express')
const passport = require('passport')
const router = express.Router()
const upload = require('../utils/multer')
const multer = require("multer");
// const check_auth = require("../middleware/check_auth");
const fileUploadStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
  destination: "public/uploads/",
});
const uploadInfo = multer({ storage: fileUploadStorage });

console.log("multer is configured & redy to use");
const { checkAttendence, getAllStudents, getStudentByName, studentLogin,
    updatePassword, forgotPassword, getStudentByRegName,
    postOTP, postPrivateChat, getPrivateChat, differentChats,
    previousChats, updateProfile, getAllSubjects, getMarks, studentSignup, FeePayment, checkout, verifyPayment, UploadMarksheet } = require('../controller/studentController')

router.post('/login', studentLogin)
router.post('/signup', studentSignup)
router.post('/forgotPassword', forgotPassword)

router.post('/postOTP', postOTP)

//UPLOAD PROFILE
router.post('/updateProfile',
    upload.single("avatar"), updateProfile)

//UPLOAD PASSWORD
router.post('/updatePassword', updatePassword)    

//CHAT RELATED ROUTES    
router.get('/chat/:roomId', getPrivateChat)

router.post('/chat/:roomId', postPrivateChat)
 
router.get('/chat/newerChats/:receiverName', differentChats)
    
router.get('/chat/previousChats/:senderName', previousChats)
    
router.post('/getMarks',getMarks)

router.post('/getAllSubjects', getAllSubjects)

router.post('/checkAttendence', checkAttendence)

//HELPER ROUTES
router.post('/getAllStudents', getAllStudents)

router.post('/getStudentByRegName', getStudentByRegName)

router.post('/getStudentByName', getStudentByName)

router.post('/FeePayment', FeePayment)

router.post('/checkout', checkout)

router.post('/verifyPayment', verifyPayment)

router.post('/UploadMarksheet', UploadMarksheet)





module.exports = router