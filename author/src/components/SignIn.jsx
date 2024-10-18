import { useState } from "react";
import { signIn } from "../api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function SignIn() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const token = await signIn(username, password);
      login(token);
      navigate("/posts");
    } catch (error) {
      console.error("Error siging in", error);
      setErrorMessage("Incorrect username or password");
    }
  };

  return (
    <div className="h-full content-center">
      <div className="rounded-xl w-80 m-auto p-6 py-10 mb-28">
        <h1 className="text-center text-5xl pb-10 font-semibold">Sign in</h1>
        <form
          className="flex flex-col flex-grow gap-2"
          action="POST"
          method="post"
          onSubmit={handleSignIn}
        >
          <label className="text-indigo-500" htmlFor="username">
            Username
          </label>
          <input
            className="bg-inherit border rounded-xl px-3 py-1"
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="text-indigo-500" htmlFor="password">
            Password
          </label>
          <input
            className="bg-inherit border rounded-xl px-3 py-1"
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="border rounded-xl w-1/2 mx-auto mt-5 p-1 bg-indigo-500 bg-opacity-20"
            type="submit"
          >
            Sign in
          </button>
        </form>
        {errorMessage && (
          <div className="absolute left-0 right-0 text-center text-red-500 pt-4">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default SignIn;
