import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { TodoList } from "./components/TodoList";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { motion } from "framer-motion";

import { useLogOut } from "../src/hooks/useLogOut";
import { useDispatch } from "react-redux";
import LandingPage from "./components/pages/LandingPage";

function App() {
  const dispatch = useDispatch();

  const { logout } = useLogOut();
  const navigate = useNavigate();
  function handleHome() {
    logout;
    navigate("/");
    dispatch({ type: "REMOVE_USER" });
  }

  return (
    <>
      <div className="flex flex-col mt-8 items-center justify-center ">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <h1 className="text-6xl concert me-8">What</h1>
          <div className="flex justify-center items-center">
            <motion.h2
              className="text-8xl text-pretty concert text-purple-500"
              onClick={handleHome}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              To-do
            </motion.h2>
            <h1 className="text-8xl concert ms-2 ">,</h1>
          </div>
        </div>
        <h1 className="text-6xl mb-8 concert">today?</h1>

        <Routes>
          <Route element={<LandingPage></LandingPage>} path="/"></Route>
          <Route element={<Login></Login>} path="/LoginPage"></Route>
          <Route element={<SignUp></SignUp>} path="/SignUpPage"></Route>
          <Route element={<TodoList></TodoList>} path="/to-do-page"></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
