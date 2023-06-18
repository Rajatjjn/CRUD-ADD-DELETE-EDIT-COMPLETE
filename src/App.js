import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const CRUDNEW = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const saveItemsToLocalStorage = (updatedItems) => {
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const addItem = () => {
    const newItemObject = { id: nanoid(), value: newItem,completed:false };
    const updatedItems = [...items, newItemObject];
    setItems(updatedItems);
    setNewItem("");
    saveItemsToLocalStorage(updatedItems);
  };

  const startEditItem = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setEditItem(id);
      setNewItem(itemToEdit.value);
    }
  };

  const updateItem = () => {
    const updatedItems = items.map((item) => {
      if (item.id === editItem) {
        return { ...item, value: newItem };
      }
      return item;
    });
    setItems(updatedItems);
    setNewItem("");
    setEditItem(null);
    saveItemsToLocalStorage(updatedItems);
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    saveItemsToLocalStorage(updatedItems);
  };

  function HandleChange(id){
    const chang=items.map((item)=>item.id===id?{...item,completed:!item.completed}:item)
  setItems(chang)
  }

  return (
    <div>
      <h2>CRUD Example</h2>
      <h3>Remaining task:{items.filter((item)=>!item.completed).length}</h3>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      {editItem !== null ? (
        <button onClick={updateItem}>Update</button>
      ) : (
        <button onClick={addItem}>Add</button>
      )}
          
      <div>
      
        {items.map((item) => (
          <div key={item.id}>
            
            <input type="checkbox" onChange={()=>HandleChange(item.id)} />
            <span style={{textDecoration:item.completed?'line-through' :"none"}}>{item.value}</span>
            <button onClick={() => startEditItem(item.id)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
         </div>
        ))}
      </div>
    </div>
  );
};

export default CRUDNEW;
