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
    const inputStyle = "py-2 px-3 rounded-lg border border-zinc-900 bg-[#101010] disabled:bg-transparent disabled:border-0";

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
        <div key={todo.id} className={`flex gap-4 p-4 rounded-md items-center bg-zinc-900 border border-zinc-600 cursor-pointer ${todo.completed && "brightness-50"}`} onClick={() => {
            if (!todo.completed) {
                setEditable(!editable);
            }
        }}>
            <input type="checkbox" className="w-5 h-5 cursor-pointer" checked={todo.completed} onClick={(e) => {
                e.stopPropagation();
                handleCompletion(todo.id);
            }} />
            <input onClick={e => e.stopPropagation()} disabled={!!!editable} className={inputStyle + " disabled:hover:cursor-pointer"} value={title} onChange={(e) => setTitle(String(e.target.value))} />
            <p>{todo.description}</p>
            <div className="flex gap-2">
                <button hidden={!editable} className="py-2 px-3 rounded-md border border-zinc-600 hover:bg-zinc-800" onClick={(e) => {
                    e.stopPropagation();
                    const updatedTodos = todos.map((item) => {
                        if (todo.id === item.id) {
                            todo.title = title;
                        }

                        return todo;
                    });

                    setTodos(updatedTodos);
                    localStorage.setItem("todos", JSON.stringify(updatedTodos));
                    setEditable(!editable);
                }}>Save</button>
                <button className="py-2 px-3 rounded-md border border-zinc-600 hover:bg-zinc-800" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
        </div>
    )
}

export default Todo;
