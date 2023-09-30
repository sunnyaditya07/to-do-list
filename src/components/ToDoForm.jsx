/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import WishList from "./WishList";

function ToDoForm() {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeletItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!value) return;

    const newItem = {
      value,
      packed: false,
      id: crypto.randomUUID(),
    };

    setValue("");
    handleAddItems(newItem);
  }
  console.log(items);

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
          <button>Submit</button>
        </div>
      </form>
      <div className="list-item">
        {items.map((item) => (
          <WishList
            item={item.value}
            key={item.id}
            id={item.id}
            onDeleteItems={handleDeletItems}
          />
        ))}
      </div>
    </div>
  );
}

export default ToDoForm;
