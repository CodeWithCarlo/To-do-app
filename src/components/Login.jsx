import { motion } from "framer-motion";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Login() {
  const { error, logIn } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    logIn(email, password);
    setEmail("");
    setPassword("");
    dispatch({ type: "ADD_USER", payload: email.split("@")[0] });
    navigate("/to-do-page");
  }
  // function handleBack() {
  //   navigate(-1);
  // }
  return (
    <>
      <div className="mt-4 p-8 w-96 md:w-[700px] mx-4  bg-purple-200 rounded-lg">
        <h3 className="text-2xl font-bold ">LOGIN</h3>
        <form className="flex flex-col py-4">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <input
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="shadow mb-4 appearance-none border rounded w-80  md:w-96 mx-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></input>
              <input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="shadow mb-4 appearance-none border rounded w-80  md:w-96 mx-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></input>
            </div>
          </div>
          <div className="flex justify-center">
            <motion.button
              className="shadow bg-purple-500 row-span-1 hover:bg-purple-400 focus:shadow-outline mx-2 focus:outline-none text-white font-bold py-2 px-4 rounded"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSubmit}
            >
              GO
            </motion.button>
          </div>
          {/* <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline mx-2 focus:outline-none text-white font-bold py-2 px-4 rounded"
            onClick={handleBack}
          >
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-6 h-6 fill-white"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
              <p>BACK</p>
            </div>
          </motion.div> */}
          {error && <p className="mt-4">{error}</p>}
        </form>
      </div>
    </>
  );
}
export default Login;
