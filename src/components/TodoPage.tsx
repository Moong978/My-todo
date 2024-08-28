import React, { useState } from 'react'
import TodoItemForm from './TodoItemForm'
import TodoListDisplay from './TodoListDisplay';

interface Todo {
  id: number;
  todoItem: string;
  isComplete: boolean;
  todoDate: Date;
}

const TodoPage = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const addTodoHandler = (newTodo: Todo) => {
    newTodo.id = todoList.length+1;
    setTodoList([...todoList, newTodo]);
  }

  const editTodoHandler = (editTodo: Todo) => {
    const editTodoList = [...todoList];
    {editTodoList.map((todo)=> 
      editTodo && todo.id === editTodo.id ?
      (
        todo.todoItem = editTodo.todoItem,
        todo.isComplete = editTodo.isComplete,
        todo.todoDate = editTodo.todoDate
      ) : todo
    )}
    setTodoList(editTodoList);
  }

  const deleteTodoHandler = (id : number) => 
  {
    const editTodoList =  todoList.filter(todo => todo.id !== id)
    setTodoList(editTodoList);
  }

  const completeTodoHandler = (id : number) => 
    {
      
      todoList.map((todo) => todo.id === id && todo.isComplete === false ? todo.isComplete = true : todo.isComplete);

      setTodoList(todoList);

      {console.log(todoList)}
    }

  return (
    <div>
      <h1>Todo App</h1>
      <TodoItemForm addTodo = {addTodoHandler}/>
      <TodoListDisplay todoList={todoList}
        editTodo = {editTodoHandler}
        deleteTodo={deleteTodoHandler}
        completeTodo={completeTodoHandler}
      />
    </div>
  )
}

export default TodoPage
