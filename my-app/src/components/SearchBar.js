import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import React, { useState } from 'react';
const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            left: 400,
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);
const onSearch = (value) => console.log(value);
const SearchBar = () => {
    const [searchValue, setSearchValue] = useState();
    const searchAvtion = (value) => {
        console.log(value);
        setSearchValue(value);
    }
    
    return (
        <Space style={{ marginLeft: '1085px', marginBottom: '10px' }} className='1' direction="vertical">
            <Search className='2' placeholder="input search text" onSearch={searchAvtion} enterButton />
        </Space>
    );

};
export default SearchBar;