import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { adminLogout } from '../redux/action/adminAction'


const Home = () => {
    const store = useSelector(store => store)
    const [name, setName] = useState("")
    const navigate = useHistory()
    useEffect(() => {

        if (store.admin.admin.name) {
            setName(store.admin.admin.name)
        }
    }, [store.admin.admin.name])
    
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(adminLogout())
        navigate.push('/')
    }
    return (
        <div className="container-fluid">
          
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
                {/* <h4 className="navbar-brand mt-1" href="">ASA</h4> */}
                <img
        alt='logo'
        className='logo-image'
        style={{
            float: "left",
            width: "50px",
            borderRadius: "40px",
           marginTop: "5px",
            marginRight: "10px",
            marginLeft: "10px"

        }}
        src="https://upload.wikimedia.org/wikipedia/commons/5/57/Techno_india_logo.jpg"
      />
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li style={{fontWeight:'normal',color:'#fff'}} className="nav-item active">
                            <button type="button" className="btn" onClick={()=>navigate.push('/admin')}>
                                <li style={{fontWeight:'bold',color:'#fff'}}>{name.toUpperCase()}</li></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn" onClick={()=>navigate.push('/admin/addFaculty')}>
                                <li style={{fontWeight:'bold',color:'#fff'}}>ADD FACULTY</li></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn" onClick={()=>navigate.push('/admin/addStudent')}>
                               <li style={{fontWeight:'bold',color:'#fff'}}>ADD STUDENT</li></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn" onClick={()=>navigate.push('/admin/addSubject')}>
                              <li style={{fontWeight:'bold',color:'#fff'}}>ADD SUBJECT</li></button>
                        </li>
                        {/* <li className="nav-item">
                            <button type="button" className="btn"><Link to="/admin/allExam"><li>ADD EXAM</li></Link></button>
                        </li> */}
                        <li className="nav-item">
                            <button type="button" className="btn" onClick={()=>navigate.push('/admin/addAdmin')}>
                                <li style={{fontWeight:'bold',color:'#fff'}}>ADD ADMIN</li></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn" onClick={()=>navigate.push('/admin/allFaculties')}>
                                <li style={{fontWeight:'bold',color:'#fff'}}>OUR FACULTIES</li></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn" onClick={()=>navigate.push('/admin/allStudents')}>
                                <li style={{fontWeight:'bold',color:'#fff'}}>OUR STUDENTS</li></button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn" onClick={()=>navigate.push('/admin/allSubject')}>
                                <li style={{fontWeight:'bold',color:'#fff'}}>SUBJECTS</li></button>
                        </li>

                    </ul>
                </div>
                <div>

                    <button style={{ listStyle: "None" }} onClick={logoutHandler} type="button" className="btn"><li style={{fontWeight:'bold',color:'#fff'}}>LOGOUT</li></button>

                </div>
            </nav>
        </div>
    )
}

export default Home
