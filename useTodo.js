import { useEffect, useReducer, useState } from "react";
import { TodoList, TodoAdd, todoReducer } from "../08-useReducer/index";

const initalState = [];

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodo = () => {
  const [todos, dispatch] = useReducer(todoReducer, initalState, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: "Add Todo",
      payload: todo,
    };

    dispatch(action);
  };

  const handleRemoveTodo = (id) => {
    dispatch({
      type: "Remove Todo",
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    dispatch({
      type: "Toggle Todo",
      payload: id,
    });
  };

  return {
    todos,
    handleNewTodo,
    handleRemoveTodo,
    handleToggleTodo,
    todosCount: todos.length,
    todosPendingCounts: todos.filter((todo) => !todo.done).length,
  };
};
