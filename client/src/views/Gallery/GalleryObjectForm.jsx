import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import createGalleryObject from "../Gallery/CreateGalleryObject";
import "./GalleryObjectForm.less";
import { useGlobalState } from '../../Utils/userState';


const { Option } = Select;

function GalleryObjectForm() {
  const [form] = Form.useForm();
  const [formVisible, setFormVisible] = useState(false);

  const handleCreateGalleryObject = () => {
    setFormVisible(!formVisible); // Toggle the form visibility
  };

  const handleFormSubmit = async (values) => {
    //NEED TO CHECK FOR IF LOGGED IN
    
    //const [value] = useGlobalState('currUser');
    //const userName = value.name;

    // DEFAULT USERNAME FOR NOW
    createGalleryObject(values.title, "test student", 0, 0, values.visibility, "Project");
    form.resetFields();
    setFormVisible(false); // Hide the form after submission
  };

  return (
    <div className={`GalleryObjectFormWrapper ${formVisible ? "visible" : ""}`}>
      <Button onClick={handleCreateGalleryObject}>Publish to Gallery</Button>
      {formVisible && (
        <Form form={form} onFinish={handleFormSubmit}>
          <div className="GalleryObjectForm">
            <Form.Item
              label="Project Name"
              name="title"
              rules={[{ required: true, message: "Please enter a project name!" }]}
            >
              <Input placeholder="Name the project" />
            </Form.Item>
            <Form.Item label="Visibility" name="visibility">
              <Select defaultValue="public">
                <Option value="public">Public</Option>
                <Option value="organization">Organization</Option>
                <Option value="classroom">Classroom</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Publish
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
    </div>
  );
}

export default GalleryObjectForm;
