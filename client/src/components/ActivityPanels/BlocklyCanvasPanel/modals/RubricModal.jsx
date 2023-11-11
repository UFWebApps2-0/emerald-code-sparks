import { Modal, Button, Input, Form } from "antd"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  getActivity,
  getActivityToolbox,
  getActivityToolboxAll,
  getLessonModuleActivities,
  updateActivityDetails,
} from "../../../../Utils/requests"
import axios from 'axios';

export default function RubricModal(props) {
    const [visible, setVisible] = useState(false)

    // Create point variables to store input values for rubric
    const [CompilePoints, setCompilePoints] = useState("")
    const [ReadabilityPoints, setReadabilityPoints] = useState("")
    const [TimePoints, setTimePoints] = useState("")
    const [TotalPoints, setTotalPoints] = useState("")

    const { image } = props
    const [hover, setHover] = useState(false)

    const showModal = () => {

        setVisible(true)
    }
    const onHover = () => {
        setHover(true)
    }
    const onLeave = () => {
        setHover(false)
    }
    const handleCancel = () => {
        setVisible(false)
    }

    const handleOk = () => {
        setVisible(false)
    }

    const links = new String(image)
    let items = links.split("\n").filter(item => item != "" || item != " ")
    let width = items.length * 700
    return (
        <div
            id="rubric-modal"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            {hover ? <div className="popup ModalCompile">Rubric</div> : ""}
            <Button id="link">

                {/*Draws the rubric icon on the student view*/}
                <svg
                    width="25"
                    height="20px"
                    viewBox="0 0 25 25"
                    version="1.1"
                    fill="none"
                    onClick={showModal}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="12.5" cy="14" r="10" stroke="blue" strokeWidth="1.5" />
                    <line x1="12.5" y1="7" x2="12.5" y2="9" stroke="blue" strokeWidth="1.5" />
                    <line x1="12.5" y1="11" x2="12.5" y2="19" stroke="blue" strokeWidth="1.5" />
                </svg>

            </Button>
            <Modal
                title={"Rubric"}
                visible={visible}
                onCancel={handleCancel}
                width={width}
                footer={[
                    <Button key="ok" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
            >
                {/*Pulls the compile points that the teacher inputs and shows on the students rubric*/}
                <Form.Item id="form-label" label="Compile">
                    <Input.TextArea
                        onChange={e => setCompilePoints(e.target.value)}
                        value={CompilePoints}
                        required

                        placeholder="Total points for successful compile"

                    ></Input.TextArea>
                </Form.Item>

                {/*Pulls the submission points that the teacher inputs and shows on the students rubric*/}
                <Form.Item id="form-label" label="Submission Time">
                    <Input.TextArea
                        onChange={e => setTimePoints(e.target.value)}
                        value={TimePoints}
                        required

                        placeholder="Total points for successful compile"

                    ></Input.TextArea>
                </Form.Item>

                {/*Pulls the readability points that the teacher inputs and shows on the students rubric*/}
                <Form.Item id="form-label" label="Readability">
                    <Input.TextArea
                        onChange={e => setReadabilityPoints(e.target.value)}
                        value={ReadabilityPoints}
                        required

                        placeholder="Total points for successful compile"

                    ></Input.TextArea>
                </Form.Item>

                {/*Pulls the total points from the values above, also has edge case to check for addig only integer values, otherwise ignore*/}
                <Form.Item id="form-label" label="Total">
                    <Input.TextArea
                        onChange={e => setTotalPoints(e.target.value)}
                        value={((parseInt(CompilePoints) || 0) + (parseInt(TimePoints) || 0) + (parseInt(ReadabilityPoints) || 0)).toString()}
                        readOnly
                        required
                        placeholder="Total points for successful compile"

                    ></Input.TextArea>
                </Form.Item>

                {items.map(src => (

                    <img
                        key={src}
                        src={src}
                        display="block"
                        position="relative"
                        alt=""
                        width="auto"
                        height="300"
                    />
                ))}

            </Modal>
        </div>
    )
}