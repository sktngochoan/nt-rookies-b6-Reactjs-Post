import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, PageHeade, Space, Table, Tag } from 'antd';
import { Typography } from 'antd';
import { getPosts, deletePost, getPostDetail } from '../services';
import CreatePostForm from '../components/CreatePostForm';
import { PostContextProvider } from '../layout/PostContext';

const { Title } = Typography;


const Post = () => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record.id)}><ion-icon name="create"></ion-icon></a>
          <a onClick={() => handleDelete(record.id)}><ion-icon name="trash"></ion-icon></a>
        </Space>
      ),
    },
  ];
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessfull, setisSuccessfull] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState();
  const [id,setId] = useState();
  const fetchPost = async() => {
    getPosts().then(data => {
      console.log(data);
      setPosts(data?.data);
    })
  }
  useEffect(() => {
    fetchPost().then(() => {
      setisSuccessfull(false)
    })
  }, [isSuccessfull]);

  const setCrudSuccess = (val) => { 
    setisSuccessfull(val);
  }
  const handleEdit = (idEdit) => {
    setId(idEdit);
  }
  
  const handleDelete = (idEdit) => {
    setId(idEdit);
  }
  return (
    <React.Fragment>
      <CreatePostForm id={id} setCrudSuccess={(val) => setCrudSuccess(val)} />
      <Table columns={columns} dataSource={posts} />
    </React.Fragment>

  );
}

export default Post;