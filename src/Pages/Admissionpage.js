import React from 'react';
import { useHistory, Link } from 'react-router-dom'

const AdmissionPage = () => {
  const history = useHistory()

  const programsData = [
    {
      title: "Bachelor of Engineering in Computer Science",
      duration: "4 years",
      description: "Learn the fundamentals of computer science and programming.",
      image:"https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/06/software-engineer.jpeg.jpg"
    },
    {
      title: "Bachelor of Engineering in Mechanical Engineering",
      duration: "4 years",
      description: "Explore the principles of mechanical engineering and design.",
      image: "https://exploreengineering.ca/sites/default/files/2020-02/NEM_mechanical.jpg"
    },
    {
      title: "Bachelor of Engineering in Electrical Engineering",
      duration: "4 years",
      description: "Gain knowledge in electrical systems and technology.",
      image: "https://images.ctfassets.net/gogvzi849aaj/6E1LznxWtjZG7IfhHx3aU4/32fe9f15ea2c7ebb42ca54ed9dd8dd5c/Engineering_Hero.jpg?fm=webp&q=50"
    },
    // Add more programs as needed
  ];

  const admissionRequirements = [
    "High school diploma or equivalent",
    "Completed application form",
    "Letters of recommendation",
    "Official transcripts",
    "Standardized test scores (SAT or ACT)",
    "Personal statement"
    // Add more requirements as needed
  ];

  return (
    <div>
      <header className="bg-primary text-white text-center py-4" id='trail'>
        <h1 className="mb-0">Engineering College Admission</h1>
      </header>

      <nav className="bg-dark navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link"  onClick={()=>history.push('/')}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#programs">Programs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#admission">Admission</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" >Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section id="home" className="py-4" style={{ background: '#3498db', color: '#fff',height:'30vh' }}>
        <div className="container text-center">
          <h2>Welcome to our Engineering College!</h2>
          <p>Explore our programs and start your journey towards a successful career in engineering.</p>
          <p>Admissions are open for the upcoming academic year. Apply now!</p>
        </div>
      </section>

      <section id="programs" className="py-4 bg-light">
        <div className="container text-center">
          <h2 className="mb-4">Our Programs</h2>
          <div className="row">
            {programsData.map((program, index) => (
              <Program key={index} {...program} />
            ))}
          </div>
        </div>
      </section>

      <section id="admission" style={{marginTop:'10vh',paddingTop:'25vh'}} className="py-5">
        <div className="container text-center">
          <h2 style={{color:'turquoise'}}>Admission Information</h2>
          <ul>
            {admissionRequirements.map((requirement, index) => (
              <li key={index} style={{color:'#fff'}}>{requirement}</li>
            ))}
          </ul>
          <p style={{color:'teal'}}>Apply now to secure your spot in our prestigious engineering programs.</p>
        </div>
      </section>


      <footer className="bg-dark text-white text-center py-2">
        <p>&copy; 2023 Engineering College. All rights reserved.</p>
      </footer>
    </div>
  );
};

const Program = ({ title, duration, description, image }) => (
  <div className="col-md-4 mb-3">
    <div className="card">
      <img src={image} className="card-img-top" style={{height:'15vh'}} alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Duration: {duration}</p>
        <p className="card-text">{description}</p>
      </div>
    </div>
  </div>
);

export default AdmissionPage;
