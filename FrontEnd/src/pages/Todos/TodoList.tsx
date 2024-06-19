import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.js';
import TodoHeader from '../../components/Todos/TodoHeader.tsx';
import Header from '../../layout/Header.tsx';
import { jwtDecode } from 'jwt-decode';
import DropdownToDo from '../../components/Dropdowns/DropdownToDo.tsx';
import API_URL from '../../components/customenv.tsx';

interface Todo {
  todo_uuid: string;
  todo_name: string;
  todo_completed: boolean;
  todo_priority: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleDelete = (uuid: string) => {
    fetch(`${API_URL}/api/todos/${uuid}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setTodos(todos.filter((todo) => todo.todo_uuid !== uuid));
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };
  const handleChangePriority = (uuid: string, currentPriority: boolean) => {
    fetch(`${API_URL}/api/todos/${uuid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/merge-patch+json',
      },
      body: JSON.stringify({
        priority: !currentPriority,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('La réponse du réseau n\'était pas correcte');
        }
        setTodos(
          todos.map((todo) =>
            todo.todo_uuid === uuid ? { ...todo, todo_priority: !currentPriority } : todo
          )
        );

      })
      .catch((error) => {
        console.error('Un problème est survenu avec votre opération de fetch:', error);
      });
  };

  const handleCheck = (uuid: string, completed: boolean) => {
    fetch(`${API_URL}/api/todos/${uuid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/merge-patch+json',
      },
      body: JSON.stringify({
        completed: !completed,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setTodos(
          todos.map((todo) =>
            todo.todo_uuid === uuid ? { ...todo, todo_completed: !completed } : todo
          )
        );
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userUuid = decodedToken.uuid;

      fetch(`${API_URL}/api/user/${userUuid}/todos/`)
        .then((response) => response.json())
        .then((data) => setTodos(data));
    }
  }, []);

  const todosPrioritaires = todos.filter((todo) => todo.todo_priority);
  const todosNonPrioritaires = todos.filter((todo) => !todo.todo_priority);

  return (
    <Header>
      <div className="mx-auto max-w-5xl">
        <Breadcrumb pageName="Todo List" />
        <TodoHeader />

        {/* Tâches prioritaires */}
        <div className="mt-9 flex flex-col gap-9">
          <div className="swim-lane flex flex-col gap-5.5">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              To Do's Prioritaires ({todosPrioritaires.length})
            </h4>
            {[...todosPrioritaires].reverse().map((todo, index) => (
              <div
                key={todo.todo_uuid}
                draggable="true"
                className="task relative flex cursor-move justify-between rounded-sm border border-stroke bg-white p-7 shadow-default dark:border-strokedark dark:bg-boxdark"
              >
                <div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor={`taskCheckboxPrioritaire${index}`} className="cursor-pointer">
                      <div className="relative flex items-center pt-0.5">
                        <input
                          type="checkbox"
                          id={`taskCheckboxPrioritaire${index}`}
                          className="taskCheckbox sr-only"
                          defaultChecked={todo.todo_completed}
                          onChange={() => handleCheck(todo.todo_uuid, todo.todo_completed)}
                        />
                        <div
                          className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark dark:bg-boxdark-2">
                          <span className="text-white opacity-0">
                            <svg className="fill-current" width="10" height="7" viewBox="0 0 10 7" fill="none"
                                 xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd"
                                                                           d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                                                                           fill="" /> </svg>
                          </span>
                        </div>
                        <p>{todo.todo_name}</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="absolute right-4 top-4">
                  <DropdownToDo onDelete={() => handleDelete(todo.todo_uuid)}   onChangePriority={() =>{handleChangePriority(todo.todo_uuid, todo.todo_priority)}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tâches non prioritaires */}
        <div className="mt-9 flex flex-col gap-9">
          <div className="swim-lane flex flex-col gap-5.5">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              To Do's Non Prioritaires ({todosNonPrioritaires.length})
            </h4>
            {[...todosNonPrioritaires].reverse().map((todo, index) => (
              <div
                key={todo.todo_uuid}
                draggable="true"
                className="task relative flex cursor-move justifier-between rounded-sm border border-stroke bg-white p-7 shadow-default dark:border-strokedark dark:bg-boxdark"
              >
                <div>
                <div className="flex flex-col gap-2">
                    <label htmlFor={`taskCheckbox${index}`} className="cursor-pointer">
                      <div className="relative flex items-center pt-0.5">
                        <input
                          type="checkbox"
                          id={`taskCheckbox${index}`}
                          className="taskCheckbox sr-only"
                          defaultChecked={todo.todo_completed}
                          onChange={() => handleCheck(todo.todo_uuid, todo.todo_completed)}
                        />
                        <div
                          className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark dark:bg-boxdark-2">
                          <span className="text-white opacity-0">
                            <svg className="fill-current" width="10" height="7" viewBox="0 0 10 7" fill="none"
                                 xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd"
                                                                           d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                                                                           fill="" /> </svg>
                          </span>
                        </div>
                        <p>{todo.todo_name}</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="absolute right-4 top-4">
                  <DropdownToDo onDelete={() => handleDelete(todo.todo_uuid)}   onChangePriority={() =>{handleChangePriority(todo.todo_uuid, todo.todo_priority)}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Header>
  );
};

export default TodoList;
