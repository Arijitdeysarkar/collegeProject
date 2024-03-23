import React from 'react';
import '../Style/AcademicsPage.css';
import Nav from '../Components/Nav';

function Academics() {
  return (
    <div>
     <Nav/>

    

      <main>
        <section className="section">
          <h2>Programs</h2>
          <img src="program-image.jpg" alt="Programs" className="img-fluid" />
          <p>Explore our wide range of academic programs.</p>
        </section>

        <section className="section">
          <h2>Faculty</h2>
          <img src="faculty-image.jpg" alt="Faculty" className="img-fluid" />
          <p>Meet our dedicated and experienced faculty members.</p>
        </section>

        <section className="section">
          <h2>Admissions</h2>
          <img src="admissions-image.jpg" alt="Admissions" className="img-fluid" />
          <p>Learn about our admission process and requirements.</p>
        </section>
      </main>

      <footer>
        &copy; 2023 College Name
      </footer>
    </div>
  );
}

export default Academics;
