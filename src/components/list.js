import { useEffect, useState } from "react";
import ListItem from "./list-item";
import "./List.css";

function List() {
  const apiUrl = "https://todolist-backend.onrender.com";
  const [data, setData] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(apiUrl + "/todo/", requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result.data))
      .catch((error) => console.log("error", error));
  }, []);

  // create new todo
  function handleSubmit(e) {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      value: newTodo,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiUrl + "/todo/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData([...data, result.todo]);
        setNewTodo("");
      })
      .catch((error) => console.log("error", error));
  }

  function deleteTodo(id) {
    let newData = [...data];

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      _id: data[id]._id,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiUrl + "/todo/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        newData.splice(id, 1);
        setData(newData);
      })
      .catch((error) => console.log("error", error));
  }

  function changeChecked(id) {
    let newData = [...data];

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      _id: data[id]._id,
      checked: !data[id].checked,
      value: data[id].value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiUrl + "/todo/edit", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        newData[id] = result.todo;
        setData(newData);
      })
      .catch((error) => console.log("error", error));
  }

  function editTodo(id, newValue) {
    let newData = [...data];

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      _id: data[id]._id,
      checked: data[id].checked,
      value: newValue,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiUrl + "/todo/edit", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        newData[id] = result.todo;
        setData(newData);
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <div className="List">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        />

        <button type="submit">Add todo</button>
      </form>
      {data.map((val, i) => (
        <ListItem
          value={val.value}
          checked={val.checked}
          key={i}
          id={i}
          changeChecked={changeChecked}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
}

export default List;
