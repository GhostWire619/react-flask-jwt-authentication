import React, { useState } from "react";
import { useAuth } from "./login-context";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    login(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <input
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        value={username}
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        value={password}
      />
      <button onClick={handleLogin} type="submit">
        Login
      </button>
    </div>
  );
}
