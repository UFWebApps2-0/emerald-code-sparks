import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import './GalleryItem.less';
import Like from './like';
import DiscussionBoard from './DiscussionBoard';
import { updateVisibility } from '../../Utils/requests';

//Wrapper item needs to be a useState for it to get dynamically rendered

const GalleryItem = (props) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const title = props.Title || 'Title';
    const creator = props.User_name || 'Creator Name';
    const likeCount = props.like_count || 0;
    const viewCount = props.view_count || 0;
    const posted = props.posted?.substr(0, 10) || 'Posted Date';
    console.log(props)
    const [viewCounts, setViewCounts] = useState(viewCount);
    const [visibility, setVisibility] = useState(props.visibility || 'Public');

    const showModal = () => {
        setVisible(true);
        setViewCounts((prevCount) => prevCount + 1);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleFormSubmit = async (values) => {   
        if (values.visibility == null) {
        values.visibility = "Public";
        }
        
         try {
            await updateVisibility(props.id, values.visibility);
            // Optionally, you can set the updated visibility in the component state
            // setVisibility(newVisibility);
            message.success('Visibility updated successfully');
        } catch (error) {
        // Handle error if needed
        console.error('Error updating visibility:', error);
        message.error('Failed to update visibility');
        }
        
        setVisibility(values.visibility);
        form.resetFields();
      }

    return (
        <>
            <div className='galleryItem' tabIndex={0} onClick={() => { showModal() }}>
                <div className='header'><div>{title}</div></div>
                <img style={{ backgroundColor: 'red' }} />
                <div className='flex flex-row'>
                    <div className='flex flex-column'>
                        <p>Creator: {creator}</p>
                        <p>Posted: {posted}</p>
                        <p>Views: {viewCounts}</p>
                    </div>
                    <div className='flex flex-column justify-end'>
                    </div>
                </div>
            </div>
            <div className='gallery-modal-holder'>
                <Modal
                    className='galleryItem-expanded'
                    title={title}
                    open={visible}
                    onCancel={handleCancel}
                    width='90vw'
                    maskClosable={false}
                    cancelText='Close'
                    footer={null}
                >
                    <div className='flex flex-row'>
                        <div className='flex flex-column'>
                            <img className='ooIMG'></img>
                        </div>
                        <div className='flex flex-column'>
                            <DiscussionBoard />
                            <Like likeCount={likeCount}> </Like>
                            <Form form={form} onFinish={handleFormSubmit}>
                            <div className="GalleryObjectForm">
                                <Form.Item label="Visibility" name="visibility">
                                <Select defaultValue={visibility}>
                                    <Option value="Public">Public</Option>
                                    <Option value="Organization">Organization</Option>
                                    <Option value="Classroom">Classroom</Option>
                                </Select>
                                </Form.Item>
                                <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Change Visibility
                                </Button>
                                </Form.Item>
                            </div>
                            </Form> 
                        </div>       
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default GalleryItem;
