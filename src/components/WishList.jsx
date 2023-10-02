import { useState } from "react";
import FunctionsButton from "./FunctionsButton";

function WishList({
  itemName,
  onDeleteItems,
  packed,
  id,
  edit,
  onToggleChecked,
  onEdit,
}) {
  console.log(edit);
  const [updateItem, setUpdateItem] = useState(itemName);
  const [toEdit, setToEdit] = useState(edit);

  // function handleUpdate() {
  //   setToEdit(!toEdit);
  // }
  function handleSaveUpdate() {
    if (updateItem === "") onDeleteItems(id);
    onEdit(id, updateItem);
  }

  return (
    // <div className="list-item">
    <div className="item">
      <p
        className="item-text checked"
        style={
          packed
            ? {
                textDecoration: "line-through",
                textDecorationColor: "#141f2f",
                textDecorationThickness: "2px",
              }
            : {}
        }
      >
        {edit ? (
          <>
            <form onSubmit={handleSaveUpdate}>
              <input
                defaultValue={updateItem}
                className="edit-input"
                onChange={(e) => setUpdateItem(e.target.value)}
              ></input>
            </form>
          </>
        ) : (
          itemName
        )}
      </p>
      {!toEdit && (
        <FunctionsButton
          packed={packed}
          edit={edit}
          onDeleteItems={onDeleteItems}
          id={id}
          onToggleChecked={onToggleChecked}
          onEdit={onEdit}
          updateItem={updateItem}
          setUpdateItem={setUpdateItem}
          onSaveUpdate={handleSaveUpdate}
        />
      )}
    </div>
    // </div>
  );
}

export default WishList;
