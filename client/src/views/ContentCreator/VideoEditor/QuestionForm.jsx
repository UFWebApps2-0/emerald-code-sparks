import { Button, Form, Input, message, Modal, Radio, InputNumber } from "antd";
import React, { useState } from "react";
import { createQuestion } from "../../../Utils/requests";
import "./QuestionForm.less";

export default function QuestionForm({ gradeList }) {
  const [visible, setVisible] = useState(false);
  const [questionType, setQuestionType] = useState("freeResponse");
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [choices, setChoices] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
  });
  const [correctAnswer, setCorrectAnswer] = useState("");

  const showModal = () => {
    setTitle("");
    setTime("");
    setChoices({
      A: "",
      B: "",
      C: "",
      D: "",
    });
    setCorrectAnswer("");
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = async (e) => {
    if (questionType === "multipleChoice" && !correctAnswer) {
      message.error("Please select the correct answer for multiple choice.");
      return;
    }


    const formData = {
      questionType,
      title,
      time,
      choices,
      correctAnswer,
    };

    const res = await createVideo(formData);

    if (res.err) {
      message.error("Failed to add questions");
    } else {
      message.success("Successfully added questions");
      setVisible(false);
    }
  };

  return (
    <div>
      <button onClick={showModal} id="add-video-btn">
        Add Questions
      </button>
      <Modal
        title="Add Questions"
        visible={visible} // Change "open" to "visible"
        width="35vw"
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          id="add-videos"
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
          <Form.Item id="form-label" label="Question Type">
            <Radio.Group
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <Radio value="freeResponse">Free Response</Radio>
              <Radio value="multipleChoice">Multiple Choice</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item id="form-label" label="Question Title">
            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Enter question title"
              required
            />
          </Form.Item>
          <Form.Item id="form-label" label="Time">
            <Input.TextArea
              onChange={(e) => setTime(e.target.value)}
              value={time}
              placeholder="Enter the time that the question will appear."
            />
          </Form.Item>
          {questionType === "multipleChoice" && (
            <>
              <Form.Item id="form-label" label="Choice A">
                <Input
                  onChange={(e) => setChoices({ ...choices, A: e.target.value })}
                  value={choices.A}
                  placeholder="Enter choice A"
                />
              </Form.Item>
              <Form.Item id="form-label" label="Choice B">
                <Input
                  onChange={(e) => setChoices({ ...choices, B: e.target.value })}
                  value={choices.B}
                  placeholder="Enter choice B"
                />
              </Form.Item>
              <Form.Item id="form-label" label="Choice C">
                <Input
                  onChange={(e) => setChoices({ ...choices, C: e.target.value })}
                  value={choices.C}
                  placeholder="Enter choice C"
                />
              </Form.Item>
              <Form.Item id="form-label" label="Choice D">
                <Input
                  onChange={(e) => setChoices({ ...choices, D: e.target.value })}
                  value={choices.D}
                  placeholder="Enter choice D"
                />
              </Form.Item>
              <Form.Item id="form-label" label="Correct Answer">
                <Input
                  onChange={(value) => setCorrectAnswer(value)}
                  value={correctAnswer}
                  placeholder="Enter the correct answer choice"
                  />
              </Form.Item>
            </>
          )}
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 14,
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
  );
}
