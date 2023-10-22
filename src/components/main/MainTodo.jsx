import { useState, useEffect } from "react"
import Todo from "./Todo"
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

const MainTodo = () => {
    
    const [todoVal, setTodoVal] = useState("");
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("All");
    const [draggedTodo, setDraggedTodo] = useState(null);
    
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                renderTodos();
            }
        })
    }, [])

    // drag and drop logic
    function handleDragStart(e, todo) {
        setDraggedTodo(todo);
        e.dataTransfer.setData("text/plain", ""); // Necessary for some browsers to enable dragging.
    }
    function handleDragEnd() {
        setDraggedTodo(null);
    }
    function handleDragOver(e, todo) {
        e.preventDefault(); // Prevent the default behavior of not allowing drops.
        if (draggedTodo === null || draggedTodo === todo) return; // Don't perform unnecessary updates.
        const updatedTodos = todos.slice();
        const draggedIndex = updatedTodos.indexOf(draggedTodo);
        const newIndex = updatedTodos.indexOf(todo);
        updatedTodos.splice(draggedIndex, 1);
        updatedTodos.splice(newIndex, 0, draggedTodo);
        setTodos(updatedTodos);
    }

    // main todo app logic (CRUD)
    function handleTodoChange(e) {
        setTodoVal(e.target.value)
    }
    function addTodoOnEnter(e) {
        if (e.key === 'Enter') {
            const todoCollectionRef = collection(db, `users/${auth.currentUser.uid}/todos`);
            if (todoVal === "") {
                alert("Enter a todo!")
            }
            else {
                addDoc(todoCollectionRef, {
                    text: todoVal,
                    completed: false
                })
            }
            renderTodos();
            setTodoVal("");
        }
    }
    async function renderTodos() {
        try {
            const todoCollectionRef = collection(db, `users/${auth.currentUser.uid}/todos`)
            const data = await getDocs(todoCollectionRef)
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setTodos(filteredData)
        }
        catch (error) {
            console.log(error);
        }
    }
    async function toggleComplete(todo) {
        await updateDoc(doc(db, `users/${auth.currentUser.uid}/todos`, todo.id), {
            completed: !todo.completed
        })
        renderTodos();
    }
    async function deleteTodo(id) {
        await deleteDoc(doc(db, `users/${auth.currentUser.uid}/todos`, id));
        renderTodos();
    }
    async function deleteCompletedTodo() {
        const completedTodos = todos.filter((todo) => todo.completed);

        for (const todo of completedTodos) {
            try {
                await deleteDoc(doc(db, `users/${auth.currentUser.uid}/todos`, todo.id));
            } catch (error) {
                console.error("Error deleting document:", error);
            }
        }

        renderTodos();
    }

    // filter logic
    function getFilteredTodos() {
        if (filter === "Completed") {
            return todos.filter((todo) => todo.completed);
        } else if (filter === "Active") {
            return todos.filter((todo) => !todo.completed);
        } else {
            return todos;
        }
    }
    function filterTodos(filter) {
        setFilter(filter);
    }

    return (
        <section className='md:w-[650px] w-[90%] relative self-start'>
            <div className='mb-5 dark:bg-veryDarkDesaturatedBlue bg-Light_veryLightGray relative rounded-md h-[70px] flex items-center'>
                <span className='absolute ml-4 rounded-full w-[30px] h-[30px] dark:border-veryDarkGrayishBlue2 border-2'></span>
                <input onChange={handleTodoChange} onKeyPress={addTodoOnEnter} value={todoVal} placeholder='e.g. Create a new todo...' className='w-full h-full bg-transparent pl-14 outline-none caret-brightBlue text-Light_veryDarkGrayishBlue' type="text" />
            </div>
            <ul className='dark:bg-veryDarkDesaturatedBlue overflow-auto h-[500px] bg-Light_veryLightGray items-center rounded-tl-md rounded-tr-md shadow-md'>
                {todos.length === 0 ? <li className="grid place-items-center h-full text-3xl dark:text-lightGrayishBlue2 text-Light_veryDarkGrayishBlue">No Todos</li> :
                    getFilteredTodos().map((todo) => {
                        return (
                            <Todo
                                key={todo.id}
                                todo={todo}
                                todoText={todo.text}
                                toggleComplete={toggleComplete}
                                deleteTodo={deleteTodo}
                                onDragStart={(e) => handleDragStart(e, todo)}
                                onDragOver={(e) => handleDragOver(e, todo)}
                                onDragEnd={handleDragEnd}
                                draggable={true}
                                style={{
                                    opacity: draggedTodo === todo ? 0.5 : 1,
                                }}
                            />
                        )
                    })
                }
            </ul>
            <div className='flex justify-between items-center text-veryDarkGrayishBlue dark:bg-veryDarkDesaturatedBlue bg-Light_veryLightGray rounded-bl-md rounded-br-md pl-4 pr-4 h-[40px] shadow-md relative'>
                <p>{todos.length} items left</p>
                <div className='space-x-4 md:relative md:dark:bg-transparent md:shadow-none md:bg-transparent md:h-auto md:w-auto md:top-0 md:flex absolute top-[65px] left-0 justify-center flex w-full rounded-md h-[70px] dark:bg-veryDarkDesaturatedBlue bg-Light_veryLightGray shadow-lg'>
                    <button onClick={() => filterTodos("All")} className={`${filter === "All" ? "text-brightBlue" : ""} font-bold hover:text-lightGrayishBlueHover transition-colors`}>All</button>
                    <button onClick={() => filterTodos("Active")} className={`${filter === "Active" ? "text-brightBlue" : ""} font-bold hover:text-lightGrayishBlueHover transition-colors`}>Active</button>
                    <button onClick={() => filterTodos("Completed")} className={`${filter === "Completed" ? "text-brightBlue" : ""} font-bold hover:text-lightGrayishBlueHover transition-colors`}>Completed</button>
                </div>
                <button onClick={() => deleteCompletedTodo()} className='hover:text-lightGrayishBlueHover transition-colors'>Clear Completed</button>
            </div>
            <p className="w-full flex justify-center relative md:top-10 top-[140px] pb-10 text-veryDarkGrayishBlue">Drag and drop to reorder the list</p>
        </section>
    )
}

export default MainTodo