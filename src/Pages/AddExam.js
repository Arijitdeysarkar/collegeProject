import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { adminAddExam, adminAddSubject } from '../redux/action/adminAction'
import AdminHomeHelper from '../Components/AdminHomeHelper'

const AdminAddExam = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const history = useHistory()
    const [ExamName, setExamName] = useState('')
    const [ExamFees, setExamFees] = useState(0)
    const [date,setDate] = useState('')

    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        if (store.error) {
            setError(store.error)
        }
    }, [store.error])
    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(adminAddExam({
            exam:ExamName,
            fees:Number(ExamFees),
            date:date
        }))
       
    }

    useEffect(() => {
        if (store.admin.adminAddSubjectFlag) {
            setError({})
        }
    }, [store.admin.adminAddSubjectFlag])

    useEffect(() => {
        if (store.error ) {
            setIsLoading(false)
            setExamName('')
            setExamFees('')
            setDate('')
        }
        else setIsLoading(false)
    }, [store.error])

    return (
        <div>
            {store.admin.isAuthenticated ? <> <AdminHomeHelper />
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <div className="d-flex justify-content-md-center vh-100">
                                <form noValidate onSubmit={formHandler}>
                                    <div className="form-group">
                                        <label htmlFor="enameId">Exam Name</label>
                                        <input onChange={(e) => setExamName(e.target.value)} type="text" className={classnames("form-control",
                                            {
                                                'is-invalid': error.examName
                                            })} id="enameId" />
                                        {error.examName && (<div className="invalid-feedback">{error.examName}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="feesId">Exam Fees</label>
                                        <input onChange={(e) => setExamFees(e.target.value)} type="number" className={classnames("form-control",
                                            {
                                                'is-invalid': error.examFees
                                            })} id="feesId" />
                                        {error.examFees && (<div className="invalid-feedback">{error.examFees}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="examDate">Exam Date</label>
                                        <input onChange={(e) => setDate(e.target.value)} type="date" className={classnames("form-control",
                                            {
                                                'is-invalid': error.examDate
                                            })} id="examDate" />
                                        {error.examDate && (<div className="invalid-feedback">{error.examDate}</div>)}
                                    </div>
                                  
                                    <div class="row justify-content-center">
                                        <div class="col-md-1">
                                            {
                                                isLoading && <div class="spinner-border text-primary" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {!isLoading && <button type="submit" className="btn btn-info  ">Add Subject</button>}
                                   
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div></>: (history.push('/'))}
        </div>
    )
}

export default AdminAddExam
