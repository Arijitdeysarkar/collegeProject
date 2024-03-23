import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'


import FacultyHomeHelper from '../Components/FacultyHomeHelper'


const FacultyInterface = () => {
    const history = useHistory()
    const store = useSelector((store) => store)
    return (
        <>
            {store.faculty.isAuthenticated ? <div className="container-fluid body" id='trail'>
                <FacultyHomeHelper />
                <div className="container">
                    <div className="row mt-5">
                        <div style={{marginBottom:'10%'}} className="col-md-2">
{
    console.log('storeeeeee',store)
}
                        </div>
                        <div className="col-md-8"  style={{marginBottom:'10%'}}>
                            <div className="row">
                                <div className="col-5">
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={store.faculty.faculty.faculty.avatar} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{store.faculty.faculty.faculty.name}</h5>
                                            <h5 className="card-title">{store.faculty.faculty.faculty.registrationNumber}</h5>
                                            <Link to='/faculty/updateProfile'>UPDATE PROFILE</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <table className="table border">
                                        <tbody>
                                            <tr>
                                                <td style={{color:'#000',fontWeight:'bold'}}>Name</td>
                                                <td style={{color:'#000',fontWeight:'bold'}}>{store.faculty.faculty.faculty.name}</td>
                                            </tr>
                                            <tr>
                                                <td style={{color:'#000',fontWeight:'bold'}}>Email</td>
                                                <td style={{color:'#000',fontWeight:'bold'}}>{store.faculty.faculty.faculty.email}</td>
                                            </tr>
                                            <tr>
                                                <td style={{color:'#000',fontWeight:'bold'}}>Registration Number</td>
                                                <td style={{color:'#000',fontWeight:'bold'}}>{store.faculty.faculty.faculty.registrationNumber}</td>
                                            </tr>
                                            <tr>
                                                <td style={{color:'#000',fontWeight:'bold'}}>Date Of Birth</td>
                                                <td style={{color:'#000',fontWeight:'bold'}}>{store.faculty.faculty.faculty.dob}</td>
                                            </tr>
                                            <tr>
                                                <td style={{color:'#000',fontWeight:'bold'}}>Designation</td>
                                                <td style={{color:'#000',fontWeight:'bold'}}>{store.faculty.faculty.faculty.designation}</td>
                                            </tr>
                                            <tr>
                                                <td style={{color:'#000',fontWeight:'bold'}}>Joining Year</td>
                                                <td style={{color:'#000',fontWeight:'bold'}}>{store.faculty.faculty.faculty.joiningYear}</td>
                                            </tr>
                                            <tr>
                                                <td style={{color:'#000',fontWeight:'bold'}}>Department</td>
                                                <td style={{color:'#000',fontWeight:'bold'}}>{store.faculty.faculty.faculty.department}</td>
                                            </tr>
                                            <tr>
                                                <td style={{color:'#000',fontWeight:'bold'}}>Gender</td>
                                                <td style={{color:'#000',fontWeight:'bold'}}>{store.faculty.faculty.faculty.gender ? store.faculty.faculty.faculty.gender :

                                                    "NA"
                                                }</td>
                                            </tr>
                                            <tr>
                                                <td style={{color:'#000',fontWeight:'bold'}}>Contact Number</td>
                                                <td style={{color:'#000',fontWeight:'bold'}}>{store.faculty.faculty.faculty.facultyMobileNumber ?
                                                    store.faculty.faculty.faculty.facultyMobileNumber : "NA"}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                       

                    </div>
                </div>

            </div> : (history.push('/'))}
           
        </>


    )
}

export default FacultyInterface
