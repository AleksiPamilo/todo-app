import React, { useState } from "react";
import ITodo from "../types/Todo";

type CreateTodoProps = {
    todos: ITodo[];
    setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>
};
const CreateTodo: React.FC<CreateTodoProps> = ({ todos, setTodos }) => {
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const addTodo = () => {
        if (title === "") {
            return setError("Title cannot be empty");
        }
        setError(null);

        const todo: ITodo = {
            id: Date.now().toString(36) + Math.random().toString(36).substring(2),
            title: title,
            description: null,
            completed: false
        }

        setTodos([...todos, todo]);
        localStorage.setItem("todos", JSON.stringify([...todos, todo]));
    }

    return (
        <div className="flex flex-col">
            <div className="flex gap-2">
                <input placeholder="Add Todo" type="text" className="py-2 px-3 w-[25rem] rounded-md border border-zinc-700 bg-zinc-900 focus:outline-none focus:border-zinc-600" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button className="py-2 px-4 rounded-md bg-zinc-900 border border-zinc-700 hover:bg-zinc-800" onClick={addTodo}>Add</button>
            </div>
            <p hidden={!!!error} className="text-left my-2 text-red-500">{error}</p>
        </div>
    )
}

export default CreateTodo;
