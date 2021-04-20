import CheckListView from './components/CheckListView';
import CheckListForm from './components/CheckListForm';
import React, {useState } from 'react';

function App() {
  const appName = 'STT CheckList';
  const [listItems, setItems] = useState([]);

  function addItem(newItem) {
    const newArr = [...listItems];
    newArr.push(newItem);
    setItems(newArr);
  }

  function removeItem(itemToRemove) {
    setItems(listItems.filter(item => item !== itemToRemove));
  }

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>{appName}</h1>
      <CheckListForm handleAddItem={addItem}/>
      <CheckListView items={listItems} handleRemoveItem={removeItem}/>
    </div>
  );
  
}

export default App;
