import CheckListView from './components/CheckListView/CheckListView';
import CheckListForm from './components/CheckListForm/CheckListForm';
import React, {useState } from 'react';

function App() {
  const appName = 'STT CheckList';
  const [listItems, setItems] = useState([]);

  function addItem(e) {
    e.preventDefault();
    const itemField = document.getElementById('item-name-field');
    const newArr = [...listItems];
    newArr.push(itemField.value);
    setItems(newArr);
    itemField.value = '';
  }

  function removeItem(e) {
    const target = e.target;
    const itemToRemove = target.parentNode.previousSibling.innerText;
    setItems(listItems.filter(item => item !== itemToRemove));
  }

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>{appName}</h1>
      <CheckListForm onSubmit={addItem}/>
      <CheckListView items={listItems} onRemoveButtonClicked={removeItem}/>
    </div>
  );
  
}

export default App;
