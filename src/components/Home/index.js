import {React, useState} from 'react'
import { Alert, Typography } from 'antd';

import CheckListForm from '../CheckListForm'
import CheckListView from '../CheckListView'
const { Title } = Typography;

function Home() {
    const appName = 'STT CheckList';
    const [listItems, setItems] = useState([]);
    const [error, setError] = useState('');

    return (
        <div>
            <Title level={2} align='center'>{appName}</Title>
            <Title level={4} align='center'>
                <Alert message={error} type="error" style={{color: 'red'}}/>
            </Title>
            <CheckListForm setError={setError}/>
            <CheckListView />
        </div>
    )
}

export default Home