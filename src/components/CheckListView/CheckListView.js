import React from 'react';
import CheckListItem from '../CheckListItem/CheckListItem';
import './CheckListView.css'

function CheckListView(props) {
    let idx = 0;
    return (
        <ul>
            {
                props.items.map(item => {
                    return (
                        <li key={`${item}-${idx++}`}>
                            <CheckListItem onRemoveButtonClicked={props.onRemoveButtonClicked} itemName={item}/>
                        </li>
                        
                    )
                })
            }
        </ul>
    )
}
export default CheckListView;