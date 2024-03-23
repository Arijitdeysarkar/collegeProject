import React, {useState,useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {facultyLogout} from '../redux/action/facultyAction'



const Home = () => {
    const store = useSelector((store)=>store)
    const history = useHistory()
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    useEffect(() => {

        if (store.faculty.faculty.faculty.name) {
            setName(store.faculty.faculty.faculty.name)
        }
    }, [store.faculty.faculty.faculty.name])
    const logoutHandler = () => {
        dispatch(facultyLogout())
        history.push('/')
    }
    return (
        <div className="container-fluid">
            {/* <Header /> */}
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
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
                                <button type="button" className="btn" onClick={()=>history.push('/faculty/updateProfile')}><li style={{fontWeight:'bold',color:'#fff'}}>UPDATE PROFILE</li></button>
                                </li>
                                <li className="nav-item">
                                <button type="button" className="btn" onClick={()=>history.push('/attendenceFaculty')}><li style={{fontWeight:'bold',color:'#fff'}}>MARK ATTENDANCE</li></button>
                                </li>
                                <li className="nav-item">
                                <button type="button" className="btn" onClick={()=>history.push('/faculty/uploadMarks')}><li style={{fontWeight:'bold',color:'#fff'}}>UPLOAD MARKS</li></button>
                                </li>
                                <li className="nav-item">
                                <button type="button" className="btn" onClick={()=>history.push('/faculty/updatePassword')}><li style={{fontWeight:'bold',color:'#fff'}}>UPDATE PASSWORD</li></button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <button style={{listStyle:"None"}} onClick={logoutHandler} type="button" className="btn"><li style={{fontWeight:'bold',color:'#fff'}}>LOGOUT</li></button>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Home
