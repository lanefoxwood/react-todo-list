import React from 'react'

export default function Todo({ todo, toggleTodo  }) {
    function handleTodoClick(){
        toggleTodo(todo.id)
    }
    return (
        <div className='todo-item'>
            <label>
            <input className="todo-checkbox" type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
            {todo.name}
            </label>
            
        </div>
    )
}
