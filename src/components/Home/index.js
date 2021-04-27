import {React, useState} from 'react'
import { Alert, Typography } from 'antd';

import CheckListForm from '../CheckListForm'
import CheckListView from '../CheckListView'
import { useSelector } from 'react-redux';
const { Title } = Typography;

function Home() {
    const appName = 'STT CheckList';
    const error = useSelector(state => state.errorMessage)

    return (
        <div>
            <Title level={2} align='center'>{appName}</Title>
            <Title level={4} align='center'>
                <Alert message={error} type="error" style={{color: 'red'}}/>
            </Title>
            <CheckListForm />
            <CheckListView />
        </div>
    )
}

export default Home