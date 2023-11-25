import React, { useState } from "react";
import { Button, Form, Input, Select, Modal } from "antd";
import createGalleryObject from "../Gallery/CreateGalleryObject";
import "./GalleryObjectForm.less";
import { useGlobalState } from '../../Utils/userState';

const { Option } = Select;

function GalleryObjectForm({workspaceRef, classroomId}) {
  console.log(classroomId)
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [value] = useGlobalState('currUser');

  const handleCreateGalleryObject = () => {
    setModalVisible(true); // Show the modal
  };

  const handleFormSubmit = async (values) => {
    //NEED TO CHECK FOR IF LOGGED IN --RIGHT NOW HAVE IT SO THAT YOU CAN ONLY SUBMIT FROM LOGGED IN
    console.log(value);
    const userName = value.username;
    if (values.visibility == null) {
      values.visibility = "Public";
    }
    //NEED TO ADD TYPE OF PROJECT AS A PARAMETER IF OTHER TYPES BECOME POSSIBLE
    createGalleryObject(values.title, userName, 0, 0, values.visibility, 'Project', classroomId, workspaceRef);
    console.log("Submitted values:", values);
    form.resetFields();
    setModalVisible(false); // Hide the modal after submission
  };

  return (
    <div className="GalleryObjectFormWrapper">
      <Button onClick={handleCreateGalleryObject}>Publish to Gallery</Button>
      <Modal
        title="Publish to Gallery"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
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
              <Select defaultValue="Public">
                <Option value="Public">Public</Option>
                <Option value="Organization">Organization</Option>
                <Option value="Classroom">Classroom</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Publish
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default GalleryObjectForm;
