import React, { useContext, useEffect, useState, useCallback } from 'react';

import 'antd/dist/antd.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Input, Modal, Typography, message } from 'antd';
import { PostContext, PostContextProvider } from '../layout/PostContext';
import { createPost, getPostDetail, updatePost } from '../services';

const { TextArea } = Input;
const { Text } = Typography;

const schema = yup.object({
    title: yup.string().required(),
    description: yup.string().required()
}).required();

function CreatePostForm({ id, setCrudSuccess, setHidePopup }) {
    const {
        control,
        formState: { errors },
        handleSubmit,
        setValue,
        getValues,
        watch,
        reset
    } = useForm({
        resolver: yupResolver(schema)
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const postContext = useContext(PostContext);
    const [dataToUpdate,setDataToUpdate] = useState({});

    useEffect(() => {
        console.log(postContext)
    }, [postContext]);
    const fetchPostDetail = useCallback(
        () => {
            getPostDetail(id).then((res) => {
                const data = res?.data;
                setDataToUpdate(res?.data);
                const inputs = [
                    'title',
                    'description',
                    'content'
                ];
                inputs.forEach((input) => {
                    if (data[input]?.length > 0) {
                        setValue(input, data[input]);
                    }
                });
            })
        },
        [id],
    );

    useEffect(() => {
        if (id) {
            setShowModal(true);
            fetchPostDetail();
        }
    }, [id])

    const onSubmit = async (data) => {
        console.log(data)
        setIsLoading(true)
        try {
            
            let resp = {};
            if(id) {
                const authorData = {
                    ...data, author: dataToUpdate.author,createdAt: dataToUpdate.createdAt
                };
                resp = await updatePost(id,authorData);
                console.log(authorData);
            }
            else{
                const authorData = {
                    ...data, author: {
                        "username": "vietvu",
                        "firstName": "Viet",
                        "lastName": "Vu",
                        "email": "vietvuhoang@gmail.com",
                        "birthDate": "2022-11-02"
                    }
                };
                resp = await createPost(authorData);
            }
            
            const respData = resp?.data;
            if (respData) {
                setIsLoading(false);
                setShowModal(false);
                message.success('Post created success');
                setCrudSuccess(true)
            } else {
                message.error('');
            }
        } catch (error) {
            setIsLoading(false);
            message.error(error);
        }
    };

    return (
        <PostContextProvider>
            <Button type="primary" onClick={() => setShowModal(true)}>
                Create Post
            </Button>
            <Modal width="50rem"
                centered
                destroyOnClose
                title="Create Post"
                visible={showModal}
                footer={null}
                afterClose={() => reset({})}
                onCancel={() => {
                    setShowModal(false);
                    setHidePopup(true);
                }}>
                <Form
                    noValidate
                    layout="vertical"
                    onFinish={handleSubmit(onSubmit)}
                    autoComplete="off"
                >
                    <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Form.Item label="Title">
                                <Input {...field} placeholder="Input Title" />
                                {errors?.title?.message &&
                                    <Text type="danger">Title is required</Text>
                                }
                            </Form.Item>
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Form.Item label="Description">
                                <TextArea rows={4} {...field} placeholder="Input Description" />
                                {errors?.description?.message &&
                                    <Text type="danger">Description is required</Text>
                                }
                            </Form.Item>
                        )}
                    />

                    <Controller
                        name="content"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Form.Item label="Content">
                                <TextArea rows={4} {...field} placeholder="Input Content" />
                                {errors?.content?.message &&
                                    <Text type="danger">Content is required</Text>
                                }
                            </Form.Item>
                        )}
                    />

                    <Form.Item style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <Button
                            onClick={() => setShowModal(false)}
                            style={{
                                marginRight: "16px"
                            }}>Cancel</Button>
                        <Button loading={isLoading} htmlType="submit" type="primary">Save</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </PostContextProvider>
    );
}

export default CreatePostForm;
