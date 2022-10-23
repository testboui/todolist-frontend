import { useState } from "react";

function ListItem(props) {
  const [editMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(props.value);

  return (
    <div className="ListItem">
      <div>
        <input
          type="checkbox"
          checked={props.checked}
          onChange={(e) => {
            props.changeChecked(props.id);
          }}
        />
      </div>

      {editMode ? (
        <input
          value={newValue}
          onChange={(e) => {
            setNewValue(e.target.value);
          }}
        />
      ) : (
        <div className={props.checked ? "check" : ""}>{props.value}</div>
      )}

      <div className="ListBtns">
        <button
          onClick={() => {
            setEditMode(!editMode);
          }}
        >
          {editMode ? "Cancel" : "Edit"}
        </button>
        {editMode ? (
          <button
            onClick={() => {
              props.editTodo(props.id, newValue);
              setEditMode(false);
            }}
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              props.deleteTodo(props.id);
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default ListItem;
