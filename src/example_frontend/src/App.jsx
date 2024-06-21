import React, { useState, useEffect } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
import { example_backend } from 'declarations/example_backend';
import './index.scss';

function App() {
  
  const [students, setStudents] = useState([]);
  const [showAddStudentForm, setShowAddStudentForm] = useState(true);
  const [newStudent, setNewStudent] = useState({ firstName: '', lastName: '', school: '' });

  const getStudents = async () => {
    try {
      const studentsList = await example_backend.getStudents();
      console.log("Fetched students:", studentsList);
      setStudents(studentsList);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };
  getStudents(); 
  const AddStudent = async (event) => {
    event.preventDefault();
    console.log("Submitting student:", newStudent);
    document.getElementById('save').innerHTML="Saving...";
    try {
      await example_backend.addStudent(newStudent.firstName, newStudent.lastName, newStudent.school);
      console.log("Student added successfully");
      document.getElementById('save').innerHTML="Save"
      setNewStudent({ firstName: '', lastName: '', school: '' });
      setShowAddStudentForm(true);
      getStudents(); // Fetch students after adding a new student
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };
  getStudents();
  const handleFetchStudents = () => {
    getStudents();
    setShowAddStudentForm(true); // Close the add student form when fetching students
  };

  return (
    
    <main className='container'>
      <h1 className='text-center'>Student Management System</h1>
      <hr />
      <br />
      
         <div className="row">
            <div className="col-md-6">
              <div className="card shadow">
                <div className="card-header">Registration form</div>
                <div className="card-body">
                  {showAddStudentForm && (
                  
                    <form onSubmit={AddStudent}>
                      <label for='fn'>
                        First Name: </label>
                        <input  className='form-control w-100 shadow' type="text"
                          value={newStudent.firstName}
                          onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                          required id='fn'
                          placeholder='Enter your first name'
                        />
                     
                      <label for='ln'>
                        Last Name:</label>
                        <input className='form-control mb-2 shadow'
                          type="text"
                          value={newStudent.lastName}
                          onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
                          required id='ln'
                          placeholder='Enter your last name'
                        />
                      
                      <label for='email'>
                        Email:</label>
                        <input  className='form-control mb-2 shadow'
                          type="email"
                          value={newStudent.school}
                          onChange={(e) => setNewStudent({ ...newStudent, school: e.target.value })}
                          required id='email'
                          placeholder='Enter your email'
                        />
                      
                      <button type="submit" className='btn btn-success form-control mt-2' id='save'>Save</button>
                    </form>
                
                  )}
                </div>
            </div>
          </div>
          
          
          <section className="col-md-6">
          {getStudents}
            <div className="card shadow">
                <div className="card-header">All Students</div>
                <div className="card-body">
                  <table className='table table-striped table-info table-bordered'>
                    <tr>
                      <th>#</th>
                      <th>FIRST NAME</th>
                      <th>LAST NAME</th>
                      <th>EMAIL</th>
                    </tr>
                    {students.map((student, index) => (
                      <tr key={index}><td>{index+1}</td>
                        <td>{student.firstName}</td><td>{student.lastName}</td><td>{student.school}</td>
                      </tr>
                    ))}
                  </table>
                </div>
            </div>
          </section>
        </div>
    </main>
  );
}

export default App;