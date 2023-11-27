import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import './GalleryItem.less';


/*
Done:
dropdown menu that has Public, Organizational, and Classroom.
The default option is Public gallery.
Select a file to upload.

Missings:
the variables for roles of users
what will happen if the submit button is clicked
where do the projects come from? where is the data?
*/
function GalleryUploader()
{
	
	//File selection
	const [selectedFile, setSelectedFile] = useState(null);
    const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
	};
	
	//File Upload
	const handleFileUpload = () => {
    if (selectedFile) 
	{
      alert(`what will happens if ${selectedFile.name}`);
    } else {
      alert('Please select a file to upload.');
    }
  };
  
	//What is the default option?
	const [selectedOption, setSelectedOption] = useState('Public');

	const handleOptionClicked = (event) => {
		 setSelectedOption(event.target.value);
	};

	const handleSubmit = () => 
	{
		alert("que sera, sera~~~ Whatever Will Be, Will Be~~~");
	};

	return (
	<div className='nav-padding container'>
	<div className='galleryItem'>
		<h1>Publish Setting</h1>
		<label>Role: {<p>roleOfpublisher</p>}</label>
		<br/>
		<label>Visibility:</label>
		<br/>
			<select value={selectedOption} onChange={handleOptionClicked}>
				<option value="Public">Public</option>
				<option value="Organizational">Organizational</option>
				<option value="Classroom">Classroom</option>
			</select>
			<br/>
		<input type="file" onChange={handleFileSelect} />
		<button onClick={handleFileUpload}>Upload</button>
		<br/>
		<br/>
		<button onClick={handleSubmit}>Submit</button>
		<br/>
	</div>
	</div>
	);
}export default GalleryUploader;