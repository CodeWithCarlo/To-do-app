import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/LoginPage");
  }
  function handleSignUp() {
    navigate("/SignUpPage");
  }

  return (
    <>
      <div className="flex justify-center items-center p-3  mb-2 w-full font-bold">
        <motion.div
          className="shadow flex  bg-purple-500 hover:bg-purple-400 mx-2 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLogin}
        >
          <p className="me-2">LOGIN</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-6 h-6 fill-white"
          >
            <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
          </svg>
        </motion.div>
        <motion.div
          className="shadow flex bg-purple-500 mx-2 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSignUp}
        >
          <p className="me-2">SIGN UP</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-6 h-6 fill-white"
          >
            <path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z" />
          </svg>
        </motion.div>
      </div>
    </>
  );
}
export default LandingPage;
