import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");


  //ფუნქცია რომლითაც ვამატებ დავალებებს
  const hendleAddTodo = (e) => {
    if (!newTitle) {
      window.alert("enter new task")
      e.preventDefault()
    } else {
      e.preventDefault()
      let newTodoItem = { title: newTitle }
      let updatedTodoArr = [...allTodos]
      updatedTodoArr.push(newTodoItem)
      setTodos(updatedTodoArr);
      setNewTitle("");
      localStorage.setItem("todoList", JSON.stringify(updatedTodoArr))
    }
  }

  //ფუნქცია რომლითაც ვშლი დავალებებს
  const deleteTodo = (index) => {
    let deletedTodos = [...allTodos];
    deletedTodos.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(deletedTodos));
    setTodos(deletedTodos);
  }

  //ფუნქცია რომელიც მონიშნავს დავალებას დასრულებულად
  const Complete = (index) => {
    let updatedTodos = [...allTodos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    localStorage.setItem("todoList", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);

  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todoList")) || [];
    setTodos(savedTodo);

  }, []);

  return (
    <div className="container">
      {/* დაითვლის დავალებების რაოდენობას */}
      <h2 className='text-center text-light mb-5 mt-4'>my task lists
        ({allTodos.filter(item => !item.complete).length})
      </h2>
      <div className='row justify-content-center'>
        <div className='col-12 col-md-8 col-lg-6'>
          <div className='todo-box'>
            {/* დაითვლის რამდენი დავალებაა completed */}
            <h6 className='text-white text-center mb-4'>
              completed tasks ({allTodos.filter(item => item.completed).length})
            </h6>
            <div className='todobox-task-field'>
              {/* ვიყენებ map მეთოდს ყველა ჯერზე ახალი დავალება რო დაამატოს */}
              {allTodos.map((item, index) => {
                return (
                  <div key={index} className='todo-tasks-box ms-4 me-4 pt-2 pb-2 ps-2 pe-2 mb-2'>
                    <div className='d-flex justify-content-between pe-2'>
                      <div className='w-75 ps-2 pe-2'>
                        <div className={`mb-0 ${item.completed ? 'completed-container' : 'task-content'}`}>
                          <div className="completed-text">{item.title}</div>
                        </div>
                      </div>
                      <div className='d-flex align-items-center gap-1'>
                        <input type="checkbox" className="btn-check" id={`btncheck${index}`} checked={item.completed}
                          onChange={() => Complete(index)} />
                        <label className="btn gsde btn-primary del-btn rounded-3 d-flex align-items-center" htmlFor={`btncheck${index}`}>
                          {item.completed ? 'Completed' : 'Complete'}
                        </label>
                        <button className='btn btn-danger rounded-2 del-btn d-flex align-items-center'
                          onClick={() => deleteTodo(index)}>
                          X
                        </button>

                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <hr />
            {/* input field */}
            <form >
              <div className='d-flex gap-3 pe-4 ps-4'>
                <input type="text" placeholder='enter your task here' className='form-control rounded-0'
                  value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                <button onClick={hendleAddTodo} className='btn btn-success add-button rounded-0'>add</button>
              </div>
            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
