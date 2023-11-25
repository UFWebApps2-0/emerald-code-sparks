import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Form } from 'antd';
import './StudyLevelReport.less';
import { useNavigate } from 'react-router-dom';
import { sendEmail, getResearchers, getStudies} from '../../Utils/requests';
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

  const handleAddResearcher = async () => {
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

        //get researchers 
        const researchersRes = getResearchers();
        //iterate through researchers to find the one with same first and last name
        for (const researcher of researchersRes.data) {
          if (researcher.first_name === values.first_name && researcher.last_name === values.last_name) {
            //add studyID to researcher's studyIDs
            console.log(researcher.studyIDs);
            console.log(values.studyID);
            
            researcher.studyIDs.push(values.studyID);
            //update researcher
            //updateResearcher(researcher);
            break;
          }
        }
        console.log()
        //get studies
        const studiesRes = getStudies();
        //iterate through studies to find the one with same studyID
        for (const study of studiesRes.data) {
          if (study.studyID === values.studyID) {
            //add researcher to study's researchers
            console.log(study.researchers);
            console.log(values.first_name + ' ' + values.last_name);
            study.researchers.push(values.first_name + ' ' + values.last_name);
            //update study
            //updateStudy(study);
            break;
          }
        }


        //send email to admin
        sendEmail(emailTemplate);
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
