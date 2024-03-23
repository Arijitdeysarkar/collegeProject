import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { studentLogout, newerChats, previousChats} from '../redux/action/studentAction'


const Home = () => {
    const history = useHistory()
    const store = useSelector((store) => store)
    const [name, setName] = useState("")
    useEffect(() => {
        if (store.student.student.student.name) {
            setName(store.student.student.student.name)
        }
    }, [store.student.student.student.name])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(newerChats(store.student.student.student.name))
        dispatch(previousChats(store.student.student.student.name))
    }, [store.student.newerChats.length])
    const logoutHandler = () => {
        dispatch(studentLogout())
        history.push('/')
    }
    return (
        <div className="container-fluid">
             <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-lg navbar-light  bg-transparent">
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
                                <li className="nav-item active">
                                    <button type="button" className="btn" onClick={()=>history.push('/home')}><li style={{fontWeight:'bold',color:'#fff'}}>{name.toUpperCase()}</li></button>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn" onClick={()=>history.push('/student/updateProfile')}><li style={{fontWeight:'bold',color:'#fff'}}>UPDATE PROFILE</li></button>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" style={{fontWeight:'bold',color:'#fff'}} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        ACADEMIC </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/student/testPerformance">Test Performance</Link>
                                        <Link className="dropdown-item" to="/student/attendence">Attendance</Link>
                                        <Link className="dropdown-item" to="/student/getAllSubjects">Student Subject List</Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn" onClick={()=>history.push('/studentDetails')}><li style={{fontWeight:'bold',color:'#fff'}}>STUDENTS</li></button>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn" onClick={()=>history.push('/student/examFees')}><li style={{fontWeight:'bold',color:'#fff'}}>EXAM FEES</li></button>
                                </li>
                                {/* <li className="nav-item">
                                    <button type="button" className="btn " onClick={()=>history.push('/student/uploadMarksheet')}><li style={{fontWeight:'bold',color:'#fff'}}>EXAMSHEET</li></button>
                                </li> */}
                                <li className="nav-item">
                                    <button type="button" className="btn" onClick={()=>history.push('/studentDetails')}><li style={{fontWeight:'bold',color:'#fff'}}>NEW CONVERSATION ({store.student.newerChats.length})</li></button>
                                </li>
                                <li className="nav-item">
                                    <button type="button" className="btn" onClick={()=>history.push('/student/updatePassword')}><li style={{fontWeight:'bold',color:'#fff'}}>UPDATE PASSWORD</li></button>
                                </li>
                               
                            </ul>
                           
                        </div>
                        <div>
                            <button style={{fontWeight:'bold',color:'#fff',listStyle:'none'}} onClick={logoutHandler} type="button" className="btn"><li>LOGOUT</li></button>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Home
