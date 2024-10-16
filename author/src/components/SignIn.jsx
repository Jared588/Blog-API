import { useState } from "react";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-full content-center">
      <div className="rounded-xl w-80 m-auto p-6 py-10 mb-28">
        <h1 className="text-center text-5xl pb-10 font-semibold">Sign in</h1>
        <form
          className="flex flex-col flex-grow gap-2"
          action="POST"
          method="post"
        >
          <label className="text-indigo-500" htmlFor="username">
            Username
          </label>
          <input
            className="bg-inherit border rounded-xl px-3 py-1"
            id="username"
            type="text"
          />
          <label className="text-indigo-500" htmlFor="password">
            Password
          </label>
          <input
            className="bg-inherit border rounded-xl px-3 py-1"
            id="password"
            type="password"
          />

          <button
            className="border rounded-xl w-1/2 mx-auto mt-5 p-1 bg-indigo-500 bg-opacity-20"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
