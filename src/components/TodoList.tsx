import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const TodoList: React.FC = () => {
  const { todos, loading, limit, page, error } = useTypedSelector(
    (state) => state.todo
  );
  const pages = [1, 2, 3, 4, 5];
  const { fetchTodos, setTodoPage } = useActions();

  useEffect(() => {
    fetchTodos(page, limit);
    console.log(page);
  }, [page]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>:(</h1>;
  }

  return (
    <div>
      {todos.map(({ id, title }) => {
        return (
          <div key={id}>
            {id} {title}
          </div>
        );
      })}
      <div>
        {pages.map((p, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setTodoPage(p);
              }}
              style={{
                border: p === page ? "2px solid red" : "2px solid #000",
              }}
            >
              {p}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
