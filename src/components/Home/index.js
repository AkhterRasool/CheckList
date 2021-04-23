import {React, useState} from 'react'
import { Alert, Typography } from 'antd';

import CheckListForm from '../CheckListForm'
import CheckListView from '../CheckListView'
const { Title } = Typography;

function Home() {
    const appName = 'STT CheckList';
    const [listItems, setItems] = useState([]);
    const [error, setError] = useState('');

    function addItem(newItem) {
        if (listItems.indexOf(newItem) > -1) {
            setError("This item is added already.")
            setTimeout(() => {
                setError('')
            }, 2000)
            return
        }
        const newArr = [...listItems]
        newArr.push(newItem)
        setItems(newArr)
        setError('')
    }

    function removeItem(itemToRemove) {
        setItems(listItems.filter(item => item !== itemToRemove));
    }
    return (
        <div>
            <Title level={2} align='center'>{appName}</Title>
            <Title level={4} align='center'>
                <Alert message={error} type="error" style={{color: 'red'}}/>
            </Title>
            <CheckListForm handleAddItem={addItem} setError={setError}/>
            <CheckListView items={listItems} handleRemoveItem={removeItem}/>
        </div>
    )
}

export default Home