import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import createGalleryObject from "../Gallery/CreateGalleryObject"
import './GalleryObjectForm.less';

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
      <Button onClick={() => setFormVisible(true)}>Create Gallery Object</Button>
      {formVisible && (
        <Form onSubmit={handleFormSubmit}>
          <label htmlFor="title">Project Name:</label>
          <Input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />
          <label htmlFor="visibility">Visibility:</label>
          <Select
            id="visibility"
            name="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="organization">Organization</option>
            <option value="classroom">Classroom</option>
          </Select>
          <br />
          <Button type="submit">Publish</Button>
        </Form>
      )}
    </div>
  );
}

export default GalleryObjectForm;
