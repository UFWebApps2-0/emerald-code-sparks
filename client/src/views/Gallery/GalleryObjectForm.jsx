import React, { useState } from "react";
import  createGalleryObject  from "../Gallery/CreateGalleryObject"


function GalleryObjectForm() {
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [formVisible, setFormVisible] = useState(false);

  const handleFormSubmit = (e) => {

    createGalleryObject(title, "", 0, 0, visibility, "Project", "discussion board object here"); //ADD USERNAME HERE 

    // Clear the form and hide it
    setTitle("");
    setVisibility("public");
    setFormVisible(false);
  };

  return (
    <div>
      <button onClick={() => setFormVisible(true)}>Create Gallery Object</button>
      {formVisible && (
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="title">Project Name:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />
          <label htmlFor="visibility">Visibility:</label>
          <select
            id="visibility"
            name="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="organization">Organization</option>
            <option value="classroom">Classroom</option>
          </select>
          <br />
          <button type="submit">Publish</button>
        </form>
      )}
    </div>
  );
}

export default GalleryObjectForm;
