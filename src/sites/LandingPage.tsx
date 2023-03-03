import React, { useState, useEffect } from "react";
import Todo from "../components/Todo";
import ITodo from "../types/Todo";

const LandingPage: React.FC = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        const todos = localStorage.getItem("todos");
        if (todos) {
            setTodos(JSON.parse(todos));
        }
    }, []);

    const addTodo = () => {
        const todo: ITodo = {
            id: new Date().toISOString(),
            title: title,
            description: null,
            completed: false
        }

        setTodos([...todos, todo]);
        localStorage.setItem("todos", JSON.stringify([...todos, todo]));
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-5">
            <div className="">
                <input type="text" className="py-2 px-3 border bg-black focus:shadow-glow-2" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button className="py-2 px-3 border hover:shadow-glow-2" onClick={addTodo}>Add</button>
            </div>
            <div className="max-h-[35rem] flex flex-col gap-4 items-center overflow-y-scroll">
                {todos.map((todo) => (
                    <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
                ))}
            </div>
        </div>
    )
}

export default LandingPage;
