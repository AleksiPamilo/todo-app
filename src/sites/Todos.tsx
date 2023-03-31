import React, { useState, useEffect } from "react";
import CreateTodo from "../components/CreateTodo";
import Todo from "../components/Todo";
import ITodo from "../types/Todo";

const Todos: React.FC = () => {
    document.title = "Todo App";
    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        const todos = localStorage.getItem("todos");
        if (todos) {
            setTodos(JSON.parse(todos));
        }
    }, []);

    return (
        <div className="w-screen h-screen pt-32 flex flex-col items-center gap-5 pb-8 overflow-x-hidden overflow-y-auto">
            <h1 className="absolute top-0 left-0 px-4 py-2 text-3xl font-bold">Todo</h1>
            <div className="text-center">
                <CreateTodo {...{ todos, setTodos }} />
            </div>
            <div className="flex flex-wrap gap-4 justify-center items-center">
                {todos.sort((a, b) => {
                    if (a.completed && !b.completed) {
                        return 1;
                    } else if (!a.completed && b.completed) {
                        return -1;
                    } else {
                        return 0;
                    }
                }).map((todo) => (
                    <Todo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
                ))}
            </div>
        </div>
    )
}

export default Todos;
