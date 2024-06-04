import { signOut } from "firebase/auth";
// import { auth } from "../firebase/config";

export const useLogOut = () => {
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("user signed out", auth);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return { logout };
};
