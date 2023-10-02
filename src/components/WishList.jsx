import { useEffect, useState } from "react";
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
  const [updateItem, setUpdateItem] = useState(itemName);
  const [toEdit, setToEdit] = useState(edit);

  function handleSaveUpdate(e) {
    e.preventDefault();
    if (updateItem === "") onDeleteItems(id);
    onEdit(id, updateItem);
  }

  useEffect(function () {
    setToEdit(false);
  }, []);

  return (
    <div className="item">
      <div
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
      </div>
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
  );
}

export default WishList;
