import React from 'react';
import 'antd/dist/antd.css';
import { PageHeade } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

const Home = () => {

    return (
        <React.Fragment>
            <Title>This is Home</Title>
            <Typography.Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
            </Typography.Paragraph>
        </React.Fragment>

    );
}

export default Home;