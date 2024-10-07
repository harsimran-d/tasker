"use client";

import { useState } from "react";

import { signUp } from "@/actions/auth";
import { useRouter } from "next/navigation";
export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState({ username: [], password: [] });
  const router = useRouter();
  const handleSignup = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setFormErrors({ username: [], password: [] });
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        throw new Error(
          JSON.stringify({ password: ["Passwords do not match."] }),
        );
      }
      const success = await signUp(username, password);
      if (success) {
        router.push("/api/auth/signin?callbackUrl=http://localhost:3000/");
      }
    } catch (error: any) {
      const parsedError = JSON.parse(error.message);
      setFormErrors(parsedError);
      setError("Signup failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup} aria-live="polite">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Name"
          required
          aria-describedby="name-error"
        />
        {formErrors.username && (
          <p id="name-error" style={{ color: "red" }}>
            {formErrors.username.join(", ")}
          </p>
        )}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          aria-describedby="password-error"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Password"
          required
          aria-describedby="password-error"
        />
        {formErrors.password && (
          <p id="password-error" style={{ color: "red" }}>
            {formErrors.password.join(", ")}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
      {error && (
        <p id="signup-error" style={{ color: "red" }}>
          {error}
        </p>
      )}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
