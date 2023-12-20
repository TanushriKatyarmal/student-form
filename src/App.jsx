

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './App.css'

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    place: '',
    phone: '',
    college: '',
    year: ''
  });

  const [allFormData, setAllFormData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Add current form data to the array
    setAllFormData((prevFormData) => [...prevFormData, formData]);

    // Clear the form fields
    setFormData({
      name: '',
      email: '',
      place: '',
      phone: '',
      college: '',
      year: ''
    });
  };

  const handleExportToExcel = () => {
    // Create a new Excel workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(allFormData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, 'all_data.xlsx');
  };

  return (
        <div className='main'> 
            <div className="card">
            <h2>Student Form</h2>
            <br /><br />
            <form onSubmit={handleFormSubmit}>
                <label> Name: </label>
                <br />
                <input type="text" name="name" value={formData.name}  onChange={handleInputChange} />
                <br /><br />
                <label>  Email: </label>
                <br />
                <input type="text" name="email" value={formData.email}  onChange={handleInputChange} />
                <br /><br />
                <label> Place: </label>
                <br />
                <input type="text" name="place" value={formData.place}  onChange={handleInputChange} />
                <br /><br />
                <label> Phone: </label>
                <br />
                <input   type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                <br /><br />
                <label> College: </label>
                <br />
                <input type="text" name="college" value={formData.college}  onChange={handleInputChange} />
                <br /><br />
                <label> Year of Passout: </label>
                <br />
                <input type="date" name="year" value={formData.name}  onChange={handleInputChange} />
                <br /><br />
                <button type="submit">Submit</button>
                <button onClick={handleExportToExcel}>Export</button>
            </form>
            </div>
        </div>
  );
};

export default App;