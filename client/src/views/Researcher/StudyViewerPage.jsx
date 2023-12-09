import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Table, Modal, Input, Button } from 'antd';
import './StudyViewerPage.less';
import fakeStudyData from './fakeStudyData.json'; 

const StudyViewerPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (record) => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Study Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Researchers',
      dataIndex: 'researchers',
      key: 'researchers',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
  ];

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div className='main-content'>
        <h1>Study Viewer</h1>
        <Table dataSource={fakeStudyData} columns={columns} onRow={(record) => ({
          onClick: () => showModal(record),
        })} />
        <Modal title="Student List" visible={isModalVisible} onCancel={handleCancel} footer={null}>
          {/* Scrollable student table goes here */}
          <Button>Add Students</Button>
          <Input placeholder="Student Search" />
        </Modal>
      </div>
    </div>
  );
};

export default StudyViewerPage;
