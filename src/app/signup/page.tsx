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
  const [formErrors, setFormErrors] = useState({
    username: [""],
    password: [""],
  });
  const router = useRouter();
  const handleSignup = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setFormErrors({ username: [], password: [] });
    setLoading(true);

    if (password !== confirmPassword) {
      setFormErrors({ ...formErrors, password: ["Passwords do not match."] });
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    try {
      const result = await signUp(username, password);
      if (result.success) {
        setSuccess(result.message ?? "Signup successful");
        router.push("/api/auth/signin?callbackUrl=/dashboard");
      } else {
        setError(result.message || "Signup failed.");
      }
    } catch (error: any) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSignup}
        aria-live="polite"
        className="mt-4 flex flex-col items-center justify-center space-y-3"
      >
        <h1 className="text-2xl">Create Account</h1>
        <input
          className="input-base"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          aria-describedby="name-error"
        />
        {formErrors.username.length == 0 ? (
          <p id="name-error" style={{ color: "red" }}>
            {formErrors.username.join(",")}
          </p>
        ) : (
          ""
        )}

        <input
          className="input-base"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          aria-describedby="password-error"
        />
        <input
          className="input-base"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="ConfirmPassword"
          required
          aria-describedby="password-error"
        />
        {formErrors.password && (
          <p id="password-error" style={{ color: "red" }}>
            {formErrors.password.join(", ")}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-32 rounded-lg bg-blue-500 py-2 text-white"
        >
          {loading ? "Signing up..." : "Sign Up"}
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
