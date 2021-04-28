import {React} from 'react'
import { Alert, Typography } from 'antd';

import CheckListForm from '../CheckListForm'
import CheckListView from '../CheckListView'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../state/actioncreators/Logout';
import axios from 'axios';
import * as url from '../../constants/URLs'
import setItems from '../../state/actioncreators/SetItems';
import setMessage from '../../state/actioncreators/MessageAction';
import { useEffect } from 'react';
const { Title } = Typography;

function Home() {
    const appName = 'STT CheckList';
    const message = useSelector(state => state.message)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        fetchItemsFromServer(user, dispatch)
    }, []) 
    
    const handleLogout = async () => {
        dispatch(setMessage("Please wait while we log you out."))
        
        axios.post(`${url.USER_URL}/logout`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(response => {
            if (response.status === 200 && response.statusText === 'OK') {
                dispatch(logout())
            }
        })
    }

    return (
        <div>
            <div id='nav-bar'>
                <ul>
                    <li>
                        <a href="/logout" onClick={handleLogout}>Logout</a>
                    </li>
                </ul>
            </div>
            <Title level={2} align='center'>{appName}</Title>
            <Title level={3} style={{textAlign: 'center', color: `${message.textColor}`}}>
                &nbsp;{message.description}&nbsp;
            </Title>
            <CheckListForm />
            <CheckListView />
        </div>
    )
}


function fetchItemsFromServer(user, dispatch) {
    if (!user) return
    axios.get(url.TASK_URL, {
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        }
    }).then(response => {
        dispatch(setItems(response.data.data))
    });
}

export default Home