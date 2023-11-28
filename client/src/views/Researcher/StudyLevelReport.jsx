import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Form, Space, Select} from 'antd';
import './StudyLevelReport.less';
import { useNavigate } from 'react-router-dom';
import { sendEmail, getResearchers, getStudies, deleteStudy} from '../../Utils/requests';
import { Link } from 'react-router-dom';

const StudyLevelReport = () => {
  const [studies, setStudies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const studiesRes = await getStudies();
      if (studiesRes.error) {
        console.error('Fail to retrieve studies');
      }
      console.log(studiesRes.data);
      setStudies(studiesRes.data);
    };
    fetchData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteStudy = (study) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: `Are you sure you want to delete the study with ID ${study.studyID}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        const deleteRes = await deleteStudy(study.id);
        if (deleteRes.error) {
          console.error('Fail to delete study');
        }
        const studiesRes = await getStudies();
        if (studiesRes.error) {
          console.error('Fail to retrieve studies');
        }
        setStudies(studiesRes.data);
        
      },
    });
  };

  const handleAddResearcher = async () => {
    console.log('add researcher');
    form.validateFields().then((values) => {
        console.log(values);
        //sanitize input
        values.first_name = values.first_name.replace(/[^a-zA-Z0-9]/g, '');
        values.last_name = values.last_name.replace(/[^a-zA-Z0-9]/g, '');
        values.email = values.email.replace(/[^a-zA-Z0-9@.]/g, '');
        values.studyID = values.studyID.replace(/[^a-zA-Z0-9]/g, '');
        setIsModalVisible(false);
        const emailTemplate = {
          name: values.first_name + ' ' + values.last_name,
          email: values.email,
          studyID: values.studyID,
        }
        //send email to admin
        sendEmail(emailTemplate);
        form.resetFields();
  });
}
  const columns = [
    {
      title: 'Study ID',
      key: 'studyID',
      dataIndex: 'studyID',
      width: '2%',
      align: 'left',
    },
    {
      title: 'Study Name',
      key: 'studyName',
      dataIndex: 'studyName',
      width: '6%',
      align: 'left',
    },
    {
      title: "Study Tag",
      key: "studyTag",
      dataIndex: "studyTag",
      width: "2%",
      align: "left",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Select
            mode="multiple"
            placeholder="Select Study Tags"
            value={selectedKeys}
            onChange={(values) => setSelectedKeys(values)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          >
            <Option value="design">Design</Option>
            <Option value="qualitative">Qualitative</Option>
            <Option value="quantitative">Quantitative</Option>
            <Option value="tbd">TBD</Option>
          </Select>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                confirm();
              }}
              size="small"
              style={{ width: 90 }}
            >
              OK
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => record.studyTag.toLowerCase().includes(value.toLowerCase()),

    },
    {
      title: 'Study Description',
      key: 'studyDescription',
      dataIndex: 'studyDescription',
      width: '2%',
      align: 'left',
    },
    {
      title: 'Researchers',
      key: 'researchers',
      render: (text, record) => (
        <>
          {record.researchers.map((researcher) => (
            <div key={researcher.id}>
              {researcher.first_name} {researcher.last_name}
            </div>
          ))}
        </>
      ),
      width: '4%',
      align: 'left',
    },
    {
      title: 'Classrooms',
      key: 'classrooms',
      render: (text, record) => (
        <>
          {record.classrooms.map((classroom) => (
            <div key={classroom.id}>{classroom.name}</div>
          ))}
        </>
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Classroom"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => record.classrooms.some((classroom) => classroom.name.toLowerCase().includes(value.toLowerCase())),
      width: '3%',
      align: 'left',

    },
    {
      title: 'Students',
      key: 'students',
      render: (text, record) => (
        <>
          {record.students.map((student) => (
            <div key={student.id}>{student.name}</div>
          ))}
        </>
      ),
      width: '3%',
      align: 'left',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
        <Modal
          title="Add Researcher"
          visible={isModalVisible}
          onOk={handleAddResearcher}
          onCancel={handleCancel}>
          <Form form={form} name="addResearcherForm">
            <Form.Item
              name="first_name"
              label="Researcher First Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter the researcher first name',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="last_name"
              label="Researcher Last Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter the researcher last name',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: 'email',
                  message: 'Please enter a valid email address',
                },
                {
                  required: true,
                  message: 'Please enter the email address',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="studyID"
              label="Study ID"
              rules={[
                {
                  required: true,
                  message: 'Please enter the study ID',
                },
              ]}
              >
                <Input />
              </Form.Item>
          </Form>
        </Modal>
          <Button type="primary" onClick={showModal}>
            Add Researcher
          </Button>
          
          <Button type="danger" onClick={() => handleDeleteStudy(record)}>
            Delete
          </Button>
        </>
      ),
      width: '1%',
    },
  ];

  return (
    <div className='container nav-padding'>
      <div className='menu-bar'>
        <div id='activity-level-report-header'>Study Level Report</div>
        <Button onClick={() => navigate('/researcher/createStudyPage')} style={{ backgroundColor: 'green', color: 'white' }}>
          Create Study
        </Button>
        <button
          className='activity-level-return'
          onClick={() => navigate('/researcher/report')}
        >
          Return to Dashboard
        </button>
      </div>

      <main id='activity-report-content-wrapper'>
        <Table
          columns={columns}
          dataSource={studies}
          rowKey='id'
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSize: 10, // Set your desired page size
          }}
        />
      </main>
    </div>
  );
};

export default StudyLevelReport;
