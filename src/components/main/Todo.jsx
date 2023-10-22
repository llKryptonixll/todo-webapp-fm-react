const Todo = ({ todoText, todo, toggleComplete, deleteTodo, onDragStart, onDragOver, onDragEnd, draggable, style }) => {
    return (
        <li onDragStart={onDragStart} onDragOver={onDragOver} onDragEnd={onDragEnd} draggable={draggable} style={style} className='flex justify-between pl-4 pr-4 dark:border-veryDarkGrayishBlue2 border-lightGrayishBlue border-b-[1px] min-h-[70px] items-center group cursor-grab'>
            <div className='flex items-center space-x-4'>
                <div className='bg-gradient-to-br dark:from-veryDarkGrayishBlue2 dark:to-veryDarkGrayishBlue2 from-lightGrayishBlue to-lightGrayishBlue rounded-full p-[2px] hover:from-gradient1 hover:to-gradient2 transition-colors'>
                    <div onClick={() => toggleComplete(todo)} className={`${todo.completed ? "bg-gradient-to-br from-gradient1 to-gradient2" : ""} dark:bg-veryDarkDesaturatedBlue bg-Light_veryLightGray w-[30px] h-[30px] rounded-full grid place-items-center cursor-pointer`}>
                        <img className={`${todo.completed ? "block" : "hidden"}`} src="images/icon-check.svg" alt="checked-icon" />
                    </div>
                </div>
                <p onClick={() => toggleComplete(todo)} className={`${todo.completed ? "line-through dark:text-veryDarkGrayishBlue text-Light_darkGrayishBlue" : ""} dark:text-lightGrayishBlue2 text-Light_veryDarkGrayishBlue cursor-pointer`}>{todoText}</p>
            </div>
            <button className='md:opacity-0 opacity-100 md:group-hover:opacity-100 transition-opacity' onClick={() => deleteTodo(todo.id)} aria-label='delete-todo-button'>
                <img src="images/icon-cross.svg" alt="cross-x-image" />
            </button>
        </li>
    )
}

export default Todo