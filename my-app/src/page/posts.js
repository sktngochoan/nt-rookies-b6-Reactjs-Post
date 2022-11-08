import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, PageHeade, Space, Table, Tag } from 'antd';
import { Typography, Input } from 'antd';
import { getPosts, deletePost, getPostDetail, searchPostByName } from '../services';
import CreatePostForm from '../components/CreatePostForm';
import { PostContextProvider } from '../layout/PostContext';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const { Search } = Input;
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
          <a><ion-icon name="eye"></ion-icon></a>
        </Space>
      ),
    },
  ];

  const [isSearch,setSearch] = useState(false);
  const [isSuccessfull, setisSuccessfull] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [posts, setPosts] = useState();
  const [id, setId] = useState();
  const [idToDelete, setIdToDelete] = useState();
  const viewAllPost = () => {
    setisSuccessfull(true);
  }
  const fetchPost = async () => {
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

  // useEffect(() => {
  //   getPostDetail(idToSearch).then(data =>{
  //     setPosts(data?.data);
  //   }).catch(error => {
  //   })
    
  // },[idToSearch]);

  const handleEdit = (idEdit) => {
    setId(idEdit);
  }

  const handleDelete = (idEdit) => {
    let text = `You want to delete post with id:${idEdit}`;
    if (window.confirm(text) == true) {
      setIdToDelete(idEdit);
    } else {
    }
  }

  const deletePostAync = async () => {
    deletePost(idToDelete).then(data => {
      setisSuccessfull(true);
    })
  }
  useEffect(() => {
    deletePostAync().then(() => {
    })
  }, [idToDelete]);

  const handleSearch = (value) => {
    setSearch(true);
    setSearchValue(value);
  }

  const searchPost = async () => {
    searchPostByName(searchValue).then(data => {
      setPosts(data?.data);
      setSearch(false);
    })
  }
  useEffect(() => {
    if(isSearch === true){
      searchPost().then(() => {
      });
    }
  }, [searchValue]);
  return (

    <React.Fragment>
      <CreatePostForm id={id} setCrudSuccess={(val) => setCrudSuccess(val)} />
      <Button style={{ marginLeft: '100px' }} onClick={viewAllPost} color='@green-7'>View All Post</Button>
      <Space style={{ marginLeft: '860px', marginBottom: '10px' }} className='1' direction="vertical">
        <Search className='2' placeholder="input search text" onSearch={handleSearch} enterButton />

      </Space>
      {/* <SearchBar /> */}
      <Table columns={columns} dataSource={posts} />
    </React.Fragment>

  );
}

export default Post;