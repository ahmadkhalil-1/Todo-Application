import { useState } from "react";

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [showFinished, setShowFinished] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const addTodo = () => {
        if (inputValue.trim() !== "") {
            setTodos([...todos, { text: inputValue, completed: false }]);
            setInputValue("");
        }
    };

    const toggleTodo = (index) => {
        setTodos(
            todos.map((todo, i) =>
                i === index ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    const editTodo = (index, newText) => {
        setTodos(
            todos.map((todo, i) =>
                i === index ? { ...todo, text: newText } : todo
            )
        );
        setEditIndex(null);
    };

    const toggleShowFinished = () => {
        setShowFinished(!showFinished);
    };

    return (
        <div className="container mx-auto max-w-xl">
            <h1 className="text-center text-white text-3xl font-bold mt-8 mb-4">Todo Application</h1>
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Enter Todo's"
                    className="p-2 border border-gray-400 rounded w-64 mr-2"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={addTodo}
                >
                    Save
                </button>
            </div>
            {todos.map((todo, index) => (
                <div
                    key={index}
                    className={`flex items-center justify-between p-4 mb-2 rounded ${
                        todo.completed ? "bg-gray-200" : "bg-white"
                    }`}
                >
                    {editIndex !== index ? (
                        <div
                            className={`flex items-center ${todo.completed && "line-through"}`}
                            onClick={() => toggleTodo(index)}
                        >
                            {todo.text}
                        </div>
                    ) : (
                        <input
                            type="text"
                            className="p-1 border border-gray-400 w-64"
                            defaultValue={todo.text}
                            onBlur={(e) => editTodo(index, e.target.value)}
                        />
                    )}
                    <div className="flex">
                        {editIndex !== index ? (
                            <>
                                <button
                                    className="px-2 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
                                    onClick={() => setEditIndex(index)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => deleteTodo(index)}
                                >
                                    Delete
                                </button>
                            </>
                        ) : (
                            <button
                                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={() => setEditIndex(null)}
                            >
                                Done
                            </button>
                        )}
                    </div>
                </div>
            ))}
            {/* <button
                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={toggleShowFinished}
            >
                {showFinished ? "Hide Finished" : "Show Finished"}
            </button>
            {showFinished && (
                <div className="mt-4">
                    {todos
                        .filter((todo) => todo.completed)
                        .map((todo, index) => (
                            <div
                                key={index}
                                className="p-2 bg-gray-200 rounded"
                            >
                                <span className="line-through">{todo.text}</span>
                            </div>
                        ))}
                </div>
            )} */}
        </div>
    );
};

export default Todo;
