import { Modal, Button } from "antd";
import React, { useState } from "react";
export default function StudentModal({ linkBtn, student, getFormattedDate }) {
  const [visible, setVisible] = useState(false);
  const [testCases, setTestCases] = useState();
  const [comments, setComments] = useState();
  const [style, setStyle] = useState();
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
    <div>
      <button id={linkBtn ? "link-btn" : null} onClick={showModal}>
        View
      </button>
      <Modal
        width={900}
        // title={student.name}
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <div id="modal-student-card-header">
          <p id="animal">{student.character}</p>
          <h1 id="student-card-title">{student.name}</h1>
        </div>
        <div id="modal-card-content-container">
          <div id="description-container">
            <p id="label">Last logged in:</p>
            <p id="label-info"> {getFormattedDate(student.last_logged_in)}</p>
            <br></br>
          </div>
          <div id="description-container">
            <p id="label">Status</p>
            <p id="label-info">
              {student.enrolled.enrolled ? "Enrolled" : "Unenrolled"}
            </p>
          </div>
          <div class="grid-container">
            <div class="grid-item">Test Cases</div>
            <div
              class={`grid-item ${testCases == 100 ? "selected" : ""}`}
              onClick={() => setTestCases(100)}
            >
              Passes All Test Cases
            </div>
            <div
              class={`grid-item ${testCases == 50 ? "selected" : ""}`}
              onClick={() => setTestCases(50)}
            >
              Passes Atleast 50% of Test Cases
            </div>
            <div
              class={`grid-item ${testCases == 0 ? "selected" : ""}`}
              onClick={() => setTestCases(0)}
            >
              Passes No Test Cases
            </div>
            <div class="grid-item">Comments</div>
            <div
              class={`grid-item ${comments == 100 ? "selected" : ""}`}
              onClick={() => setComments(100)}
            >
              Appropriate Number of Comments
            </div>
            <div
              class={`grid-item ${comments == 50 ? "selected" : ""}`}
              onClick={() => setComments(50)}
            >
              Some Comments
            </div>
            <div
              class={`grid-item ${comments == 0 ? "selected" : ""}`}
              onClick={() => setComments(0)}
            >
              No Comments
            </div>
            <div class="grid-item">Programming Style</div>
            <div
              class={`grid-item ${style == 100 ? "selected" : ""}`}
              onClick={() => setStyle(100)}
            >
              Styling is consistent and readable
            </div>
            <div
              class={`grid-item ${style == 50 ? "selected" : ""}`}
              onClick={() => setStyle(50)}
            >
              Managable to read
            </div>
            <div
              class={`grid-item ${style == 0 ? "selected" : ""}`}
              onClick={() => setStyle(0)}
            >
              Program is hard to interpret
            </div>
            <div>
              Total:{" "}
              {testCases > -1 && comments > -1 && style > -1 && (
                <div>
                  {((style + comments + testCases) / 300).toFixed(3) * 100}%
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}