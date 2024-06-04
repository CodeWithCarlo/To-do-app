import { motion } from "framer-motion";
import { useSignUp } from "../hooks/useSignUp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function SignUp() {
  const { error, signUp } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    signUp(email, password);
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
      {/* <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        onClick={handleBack}
      >
        <p>BACK</p>
      </motion.div> */}
      <div className="mt-4 p-8 w-96 md:w-[700px]  bg-purple-200 rounded-lg">
        <h3 className="text-2xl font-bold ">SIGN UP</h3>
        <form className="flex flex-col items-center mB-4 py-4">
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="shadow mb-4 appearance-none border rounded w-80  md:w-96 mx-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>
          <input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="shadow mb-4 appearance-none border rounded w-80  md:w-96 mx-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>
          <motion.button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSubmit}
          >
            GO
          </motion.button>
          {error && <p className="mt-4">{error}</p>}
        </form>
      </div>
    </>
  );
}
export default SignUp;
