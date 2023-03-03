import React, { useState } from "react";
import ITodo from "../types/Todo";

type TodoProps = {
    todo: ITodo;
    todos: ITodo[];
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>
};

const Todo: React.FC<TodoProps> = ({ todo, todos, setTodos }) => {
    const [title, setTitle] = useState<string>(todo.title);
    const [editable, setEditable] = useState<boolean>(false);
    const inputStyle = "py-2 px-3 border bg-black focus:shadow-glow-2 disabled:bg-black disabled:border-0";

    const deleteTodo = (id: string) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    const handleCompletion = (id: string) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }

            return todo;
        });

        setTodos(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    return (
        <div key={todo.id} className="flex gap-4 items-center p-4 border hover:shadow-glow-5">
            <input type="checkbox" className="w-5 h-5" checked={todo.completed} onClick={() => handleCompletion(todo.id)} />
            <input disabled={!!!editable} className={inputStyle} value={title} onChange={(e) => setTitle(String(e.target.value))} />
            <p>{todo.description}</p>

            <div>
                <button onClick={() => setEditable(!editable)} className="py-2 px-3 border hover:shadow-glow-2">Edit</button>
                <button onClick={() => deleteTodo(todo.id)} className="py-2 px-3 border hover:shadow-glow-2">Delete</button>
            </div>
        </div>
    )
}

export default Todo;
