import React from 'react';
import { Button } from 'antd';

import './CheckListItemRow.css';
import removeItemAction from '../../state/actioncreators/RemoveItemAction';
import { useDispatch } from 'react-redux';

function CheckListItemRow(props) {
    const dispatch = useDispatch();
    return (
            <tr width='100%'>
                <td width='10%' className='td-checkbox'>
                    <input type='checkbox'/>
                </td>
                <td width='70%' className='td-desc'> 
                    {props.itemName}
                </td>
                <td width='20%' className='td-remove'>
                    <Button type="primary" onClick={() => dispatch(removeItemAction(props.id, props.itemName))} danger>Remove</Button>
                </td>
            </tr>
    );
}

export default CheckListItemRow;