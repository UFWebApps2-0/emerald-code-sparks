import React, { useState } from 'react';
import { Modal, Button, Form, Select, message } from 'antd';
import { updateVisibility } from '../../Utils/requests';

const UpdateVisibilityForm = (props) => {
    const [form] = Form.useForm();
    const [visibility, setVisibility] = useState(props.visibility || 'Public');
    const handleFormSubmit = async (values) => {
        if (values.visibility == null) {
            values.visibility = "Public";
        }

        try {
            await updateVisibility(props.id, values.visibility);
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

    );
}

export default UpdateVisibilityForm;
