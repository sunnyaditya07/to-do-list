/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import WishList from "./WishList";

function ToDoForm() {
  const [items, setItems] = useState(function () {
    const storedItems = localStorage.getItem("items");
    return JSON.parse(storedItems);
  });
  const [value, setValue] = useState("");
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  useEffect(
    function () {
      localStorage.setItem("items", JSON.stringify(items));
    },
    [items]
  );
  function handleDeletItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleCheckedItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!value) return;

    const newItem = {
      value,
      packed: false,
      isEditing: false,
      id: crypto.randomUUID(),
    };

    setValue("");
    handleAddItems(newItem);
  }
  function handleEdit(id, updateItem) {
    setItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              value: updateItem !== "" ? updateItem : item.value,
              isEditing: !item.isEditing,
            }
          : item
      )
    );
  }

  return (
    <div className="main-box">
      <form onSubmit={handleSubmit}>
        <p className="heading">What's on your mind Today!</p>
        <div className="input-box">
          <input
            type="text"
            value={value}
            placeholder="Write your thoughts..."
            onChange={(e) => setValue(e.target.value)}
          />
          <button>Add</button>
        </div>
      </form>
      <div className="list-item">
        {items.map((item) => (
          <WishList
            itemName={item.value}
            packed={item.packed}
            key={item.id}
            id={item.id}
            edit={item.isEditing}
            onDeleteItems={handleDeletItems}
            onToggleChecked={handleCheckedItem}
            onEdit={handleEdit}
          />
        ))}
      </div>
      {items.length !== 0 && (
        <button className="delete-all-btn" onClick={() => setItems([])}>
          Delete All
        </button>
      )}
    </div>
  );
}

export default ToDoForm;
