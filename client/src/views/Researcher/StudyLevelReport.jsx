import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Form } from 'antd';
import './StudyLevelReport.less';
import { getStudies } from '../../Utils/requests';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from '../../Utils/requests';
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

  const handleAddResearcher = () => {
    form.validateFields().then((values) => {
        console.log(values);
        //sanitize input
        values.username = values.username.replace(/[^a-zA-Z0-9]/g, '');
        values.email = values.email.replace(/[^a-zA-Z0-9@.]/g, '');
        values.studyID = values.studyID.replace(/[^a-zA-Z0-9]/g, '');
        setIsModalVisible(false);
        const emailTemplate = {
          name: values.username,
          email: values.email,
          studyID: values.studyID,
        }
        //send email to admin
        
        sendEmail(emailTemplate);
      }
      ).catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

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
  ];

  return (
    <div className='container nav-padding'>
      <div className='menu-bar'>
        <div id='activity-level-report-header'>Study Level Report</div>

        <Button className='activity-level-return' onClick={showModal}>
          Add Researcher
        </Button>
        <Link to={'/createStudyPage'}>
        <Button className='activity-level-return' onClick={() => navigate('/createStudyPage')}>
          Create Study
        </Button>
      </Link>
        <button
          className='activity-level-return'
          onClick={() => navigate('/report')}
        >
          Return to Dashboard
        </button>

        <Modal
          title="Add Researcher"
          visible={isModalVisible}
          onOk={handleAddResearcher}
          onCancel={handleCancel}>
          <Form form={form} name="addResearcherForm">
            <Form.Item
              name="username"
              label="Researcher Username"
              rules={[
                {
                  required: true,
                  message: 'Please enter the researcher username',
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
