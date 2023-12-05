import { Button, Form, Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getLessonModule,
  updateLessonModule,
} from "../../../Utils/requests";
import ActivityEditor from "../ActivityEditor/ActivityEditor";

export default function LessonEditor({
  learningStandard,
  viewing,
  setViewing,
  tab,
  page,
}) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(learningStandard.name);
  const [description, setDescription] = useState("");
  const [standards, setStandards] = useState("");
  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState(false);
  const [displayName, setDisplayName] = useState(learningStandard.name);
  // eslint-disable-next-line
  const [_, setSearchParams] = useSearchParams();
  const [newLesson, setNewLesson] = useState({
    title: "",
    content: "",
    objectives: "",
  });

  const showModal = async () => {
    setVisible(true);
    const res = await getLessonModule(learningStandard.id);
    setName(res.data.name);
    setDescription(res.data.expectations);
    setStandards(res.data.standards);
    setLink(res.data.link);
    setLinkError(false);
  };

  useEffect(() => {
    setDisplayName(learningStandard.name);
  }, [learningStandard.name]);


  const addNewLesson = async () => {
    console.log("Adding new lesson:", newLesson);
    setNewLesson({ title: "", content: "", objectives: "" });
    message.success("New lesson added successfully");
  };

  return (
    <div>
      <Button id="link-btn" onClick={showModal}>
        {displayName}
      </Button>
      <Modal
        title="Add New Lesson"
        visible={visible}
        onOk={addNewLesson}
        onCancel={() => setVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Lesson Title">
            <Input
              value={newLesson.title}
              onChange={(e) =>
                setNewLesson({ ...newLesson, title: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Content">
            <Input.TextArea
              value={newLesson.content}
              onChange={(e) =>
                setNewLesson({ ...newLesson, content: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Objectives">
            <Input
              value={newLesson.objectives}
              onChange={(e) =>
                setNewLesson({ ...newLesson, objectives: e.target.value })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
      {!visible && (
        <ActivityEditor
          learningStandard={learningStandard}
          viewing={viewing}
          setViewing={setViewing}
          page={page}
          tab={tab}
        />
      )}
    </div>
  );
}