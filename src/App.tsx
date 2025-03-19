import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todos } from './types/Todos';
import { getUserId } from './services/user';

const initialTodo: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserId(todo.userId),
}));

function getNewTodoId(todos: Todos[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todos[]>(initialTodo);

  const addTodo = (todo: Todos) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm
        onSubmit={addTodo}
        users={usersFromServer}
        todos={todosFromServer}
      />
      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
