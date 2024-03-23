import "../Style/facultyStudentLogin.css";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { adminSignup } from "../redux/action/adminAction";
import { facultySignup } from "../redux/action/facultyAction";
import { studentSignup } from "../redux/action/studentAction";

function SignUpPage() {
  const store = useSelector((state) => state);
  const param = useParams();
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [Admin, setAdmin] = useState(param.id == "admin" ? true : false);
  const [Faculty, setFaculty] = useState(param.id == "faculty" ? true : false);
  const [Student, setStudent] = useState(param.id == "student" ? true : false);
  const [department, setDepartment] = useState("");
  const [dob, setDob] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [error, setError] = useState({});
  const [designation, setDesignation] = useState("");
  const [facultyMobileNUmber, setFacultyMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const [year, setYear] = useState("");
  const [Joinyear, setJoinyear] = useState("");

  const [section, setSection] = useState("");
  const [studentMobileNumber, setStuContactNumber] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherMobileNumber, setFatherContactNumber] = useState("");

  const fromHandler = () => {
    setIsLoading(true);
    dispatch(
      adminSignup({
        name: name,
        email: Email,
        password: Pass,
        department: department,
        contactNumber: Number(contactNumber),
        dob: dob,
      })
    );
    setTimeout(()=>{

      history.push("/");
    },4000)
  };
  const facultyFormHandler = (e) => {
    setIsLoading(true);
    dispatch(
      facultySignup({
        name: name,
        email: Email,
        password: Pass,
        department: department,
        facultyMobileNumber: Number(facultyMobileNUmber),
        dob: dob,
        designation:designation,
        joiningYear:Joinyear,
        aadharCard:Number(aadharCard),
        gender:gender

      })
    );
   
    setTimeout(()=>{

      history.push("/");
    },4000)
  };

  const studentFormHandler = (e) => {
    setIsLoading(true);
    dispatch(
      studentSignup({
        name: name,
        email: Email,
        password: Pass,
        department: department,
        studentMobileNumber: Number(studentMobileNumber),
        dob: dob,
        year:Number(year),
        aadharCard:Number(aadharCard),
        gender:gender,
        section:section,
        batch:Joinyear,
        fatherMobileNumber:Number(fatherMobileNumber),
        fatherName:fatherName,
        subjects:[]
      })
    )
    setTimeout(()=>{

      history.push("/");
    },4000)
  };
  const Signup = () => {
    if (Admin) {
      fromHandler();
    }
    else if(Faculty) {
      facultyFormHandler()
    }
    else if(Student){
      studentFormHandler()
    }
  };
  useEffect(() => {
    if (store.admin.isAuthenticated) {
      history.push("/admin");
    }
  }, [store.admin.isAuthenticated]);
  useEffect(() => {
    if (store.student.isAuthenticated) {
      history.push("/home");
    }
  }, [store.student.isAuthenticated]);
  useEffect(() => {
    if (store.faculty.isAuthenticated) {
      history.push("/faculty");
    }
  }, [store.faculty.isAuthenticated]);

  useEffect(() => {
    if (store.error || store.faculty.isAuthenticated) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [store.error, store.faculty.isAuthenticated]);
  useEffect(() => {
    if (store.error || store.student.isAuthenticated) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [store.error, store.student.isAuthenticated]);
  useEffect(() => {
    if (store.error || store.admin.isAuthenticated) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [store.error, store.admin.isAuthenticated]);
  useEffect(() => {
    if (store.error) {
      setError(store.error);
    }
  }, [store.error]);
  return (
    <div style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        id="trail"
        style={{
          backgroundColor: "#fff",
          paddingTop: "5vh",
          paddingBottom: "10vh",
          width: "200vh",
        }}
      >
        {console.log("paramsmmss", param)}
        <div
          class="form-check form-check-inline "
          style={{
            alignSelf: "center",
            marginLeft: "30%",
            marginBottom: "30px",
          }}
        >
          <input
            class="form-check-input"
            className="checkinput"
            onChange={() => {
              setAdmin(true);
              setFaculty(false);
              setStudent(false);
            }}
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value={Admin}
            checked={Admin}
          />
          <label style={{fontWeight:'bold',color:'#fff'}} class="form-check-label" for="inlineRadio1">
            Admin
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            className="checkinput"
            onChange={() => {
              setAdmin(false);
              setFaculty(true);
              setStudent(false);
            }}
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value={Faculty}
            checked={Faculty}
          />
          <label style={{fontWeight:'bold',color:'#fff'}} class="form-check-label" for="inlineRadio2">
            Faculty
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            className="checkinput"
            onChange={() => {
              setAdmin(false);
              setFaculty(false);
              setStudent(true);
            }}
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio3"
            value={Student}
            checked={Student}
          />
          <label style={{fontWeight:'bold',color:'#fff'}} class="form-check-label" for="inlineRadio3">
            Student{" "}
          </label>
        </div>

        <div className="register">
          <h2>Register Here</h2>
          {Admin ? (
            <form noValidate>
              <div className="form-group">
                <input
                  className="inputbox"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                />
                <input
                  className="inputbox"
                  type="text"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
                <input
                  className="inputbox"
                  type="password"
                  value={Pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Enter password"
                />
                <div className="form-group">
                  <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="departmentId">Department</label>
                  <select
                    onChange={(e) => setDepartment(e.target.value)}
                    className="inputbox"
                    id="departmentId"
                  >
                    <option>Select</option>
                    <option value="E.C.E">E.C.E</option>
                    <option value="C.S.E">C.S.E</option>
                    <option value="E.E.E">E.E.E</option>
                    <option value="I.T">I.T</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                  </select>
                  {error.department && (
                    <div className="invalid-feedback">{error.department}</div>
                  )}
                </div>
                <div>
                  <div className="form-group">
                    <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="dobId" >DOB</label>
                    <input
                      onChange={(e) => setDob(e.target.value)}
                      type="date"
                      className="inputbox"
                      id="dobId"
                    />
                    {error.dob && (
                      <div className="invalid-feedback">{error.dob}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="numberId">Contact Number</label>
                    <input
                      onChange={(e) => setContactNumber(e.target.value)}
                      type="number"
                      className="inputbox"
                      id="numberId"
                    />
                    {error.contactNumber && (
                      <div className="invalid-feedback">
                        {error.contactNumber}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          ) : Faculty ? (
            <form noValidate>
              <div className="form-group">
                <input
                  className="inputbox"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                />
                <input
                  className="inputbox"
                  type="text"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
                <input
                  className="inputbox"
                  type="password"
                  value={Pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Enter password"
                />
                <div className="form-group">
                  <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="departmentId">Department</label>
                  <select
                    onChange={(e) => setDepartment(e.target.value)}
                    className="inputbox"
                    id="departmentId"
                  >
                    <option>Select</option>
                    <option value="E.C.E">E.C.E</option>
                    <option value="C.S.E">C.S.E</option>
                    <option value="E.E.E">E.E.E</option>
                    <option value="I.T">I.T</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                  </select>
                  {error.department && (
                    <div className="invalid-feedback">{error.department}</div>
                  )}
                </div>
                <div className="form-group">
                  <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="designationId">Designation</label>
                  <select
                    onChange={(e) => setDesignation(e.target.value)}
                    className="inputbox"
                    id="designationId"
                  >
                    <option>Select</option>
                    <option value="Assistant Professor">
                      Assistant Professor
                    </option>
                    <option value="Senior Professer">Senior Professer</option>
                  </select>
                  {error.designation && (
                    <div className="invalid-feedback">{error.designation}</div>
                  )}
                </div>
                <div>
                  <div className="form-group">
                    <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="dobId">DOB</label>
                    <input
                      onChange={(e) => setDob(e.target.value)}
                      type="date"
                      className="inputbox"
                      id="dobId"
                    />
                    {error.dob && (
                      <div className="invalid-feedback">{error.dob}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="genderId">Gender</label>
                    <select
                      onChange={(e) => setGender(e.target.value)}
                      className="inputbox"
                      id="genderId"
                    >
                      <option>Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="Joining" >Joining year</label>
                    <input
                      onChange={(e) => setJoinyear(e.target.value)}
                      type="number"
                      className="inputbox"
                      id="Joining"
                    />
                  </div>
                  <div className="form-group">
                    <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="numberId">Contact Number</label>
                    <input
                      onChange={(e) => setFacultyMobileNumber(e.target.value)}
                      type="number"
                      className="inputbox"
                      id="numberId"
                    />
                    {error.contactNumber && (
                      <div className="invalid-feedback">
                        {error.contactNumber}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="aadharId">Aadhar Card Number</label>
                    <input
                      onChange={(e) => setAadharCard(e.target.value)}
                      type="number"
                      className="inputbox"
                      id="aadharId"
                    />
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <form noValidate>
              <div className="form-group">
                <input
                  className="inputbox"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                />
                <input
                  className="inputbox"
                  type="text"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
                <input
                  className="inputbox"
                  type="password"
                  value={Pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Enter password"
                />
                <div className="form-group">
                  <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="departmentId">Department</label>
                  <select
                    onChange={(e) => setDepartment(e.target.value)}
                    className="inputbox"
                    id="departmentId"
                  >
                    <option>Select</option>
                    <option value="E.C.E">E.C.E</option>
                    <option value="C.S.E">C.S.E</option>
                    <option value="E.E.E">E.E.E</option>
                    <option value="I.T">I.T</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                  </select>
                  {error.department && (
                    <div className="invalid-feedback">{error.department}</div>
                  )}
                </div>
                <div className="form-group">
                  <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="yearId">Year</label>
                  <select
                    onChange={(e) => setYear(e.target.value)}
                    className="inputbox"
                    id="yearId"
                  >
                    <option>Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                  {error.year && (
                    <div className="invalid-feedback">{error.year}</div>
                  )}
                </div>
                <div className="form-group">
                    <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="Joining" >Joining year</label>
                    <input
                      onChange={(e) => setJoinyear(e.target.value)}
                      type="number"
                      className="inputbox"
                      id="Joining"
                    />
                  </div>
                <div className="form-group">
                  <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="sectionId">Section</label>
                  <select
                    onChange={(e) => setSection(e.target.value)}
                    className="inputbox"
                    id="sectionId"
                  >
                    <option>Select</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                  {error.section && (
                    <div className="invalid-feedback">{error.section}</div>
                  )}
                </div>
                <div>
                  <div className="form-group">
                    <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="dobId">DOB</label>
                    <input
                      onChange={(e) => setDob(e.target.value)}
                      type="date"
                      className="inputbox"
                      id="dobId"
                    />
                    {error.dob && (
                      <div className="invalid-feedback">{error.dob}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="genderId">Gender</label>
                    <select
                      onChange={(e) => setGender(e.target.value)}
                      className="inputbox"
                      id="genderId"
                    >
                      <option>Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="numberId">Contact Number</label>
                    <input
                      onChange={(e) => setStuContactNumber(e.target.value)}
                      type="number"
                      className="inputbox"
                      id="numberId"
                    />
                    {error.contactNumber && (
                      <div className="invalid-feedback">
                        {error.contactNumber}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="fatherId">Father Name</label>
                    <input
                      onChange={(e) => setFatherName(e.target.value)}
                      type="text"
                      className="inputbox"
                      id="fatherId"
                    />
                  </div>
                  <div className="form-group">
                    <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="fathercnId">Father Contact Number</label>
                    <input
                      onChange={(e) => setFatherContactNumber(e.target.value)}
                      type="number"
                      className="inputbox"
                      id="fathercnId"
                    />
                  </div>
                  <div className="form-group">
                    <label style={{fontWeight:'bold',color:'#fff'}} htmlFor="aadharId">Aadhar Card Number</label>
                    <input
                      onChange={(e) => setAadharCard(e.target.value)}
                      type="number"
                      className="inputbox"
                      id="aadharId"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}
          {!isLoading && (
            <button className="button" type="button" onClick={() => Signup()}>
              Sign Up
            </button>
          )}
          <h3 style={{ marginTop: "20px", marginBottom: "2vh", color: "#fff" }}>
            Already have an account ?
          </h3>{" "}
          <h2>
            <Link style={{ color: "#fff", textDecoration: "none" }} to="/">
              LogIn
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
