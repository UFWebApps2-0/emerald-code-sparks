import { Button, Form, Input, message, Modal} from "antd";
import React, { useState } from "react";
import {createQuestion} from "../../../Utils/requests";
import "./QuestionForm.less";

export default function QuestionForm({ id }) {
  const [visible, setVisible] = useState(false);
  const [question, setQuestion] = useState("");
  const [intime, setIntime] = useState("");
  const [A, setA] = useState("");
  const [B, setB] = useState("");
  const [C, setC] = useState("");
  const [D, setD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const showModal = () => {
    setQuestion("");
    setIntime("");
    setA("");
    setB("");
    setC("");
    setD("");
    setCorrectAnswer("");
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = async (e) => {
    try {
      const res = await createQuestion(question, intime, A, B, C, D, correctAnswer, id);
      if (res.err) {
        // Handle the specific error here if possible
        message.error("Failed to add questions");
      } else {
        message.success("Successfully added questions");
        setVisible(false);
        // Optionally reset form state here
      }
    } catch (error) {
      console.error('Error submitting question:', error);
      message.error("An error occurred while adding the question");
    }
  }
  

    return (
      <div>
      <button onClick={showModal} id="add-question-btn">
        + Add Question
      </button>
        <Modal
          title="Add Question"
          open={visible}
          width="35vw"
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            id="add-questions"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            onFinish={handleSubmit}
            layout="horizontal"
            size="default"
          >
            <p>
              Add interactive questions to your lesson. 
            </p>
            <Form.Item id="form-label" label="Question">
              <Input
                onChange={e => setQuestion(e.target.value)}
                value={question}
                placeholder=""
                required
              />
            </Form.Item>
            <Form.Item id="form-label" label="Time">
              <Input
                onChange={e => setIntime(e.target.value)}
                type="number"
                value={intime}
                placeholder=""
                required
              />
            </Form.Item>
            <Form.Item id="form-label" label="A">
              <Input.TextArea
                rows={3}
                onChange={e => setA(e.target.value)}
                value={A}
                placeholder="Enter answer choice A."
              />
            </Form.Item>
            <Form.Item id="form-label" label="B">
              <Input.TextArea
                rows={3}
                onChange={e => setB(e.target.value)}
                value={B}
                placeholder="Enter answer choice B."
              />
            </Form.Item>
            <Form.Item id="form-label" label="C">
              <Input.TextArea
                rows={3}
                onChange={e => setC(e.target.value)}
                value={C}
                placeholder="Enter answer choice C."
              />
            </Form.Item>
            <Form.Item id="form-label" label="D">
              <Input.TextArea
                rows={3}
                onChange={e => setD(e.target.value)}
                value={D}
                placeholder="Enter answer choice D."
              />
            </Form.Item>
            <Form.Item id="form-label" label="Correct Answer">
              <Input
                onChange={e => setCorrectAnswer(e.target.value)}
                value={correctAnswer}
                placeholder=""
                required
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
              style={{ marginBottom: "0px" }}
            >
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="content-creator-button"
              >
                Submit
              </Button>
              <Button
                onClick={handleCancel}
                size="large"
                className="content-creator-button"
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }