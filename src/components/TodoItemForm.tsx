import React, { useState } from 'react'
import '../App.css';

interface Todo {
  id: number;
  todoItem: string;
  isComplete: boolean;
  todoDate: Date;
}

type TodoItemFormProps = {
  addTodo? : (newTodo: Todo) => void,
  editTodo? : (editTodo: Todo) => void;
}

const TodoItemForm = ({addTodo, editTodo}:TodoItemFormProps) => {
  const [item, setItem] = useState<string>('');
  const [completeState, setCompleteState] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const addTodoHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
    const newTodo : Todo = {
      id : 0,
      todoItem : item,
      isComplete: completeState,
      todoDate: date
    }

    event.preventDefault();
    addTodo && addTodo(newTodo);
    
    setItem('');
    setCompleteState(false)
    setDate(new Date())
  }


  return (
    <div className='todo-wrapper'>
        <div className = 'todo-input'>
          <div className = 'todo-input-item'>
            <label>Title</label>
            <input type='text' 
              value = {item}
              onChange={(e)=> setItem(e.currentTarget.value)}
            />
          </div>
          <div className = 'todo-input-item'>
            <label>Date</label>
            <input
              type="date"
              value={new Date().toISOString().split('T')[0]} // Format date for input value
            />
          </div>
          <div className = 'todo-input-item'>
            <button onClick={addTodoHandler} className='primaryBtn'> Add </button> 
        </div>
      </div>
    </div>
  )
}

export default TodoItemForm
