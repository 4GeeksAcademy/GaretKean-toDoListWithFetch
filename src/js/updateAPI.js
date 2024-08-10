

export const addUser = () => {


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

export const clearAll = (setTodos) => {
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


export const fetchTodos = (setTodos) => {
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
}

export const addTodoToApi = async(todos, inputValue, setTodos) => {
    try {
        const newTask = {
            label: inputValue.trim(),
            is_done: false,
        };
        const response = await fetch(`https://playground.4geeks.com/todo/todos/GaretKean`, {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const updatedTodos = [
            ...todos, 
            { ...newTask, id: data.id},
        ];
        setTodos(updatedTodos);
        fetchTodos(setTodos);
    } catch(error){
        console.error("error adding task to api: ", error);
    }
};

export const deleteTaskFromApi = async(todoId, setTodos) => {
    try {
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);

        }
        fetchTodos(setTodos);

    } catch (error){
        console.error("Error updating tasks to API:", error);
    }
}

