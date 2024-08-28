import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

interface Todo {
  id: number;
  todoItem: string;
  isComplete: boolean;
  todoDate: Date;
}

// Define the props for the component
/* interface TodoProps {
  data: Todo;
} */


type TodoListDisplayProps = {
  todoList: Todo[],
  editTodo : (editTodo: Todo) => void,
  deleteTodo: (id:number) => void,
  completeTodo: (id:number) => void
}

const TodoListDisplay = ({todoList,editTodo, deleteTodo,completeTodo}:TodoListDisplayProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(0);
  const [editValue, setEditValue] = useState('');
  const [editDate, setEditDate] = useState<Date>(new Date());

  const editTodoHandler = (todo: Todo)=> {
    setEditMode(true);
    setEditId(todo.id);
    setEditValue(todo.todoItem);
    setEditDate(todo.todoDate);
  }

  const updateTodoHandler = ()=>
  {
    const editTodoObj : Todo = {
      id : editId,
      todoItem: editValue,
      todoDate : editDate,
      isComplete : false
    }
    editTodo(editTodoObj)
    setEditMode(false);
  }

  const deleteTodoHandler = (id: number) =>
  {
    deleteTodo(id);
  }

  const completeTodoHandler = (id:number) =>
  {
    completeTodo(id);
  }

  const dateChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    setEditDate(newDate);
  };

  return (
    <div className="center">
      {/* <ul>
        {
            todoList && todoList.map((todo)=> 
            
              editMode && editId===todo.id ? (
              <>
                <li>
                  {editId} - 
                  <input 
                    type = 'text'
                    value = {editValue}
                    key = {editId}
                    onChange={(e)=> setEditValue(e.currentTarget.value)}

                  />
                  <input
                    type="date"
                    onChange={dateChangeHandler}
                    value={editDate.toISOString().split('T')[0]} // Format date for input value
                  />
                  <button onClick={updateTodoHandler}>
                    Update
                  </button>
                  <button onClick={()=> setEditMode(false)}>
                    cancle
                  </button>
                </li>
              </>
              )
              :
              (
                
                <li>
                  <>
                    {todo.id} - 
                    {todo.todoItem} - 
                    <label id="date"> {todo.todoDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</label>
                    <button onClick={()=> editTodoHandler(todo)}>Edit</button>
                    <button onClick={()=> deleteTodoHandler(todo.id)}>Delete</button>
                    <button onClick={()=> completeTodoHandler(todo.id)}>Complete</button>
                    <p>{todo.isComplete ? 'Compeleted' : 'Todo'} </p>
                  </>
                </li>
              )
        )}
      </ul> */}
      <TableContainer component={Paper} sx={{ width: 800}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell align="left">Item</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Mode</TableCell>
            <TableCell align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todoList.map((todo) => editMode && editId === todo.id ? (
<TableRow
              key={todo.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {editId}
              </TableCell>
              <TableCell align="left"><input 
                    type = 'text'
                    value = {editValue}
                    key = {editId}
                    onChange={(e)=> setEditValue(e.currentTarget.value)}

                  />
</TableCell>
              <TableCell align="left"> <input
                    type="date"
                    onChange={dateChangeHandler}
                    value={editDate.toISOString().split('T')[0]} // Format date for input value
                  />
</TableCell>
              <TableCell align="left"><Button variant='contained' onClick={updateTodoHandler}>
                    Update
                  </Button>
                  <Button variant='contained' onClick={()=> setEditMode(false)}>
                    cancle
                  </Button>
</TableCell>
              <TableCell align="left">{todo.isComplete ? 'Completed' : 'Todo'}</TableCell>
            </TableRow>
) : (

            <TableRow
              key={todo.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {todo.id}
              </TableCell>
              <TableCell align="left">{todo.todoItem}</TableCell>
              <TableCell align="left">{todo.todoDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
              <TableCell align="left"><Button variant='contained' onClick={()=> editTodoHandler(todo)}>Edit</Button>
                    <Button variant='contained' onClick={()=> deleteTodoHandler(todo.id)}>Delete</Button>
                    <Button variant='contained' onClick={()=> completeTodoHandler(todo.id)}>Complete</Button>
</TableCell>
              <TableCell align="left">{todo.isComplete ? 'Completed' : 'Todo'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  )
}

export default TodoListDisplay
