const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongodb')
//Validation
const validateAdminRegisterInput = require('../validation/adminRegister')
const validateFacultyRegisterInput = require('../validation/facultyRegister')
const validateStudentRegisterInput = require('../validation/studentRegister')
const validateAdminLoginInput = require('../validation/adminLogin')
const validateSubjectRegisterInput = require('../validation/subjectRegister')

//Models
const Subject = require('../models/subject')
const Exam = require('../models/exam')
const sendEmail = require("../utils/nodemailer");

const Student = require('../models/student')
const Faculty = require('../models/faculty')
const Admin = require('../models/admin')

//Config
const keys = require('../config/key')

function createToken(data) {
    return jwt.sign(data, "mySecretKey")
  }
module.exports = {
    addAdmin: async (req, res, next) => {
        try {
            const { name, email, dob, department, contactNumber, password } = req.body
            
            //VALIDATE REQUEST BODY
            if (!name || !email || !dob || !department || !contactNumber){
                return res.status(400).json({success:false, message:"Probably you have missed certain fields"})
            }

            const admin = await Admin.findOne({ email })
           

            if (admin) {
                return res.status(400).json({success:false, message:"Email already exist"})
            }
            const avatar = "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
            let departmentHelper;
            if (department === "C.S.E") {
                departmentHelper = "01"
            }
            else if (department === "E.C.E") {
                departmentHelper = "02"
            }
            else if (department === "I.T") {
                departmentHelper = "03"
            }
            else if (department === "Mechanical") {
                departmentHelper = "04"
            }
            else if (department === "Civil") {
                departmentHelper = "05"

            }
            else if (department === "E.E.E") {
                departmentHelper = "06"
            }
            else {
                departmentHelper = "00"
            }

            const admins = await Admin.find({ department })
            let helper;
            if (admins.length < 10) {
                helper = "00" + admins.length.toString()
            }
            else if (admins.length < 100 && admins.length > 9) {
                helper = "0" + admins.length.toString()
            }
            else {
                helper = admins.length.toString()
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(password, 10)
            var date = new Date();
            const joiningYear = date.getFullYear()
            var components = [
                "ADM",
                date.getFullYear(),
                departmentHelper,
                helper
            ];
            var registrationNumber = components.join("");
            const token = createToken({
                name:name,
                email:email,
                password: hashedPassword,
                joiningYear:joiningYear,
                registrationNumber:registrationNumber,
                department:department,
                avatar:avatar,
                contactNumber:contactNumber,
                dob:dob
            })
            const newAdmin = await new Admin({
                name:name,
                email:email,
                password: hashedPassword,
                joiningYear:joiningYear,
                registrationNumber:registrationNumber,
                department:department,
                avatar:avatar,
                contactNumber:contactNumber,
                dob:dob,
                token:token
            })
            const stat = await newAdmin.save()
            await sendEmail(email, password, "SignUp", registrationNumber);
            return res.status(200).json({ success: true, message: "Admin registerd successfully",token:token,Data:newAdmin })
        }
        catch (error) {
            return res.status(400).json({ success: false, message: error.message })
        }
    },
    getAllStudents: async (req, res, next) => {
        try {
            const { branch, name } = req.body
            const students = await Student.find({})
            if (students.length === 0) {
                return res.status(404).json({ message: "No students found" })
            }
            res.status(200).json({ result: students })
        }
        catch (err) {
            res.status(400).json({ message: `error in getting all student", ${err.message}` })
        }

    },
    adminLogin: async (req, res, next) => {
        try {
          
            const { registrationNumber, password } = req.body;

            const admin = await Admin.findOne({ registrationNumber })
            if (!admin) {
                return res.status(404).json({message:'Registration number not found'});

            }
            const isCorrect = await bcrypt.compare(password, admin.password)
            if (!isCorrect) {
                return res.status(404).json({message: 'Invalid Credentials'});

            }
            const payload = {
                id: admin.id, name: admin.name, email: admin.email,
                contactNumber: admin.contactNumber, avatar: admin.avatar,
                registrationNumber: admin.registrationNumber,
                joiningYear: admin.joiningYear,
                department: admin.department
            };
            jwt.sign(
                payload,
                keys.secretOrKey,
                
                (err, token) => {
                    res.json({
                        success: true,
                        token: token
                    });
                }
            );
        }
        catch (err) {
            console.log("Error in admin login", err.message)
        }

    },
    addStudent: async (req, res, next) => {
        try {
          
            const { name, email, year, fatherName, aadharCard,
                gender, department, section, dob, studentMobileNumber,
                fatherMobileNumber } = req.body

            const student = await Student.findOne({ email })
            if (student) {
                errors.email = "Email already exist"
                return res.status(400).json(errors)
            }
            const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })
            let departmentHelper;
            if (department === "C.S.E") {
                departmentHelper = "01"
            }
            else if (department === "E.C.E") {
                departmentHelper = "02"
            }
            else if (department === "I.T") {
                departmentHelper = "03"
            }
            else if (department === "Mechanical") {
                departmentHelper = "04"
            }
            else if (department === "Civil") {
                departmentHelper = "05"

            }
            else {
                departmentHelper = "06"
            }

            const students = await Student.find({ department })
            let helper;
            if (students.length < 10) {
                helper = "00" + students.length.toString()
            }
            else if (students.length < 100 && students.length > 9) {
                helper = "0" + students.length.toString()
            }
            else {
                helper = students.length.toString()
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(dob, 10)
            var date = new Date();
            const batch = date.getFullYear()
            var components = [
                "STU",
                date.getFullYear(),
                departmentHelper,
                helper
            ];

            var registrationNumber = components.join("");
            const newStudent = await new Student({
                name,
                email,
                password: hashedPassword,
                year,
                fatherName,
                aadharCard,
                gender,
                registrationNumber,
                department,
                section,
                batch,
                avatar,
                dob,
                studentMobileNumber,
                fatherMobileNumber,
                
            })
            await newStudent.save()
            const subjects = await Subject.find({department, year })
            if (subjects.length !== 0) {
                for (var i = 0; i < subjects.length; i++) {
                    newStudent.subjects.push({_id:subjects[i]._id,name:subjects[i].subjectName})
                }
            }
            await newStudent.save()
            res.status(200).json({ result: newStudent })
        }
        catch (err) {
            res.status(400).json({ message: `error in adding new student", ${err.message}` })
        }

    },
    getAllStudents: async (req, res, next) => {
        try {
            const { branch, name } = req.body
            const students = await Student.find({})
            if (students.length === 0) {
                return res.status(404).json({ message: "No students found" })
            }
            res.status(200).json({ result: students })
        }
        catch (err) {
            res.status(400).json({ message: `error in getting all student", ${err.message}` })
        }
    },
    addFaculty: async (req, res, next) => {
        try {
       
            const { name, email, designation, department, facultyMobileNumber,
                aadharCard, dob, gender } = req.body
            const faculty = await Faculty.findOne({ email })
            if (faculty) {
                errors.email = 'Email already exist'
                return res.status(400).json(errors)
            }
            const avatar = gravatar.url(req.body.email, {
                s: '200', // Size
                r: 'pg', // Rating
                d: 'mm' // Default
            });
            let departmentHelper;
            if (department === "C.S.E") {
                departmentHelper = "01"
            }
            else if (department === "E.C.E") {
                departmentHelper = "02"
            }
            else if (department === "I.T") {
                departmentHelper = "03"
            }
            else if (department === "Mechanical") {
                departmentHelper = "04"
            }
            else if (department === "Civil") {
                departmentHelper = "05"
            }
            else {
                departmentHelper = "06"
            }

            const faculties = await Faculty.find({ department })
            let helper;
            if (faculties.length < 10) {
                helper = "00" + faculties.length.toString()
            }
            else if (faculties.length < 100 && faculties.length > 9) {
                helper = "0" + faculties.length.toString()
            }
            else {
                helper = faculties.length.toString()
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(dob, 10)
            var date = new Date();
            const joiningYear = date.getFullYear()
            var components = [
                "FAC",
                date.getFullYear(),
                departmentHelper,
                helper
            ];

            var registrationNumber = components.join("");
            const newFaculty = await new Faculty({
                name,
                email,
                designation,
                password: hashedPassword,
                department,
                facultyMobileNumber,
                gender,
                avatar,
                aadharCard,
                registrationNumber,
                dob,
                joiningYear
            })
            await newFaculty.save()
            res.status(200).json({ result: newFaculty })
        }
        catch (err) {
            console.log("error", err.message)
            res.status(400).json({ message: `error in adding new Faculty", ${err.message}` })
        }

    },
    getAllFaculty: async (req, res, next) => {
        try {
            const faculties = await Faculty.find({})
            if (faculties.length === 0) {
                return res.status(404).json({ message: "No Record Found" })
            }
            res.status(200).json({ result: faculties })
        }
        catch (err) {
            res.status(400).json({ message: `error in getting new Faculty", ${err.message}` })
        }

    },
    addSubject: async (req, res, next) => {
        try {
           
            const { totalLectures, department, subjectCode,
                subjectName, year } = req.body
                console.log('totalLectures',totalLectures)
            const subject = await Subject.findOne({ subjectCode })
            console.log('subject',subject)
            if (subject) {
                errors.subjectCode = "Given Subject is already added"
                return res.status(400).json({success:false,errors})
            }
            const newSubject = await new Subject({
                totalLectures,
                department,
                subjectCode,
                subjectName,
                year
            })
            await newSubject.save()
            const students = await Student.find({ department, year })
            console.log('students',students)
            if (students.length === 0) {
                errors.department = "No branch found for given subject"
                return res.status(400).json({success:false,errors})
            }
            else if(students.length> 0) {
                for (var i = 0; i < students.length; i++) {
                    students[i].subjects.push({_id:newSubject._id,name:newSubject.subjectName})
                    await students[i].save()
                }
                res.status(200).json({success:true, newSubject })
            }
        }
        catch (err) {
            console.log(`error in adding new subject", ${err.message}`)
        }
    },
    getAllSubjects: async (req, res, next) => {
        try {
            const allSubjects = await Subject.find({})
            if (!allSubjects) {
                return res.status(404).json({ message: "You havent registered any subject yet." })
            }
            res.status(200).json(allSubjects)
        }
        catch (err) {
            res.status(400).json({ message: `error in getting all Subjects", ${err.message}` })
        }
    },

    addExam: async (req,res,next) => {
        try {
           
            const {exam,fees, date } = req.body
            console.log('object,r',req.body)
            const examm = await Exam.find({ exam:exam })
            console.log('subject',examm)
            if (exam) {
                errors.examFees = "Given exam is already added"
                return res.status(400).json(errors)
            }
            const NewExam = await new Exam({
                exam:exam,
                fees:fees,
                date:date
            })
            console.log('NewExam',NewExam)
         
            const stat = await NewExam.save()
            console.log('sucesss Staratat',stat)
            return res.status(200).json({ success: true, message: "Exam Added suucessfully",Data:stat })
        }
        catch (err) {
            console.log(`error in adding new exam", ${err}`)
        }
    },

    getAllExam: async (req, res, next) => {
        try {
            const allExam = await Exam.find({})
            if (!allExam) {
                return res.status(404).json({ message: "You havent registered any exam yet." })
            }
            res.status(200).json(allExam)
        }
        catch (err) {
            res.status(400).json({ message: `error in getting all Exam", ${err.message}` })
        }
    },
    getFeesByExamId: async (req, res, next) => {
        try {
            console.log('id',req.body.id)
            const allExam = await Exam.findOne({"exam":(req.body.id)})
            console.log('allExam',allExam)
            if (!allExam) {
                return res.status(404).json({ message: "You havent registered any exam yet." })
            }
            res.status(200).json({'Fee':allExam.fees})
        }
        catch (err) {
            res.status(400).json({ message: `error in getting all Exam", ${err.message}` })
        }
    },


    getAllFaculty: async (req, res, next) => {
        try {
            const { department } = req.body
            const allFaculties = await Faculty.find({ department })
            res.status(200).json({ result: allFaculties })
        }
        catch (err) {
            console.log("Error in gettting all faculties", err.message)
        }
    },
    getAllStudent: async (req, res, next) => {
        try {
            const { department, year } = req.body
            const allStudents = await Student.find({ department, year })
            res.status(200).json({ result: allStudents })
        }
        catch (err) {
            console.log("Error in gettting all students", err.message)
        }
    },
    getAllSubject: async (req, res, next) => {
        try {
            const { department, year } = req.body
            const allSubjects = await Subject.find({ department, year })
            res.status(200).json({ result: allSubjects })
        }
        catch (err) {
            console.log("Error in gettting all students", err.message)
        }
    }
}