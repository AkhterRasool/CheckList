import React from 'react';
import './CheckListItem.css';

function CheckListItem(props){
    
    return (
        <div className='check-list-item'>
            <table>
                <td width='10%' className='td-checkbox'>
                    <input type='checkbox'/>
                </td>
                <td width='70%' className='td-desc'> 
                    {props.itemName}
                </td>
                <td width='20%' className='td-remove'>
                    <button onClick={props.onRemoveButtonClicked}>Remove</button>
                </td>
            </table>
            
            
        </div>
    );
}

export default CheckListItem;