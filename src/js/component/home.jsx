import React, { useEffect, useState } from "react";

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('https://playground.4geeks.com/todo/users/GaretKean')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                console.log("Fetched data:", data);
                setTodos(data.todos || []); // Safeguard against undefined 'todos'
            })
            .catch(error => console.error("Error fetching tasks:", error));
    }, []);

    const handleAddTodo = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            const newTodo = {
                label: inputValue.trim(),
                is_done: false
            };

            fetch(`https://playground.4geeks.com/todo/todos/GaretKean`, {
                method: "POST",
                body: JSON.stringify(newTodo),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    return response.json();
                })
                .then(data => {
                    console.log("Added new task:", data);
                    setTodos([...todos, data]);
                    setInputValue("");
                })
                .catch(error => console.error("Error adding task:", error));
        }
    };

    const handleDeleteTodo = (index) => {
        const todoToDelete = todos[index];
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);

        fetch(`https://playground.4geeks.com/todo/todos/${todoToDelete.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                // Check if the response body is not empty
                return response.text().then(text => text ? JSON.parse(text) : {});
            })
            .then(data => console.log("Deleted task on server:", data))
            .catch(error => console.error("Error updating tasks:", error));
    };

    const addUser = () => {


        fetch(`https://playground.4geeks.com/todo/users/GaretKean`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                console.log("Added new user: GaretKean", data);

            })
            .catch(error => console.error("Error adding user:", error));




    };



    const handleClearAll = () => {
        fetch(`https://playground.4geeks.com/todo/users/GaretKean`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                console.log("Deleted user: GaretKean");
                // Clear the todos on the frontend
                setTodos([]);
            })
            .catch((error) => console.error('Error deleting user:', error));
    };

    const updateTodo = (todo_id, updatedLabel) => {
        fetch(`https://playground.4geeks.com/todo/todos/${todo_id}`, {
            method: "PUT",
            body: JSON.stringify({
                label: updatedLabel,
                is_done: false
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(data => console.log("Updated todo:", data))
            .catch(error => console.error("Error updating todo:", error));
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">todos</h1>
            <div className="card todo-card mx-auto mt-5" style={{ maxWidth: "800px" }}>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <input
                            type="text"
                            onChange={(e) => setInputValue(e.target.value)}
                            value={inputValue}
                            onKeyDown={handleAddTodo}
                            placeholder="Add to your tasks"
                        />
                    </li>
                    {Array.isArray(todos) && todos.length === 0 ? (
                        <li className="list-group-item no-tasks">no tasks, add a task</li>
                    ) : (
                        Array.isArray(todos) && todos.map((todo, index) => (
                            <li className="list-group-item" key={index}>
                                <div className="list-group-item-todo" id="screen">
                                    {todo.label}
                                </div>
                                <span className="x-container" onClick={() => handleDeleteTodo(index)}>
                                    <i className="fa-solid fa-x"></i>
                                </span>
                            </li>
                        ))
                    )}
                </ul>
                <div className="card-footer text-secondary">
                    {todos.length} {todos.length === 1 ? "item" : "items"} left.
                </div>
            </div>
            <button onClick={addUser}>Add a new user</button>
            <button onClick={handleClearAll}>Clear Tasks</button>
        </div>
    );
};

export default Home;
