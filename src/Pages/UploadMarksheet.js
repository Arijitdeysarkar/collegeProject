import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import { studentUpdate, studentLogout,newerChats, previousChats, getAllSubjects, studentUploadMarksheet } from '../redux/action/studentAction'
import HomeHelper from '../Components/HomeHelper'
import classnames from 'classnames'

import { useHistory, withRouter } from 'react-router-dom'
import axios from 'axios'

const UploadMarksheet = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const history = useHistory()
    const [gender, setGender] = useState('')
    const [studentMobileNumber, setContactNumber] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [fatherMobileNumber, setFatherContactNumber] = useState('')
    const [aadharCard, setAadharCard] = useState('')
    const [error, setError] = useState({})
    const [avatar, setAvatar] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [allexam, setAllExam] = useState([])
    const [exam, setExam] = useState("")
    const [ExamId, setExamId] = useState("")
    const [errorHelper, setErrorHelper] = useState({})
    const [subjectCode, setSubjectCode] = useState("")

    const imagehandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setAvatar(img)
        }
    }
    const url = "http://localhost:5000"

    const GetExam = async() => {
        axios({
            method: 'Get',
            url: url + "/api/admin/getAllExam",
        }).then((res)=>{
            console.log('allllexammm',res.data)
            setAllExam(res.data)
        })
        .catch((err)=>err && console.log('err',err))
    }
    useEffect(() => {
        dispatch(getAllSubjects({department:store.student.student.student.department,year:store.student.student.student.year}))
     },[])
    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])
    useEffect(()=>{
        GetExam()
    },[])
    const formHandler = async(e) => {
        e.preventDefault()
     
        const Data = {
            examId:ExamId,
            studentId:store.student.student.student.registrationNumber,
            department:store.student.student.student.department,
            subjectCode:subjectCode,
            // marksheet:avatar
        }
        // const formData = new FormData()
        // formData.append("examId", ExamId)
        // formData.append("studentId", store.student.student.student.registrationNumber)
        // formData.append("department",  store.student.student.student.department)
        // formData.append("subjectCode", subjectCode)
        // formData.append("marksheet", avatar)
       
        await axios({
            method: 'Post',
            url: url + "/api/student/UploadMarksheet",
            data:Data,
            headers:{'Content-Type':'application/json'},
        }).then((res)=>{
            console.log('allllexammm',res.data)
            alert("MarkSheet Uploaded Successfully")
        })
        .catch((err)=>err && console.log('err',err))
        // const data  = await axios({
        //     method: 'Post',
        //     url: url + `/api/student/UploadMarksheet`,
        //     headers:{'Content-Type':'multipart/formdata'},
        //     data: formData
        // })
        // if(data){
        //     alert("MarkSheet Uploaded Successfully")
        // }
        // else{
        //     alert("MarkSheet Uploaded Failed")
        // }
        // dispatch(studentUploadMarksheet(formData))
        
       
    }
    useEffect(() => {
        if (store.errorHelper) {
            setErrorHelper(store.errorHelper)
        }
    }, [store.errorHelper])
        return (
            <div>
                {store.student.isAuthenticated ? <>
                    <HomeHelper />
                    <div className="container mt-5">
                        <div className="row ">
                            <div className="col-md-5 w-100 m-auto">
                                <form onSubmit={formHandler}>
        <p>Name:  <input type="text" name="name" value={store.student.student.student.name}   style={{width:'65vh',height:'35px' ,paddingLeft:'10px'}} required/></p>
        <p>Department:  <input type="text" name="name" value={store.student.student.student.department}   style={{width:'65vh',height:'35px' ,paddingLeft:'10px'}} required/></p>
        
        <p>Registration No:  <input type="text" value={store.student.student.student.registrationNumber} name="Registration No" id="Registration No"   style={{width:'65vh',height:'35px' ,paddingLeft:'10px'}}  required/></p>
        <div className="form-group" style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <label htmlFor="examId">Exam: {'  '}</label>
                                <select onChange={(e) =>{
                                    console.log('wewewewe',(e.target.value))
                                    setExam(e.target.value)
                                    setExamId(allexam.filter((re)=>re.exam == e.target.value)[0]._id)
                                } 
                            } value={exam} className={classnames("form-control",
                                    {
                                        'is-invalid': errorHelper.exam

                                    })} id="examId" style={{width:'60vh',height:'35px' ,paddingLeft:'10px'}} >
                                    <option>Select</option>
                                    {allexam.map((re,ind)=>
                                        <option key={ind} value={re.exam}>{re.exam}</option>
                                    )}
                                    
                                </select>
                                {errorHelper.exam && (<div classNameName="invalid-feedback">{errorHelper.exam}</div>)}
                            </div>
                            <div className="form-group">
                                <label htmlFor="subjectId">Subject Code</label>
                                <select onChange={(e) => setSubjectCode(e.target.value)} className={classnames("form-control",
                                    {
                                        'is-invalid': errorHelper.subjectCode

                                    })} id="subjectId">
                                    <option>Select</option>
                                    {
                                        store.student.allSubjects.map(subjectCodeName =>
                                            <option>{subjectCodeName.subjectName}</option>
                                        )
                                    }
                                </select>
                                {errorHelper.subjectCode && (<div classNameName="invalid-feedback">{errorHelper.subjectCode}</div>)}
                            </div>
                            {console.log('avatar',avatar)}
                                    <div className="form-group">
                                        <label htmlFor="inputId">ExamSheet</label>
                                        <input required className="form-control" type="file" accept=".jpg,.png,.jpeg" id="inputId" onChange={imagehandler}></input>
                                    </div>
                                   
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </> : (history.push('/'))}
                
            </div>
        )
    }

export default withRouter(UploadMarksheet)
