import CheckListView from './components/CheckListView/CheckListView';
import CheckListForm from './components/CheckListForm/CheckListForm';
import React from 'react';

class App extends React.Component {
   appName = 'STT CheckList';

   constructor() {
     super();
      this.state = {
        items : []
      }
      this.addItem = this.addItem.bind(this);
      this.removeItem = this.removeItem.bind(this);
   }

   render() {
    return (
      <div>
        <h1 style={{textAlign: 'center'}}>{this.appName}</h1>
        <CheckListForm onSubmit={this.addItem}/>
        <CheckListView items={this.state.items} onRemoveButtonClicked={this.removeItem}/>
      </div>
    );
   }


    addItem(e) {
      e.preventDefault();
      const itemField = document.getElementById('item-name-field');
      const item = itemField.value;
      const newItemList = this.state.items;
      newItemList.push(item);
      this.setState({items: newItemList});
      itemField.value = '';
    }

    removeItem(e) {
      const target = e.target;
      console.log(target);
      const itemToRemove = target.parentNode.previousSibling.innerText;
      let newItemList = this.state.items.filter(
        currItem => currItem !== itemToRemove
      );
      this.setState({items: newItemList});
    }

}

export default App;
