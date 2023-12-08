import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Form, Checkbox } from 'antd';
import './StudentConsentPage.less';

const StudentConsentPage = () => {
  return (
    <div className='container nav-padding'>
      <NavBar />
      <div className='main-content'>
        <h1>Student View of Consent</h1>
        <p>Dear student, you have been selected for a study.</p>
        <p>[Placeholder information about the study]</p>
        <Form>
          <Form.Item name="permissions" label="Pick your permissions">
            <Checkbox.Group style={{ width: '100%' }}>
              <Checkbox value="shareGrades">Share grades</Checkbox>
              <Checkbox value="shareCodeReplays">Share code replays</Checkbox>
              <Checkbox value="anonymizeMe">Anonymize me</Checkbox>
              <Checkbox value="consentToDataCollection">Consent to general data collection</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default StudentConsentPage;
