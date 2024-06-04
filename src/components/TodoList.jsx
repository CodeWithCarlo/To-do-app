import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLogOut } from "../hooks/useLogOut";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export function TodoList() {
  const localData = localStorage.getItem("task");
  const localTasks = JSON.parse(localData);
  const [todos, setTodos] = useState(localTasks);
  const [inputValue, setInputValue] = useState("");
  const [randomId, setRandomId] = useState("");
  const [trueVar, setTrueVar] = useState(true);
  const dragTask = useRef(0);
  const draggedOverTask = useRef(0);
  const { logout } = useLogOut();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.email);
  // const USER = user.toUpperCase();
  function handleSort() {
    const taskClone = [...todos];
    const temp = taskClone[dragTask.current];
    taskClone[dragTask.current] = taskClone[draggedOverTask.current];
    taskClone[draggedOverTask.current] = temp;
    setTodos(taskClone);
  }
  const dispatch = useDispatch();

  function handleLogOut() {
    logout;
    dispatch({ type: "REMOVE_USER" });
    navigate("/");
  }

  //Funzione che crea un id di "length" cifre. Lo uso per assegnare un id ad ogni nota.
  function makeid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  //Handle-change function: imposta "inputValue" uguale a ciò che digito nell'input (ogni volta che digito un carattere) e assegna a "RandomId" un codice random
  function handleChange(e) {
    setInputValue(e.target.value);
    setRandomId(makeid(6));
    setTrueVar(true);
  }
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(todos));
  }, [todos]);
  // Handle Submit function: previene il comportamento di default del form, imposta "Todos" uguale a Todos precedenti +
  // "inputValue" (ciò che è stato digitato prima dell'invio), random id e var isClicked. infine imposta "inputvalue" come vuoto
  function handleSubmit(e) {
    e.preventDefault();
    setTodos([
      ...todos,
      { task: inputValue, id: randomId, isClicked: trueVar },
    ]);
    setInputValue("");
    setRandomId("");
    console.log(todos);
  }

  function handleDelete(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function handleToggle(index) {
    const newTodos = [...todos];
    newTodos[index].isClicked = !newTodos[index].isClicked;
    setTodos(newTodos);
  }

  return (
    <>
      <div className="flex justify-between rounded-lg bg-purple-500 w-96 md:w-[700px]">
        <div className=" mx-2 flex  text-white font-bold py-2 px-4 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-6 h-6 fill-white me-2"
          >
            <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
          </svg>
          <p>{user}</p>
        </div>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className=" mx-2  text-white font-bold py-2 px-4 rounded-lg"
          onClick={handleLogOut}
        >
          <p>LOG OUT</p>
        </motion.div>
      </div>

      <div className="bg-purple-200 p-8 w-96 md:w-[700px] mt-4 rounded-lg">
        <form className=" pt-4 flex  items-center justify-center ">
          <input
            type="text"
            placeholder="Write something.."
            value={inputValue}
            onChange={handleChange}
            className="shadow mb-4 appearance-none border rounded w-80  md:w-96 mx-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <motion.button
            onClick={handleSubmit}
            className="shadow bg-purple-500 mb-4 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ADD TO DO
          </motion.button>
        </form>

        <ul>
          <div className="flex flex-col justify-center items-center ">
            {todos.map((item, index) => (
              <motion.li
                key={item.id}
                draggable
                onDragStart={() => (dragTask.current = index)}
                onDragEnter={() => (draggedOverTask.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                {item.isClicked ? (
                  <div
                    key={item.id}
                    className="mt-4 bg-purple-500 text-white text-lg rounded w-80 md:w-96 px-4 py-2  grid grid-cols-3"
                  >
                    <div className="col-span-2 text-start concert font-bold ">
                      {index + 1}) {item.task}
                    </div>
                    <div className="flex justify-end items-center">
                      <div className="ms-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="w-6 h-6 fill-white hover:fill-slate-700"
                          onClick={() => handleToggle(index)}
                        >
                          <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={item.id}
                    className="mt-4 bg-purple-500 text-white text-lg rounded w-80  md:w-96 px-4 py-2  grid grid-cols-3"
                  >
                    {/* <div className="z-10 w-80 h-1 bg-black"></div> */}
                    <div className="col-span-2 text-start font-bold line-through decoration-4 decoration-black concert">
                      {index + 1}) {item.task}
                    </div>
                    <div className="flex justify-end items-center">
                      <div className="ms-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6 fill-white hover:fill-slate-700"
                          viewBox="0 0 384 512"
                          onClick={() => handleDelete(index)}
                        >
                          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </motion.li>
            ))}
          </div>
        </ul>
      </div>
    </>
  );
}
