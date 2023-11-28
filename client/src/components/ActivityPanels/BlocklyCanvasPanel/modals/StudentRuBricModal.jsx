import { Modal, Button, Typography, Menu } from 'antd';
import React, { useState } from 'react';


export default function StudentRubricModal(props) {
  const customefficiency = {

  }
  const [visible, setVisible] = useState(false);
  const [testCases, setTestCases] = useState();
  const [runtime, setRuntime] = useState();
  const [efficiency, setEfficiency] = useState();
  // const [newLessonName] = lessonName
  const { title, workspaceRef } = props;
  const { Text } = Typography;
  const { activity } = props
  //console.log(activity)
  const student = {
    name: "Ron W",
    character: "Rat",
    last_logged_in: 1/1/1,
    enrolled: "Enrolled"

  }

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    setVisible(false);
  };
  return (
    <div id='student-rubric-modal'>
        <Menu.Item id='show-arduino-icon' onClick={showModal}>
          <i class='fas fa-th'/>
          &nbsp;Show rubric
        </Menu.Item>

      <Modal
        title={title}
        visible={visible}
        onCancel={handleCancel}
        width='50vw'
        footer={[
          <Button key='ok' type='primary' onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        {/* {workspaceRef ? (
          <div id='code-text-box'>
            <Text copyable efficiency={{ whiteSpace: 'pre-wrap' }}>
              {title === 'XML'
                ? getXml(workspaceRef, false)
                : getArduino(workspaceRef, false)}
            </Text>
          </div>
        ) : null} */}
        <div class="grid-container">
            <div class="grid-item">Test Cases Passed</div>
            <div
              class={`grid-item ${testCases == 100 ? "selected" : ""}`}
              onClick={() => setTestCases(100)}
            >
              Passes all test cases
            </div>
            <div
              class={`grid-item ${testCases == 50 ? "selected" : ""}`}
              onClick={() => setTestCases(50)}
            >
              Passes at least 50% of test cases
            </div>
            <div
              class={`grid-item ${testCases == 0 ? "selected" : ""}`}
              onClick={() => setTestCases(0)}
            >
              Passes less than 50% of test cases
            </div>
            <div class="grid-item">Runtime</div>
            <div
              class={`grid-item ${runtime == 100 ? "selected" : ""}`}
              onClick={() => setRuntime(100)}
            >
              Program compiles and successfully completes the task
            </div>
            <div
              class={`grid-item ${runtime == 50 ? "selected" : ""}`}
              onClick={() => setRuntime(50)}
            >
              Program compiles but does not necessarily fulfill the task
            </div>
            <div
              class={`grid-item ${runtime == 0 ? "selected" : ""}`}
              onClick={() => setRuntime(0)}
            >
              Program does not compile
            </div>
            <div class="grid-item">Program Efficiency</div>
            <div
              class={`grid-item ${efficiency == 100 ? "selected" : ""}`}
              onClick={() => setEfficiency(100)}
            >
              Program is easy to understand, maintain, and solution is efficient
            </div>
            <div
              class={`grid-item ${efficiency == 50 ? "selected" : ""}`}
              onClick={() => setEfficiency(50)}
            >
              Program is easy to follow but not efficient
            </div>
            <div
              class={`grid-item ${efficiency == 0 ? "selected" : ""}`}
              onClick={() => setEfficiency(0)}
            >
              Program is not easy to follow and is inefficient
            </div>
            <div>
              Total:{" "}
              {testCases > -1 && runtime > -1 && efficiency > -1 && (
                <div>
                  {((efficiency + runtime + testCases) / 300).toFixed(3) * 100}%
                </div>
              )}
            </div>
          </div>
        
      </Modal>
    </div>
  );
}
