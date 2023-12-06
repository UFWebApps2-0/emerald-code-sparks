import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Form, message} from 'antd';
import { getStudies, updateStudy, getStudy } from '../../Utils/requests';
import './EditStudy.less';


export default function EditStudy({ id }) {
  const [visible, setVisible] = useState(false);
  const [studyName, setStudyName] = useState('');
  const [studyDescription, setStudyDescription] = useState('');


  const handleStudentChange = async (selectedValues) => {
    //console.log(selectedValues);
    const studentsData = [];
    for (const studentID of selectedValues) {
      const student = await getStudent(studentID);
      studentsData.push(student.data);
    }
    setSelectedStudentsData(studentsData);
  };

  const showModal = async () => {
    setVisible(true);
    const res = await getStudy(id);
    setGradeId(res.data.grade.id);
    setStudyName(res.data.studyName);
    setStudyDescription(res.data.studyDescription);
    setStandard(res.data.standards_id);
  };


  useEffect(() => {
    const fetchUnit = async () => {
      const res = await getStudy(id);
      setStudyName(res.data.studyName);
      setStudyDescription(res.data.studyDescription);
    };
    fetchUnit();
  }, [id]);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateStudy(
      id,
      studyName,
      studyDescription,
    );
    if (response.err) {
      message.error('Fail to update study');
    } else {
      message.success('Update study success');
      //setDisplayName(studyName);
      setVisible(false);
    }
  };

  return (
    <div>
      <Button type="primary" 
        onClick={showModal}>
        Edit Study
        
      </Button>
      <Modal
        title='Study Editor'
        visible={visible}
        width='35vw'
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form
          id='add-units'
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout='horizontal'
          size='default'
        >
          <Form.Item id='form-label' label='Study Name'>
            <Input
              onChange={(e) => setStudyName(e.target.value)}
              value={studyName}
              placeholder='Enter study name'
            />
          </Form.Item>
          <Form.Item id='form-label' label='Description'>
            <Input.TextArea
              onChange={(e) => setStudyDescription(e.target.value)}
              value={studyDescription}
              rows={3}
              placeholder='Enter study description'
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
