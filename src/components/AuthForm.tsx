import React, { useState } from "react";

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        alert("Registered! Now login.");
        setIsRegister(false);
      } else {
        alert("Logged in!");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80 mx-auto">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {isRegister ? "Register" : "Login"}
      </button>
      <p
        className="text-sm text-center cursor-pointer text-blue-600"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister ? "Already have an account? Login" : "No account? Register"}
      </p>
    </form>
  );
};

export default AuthForm;
