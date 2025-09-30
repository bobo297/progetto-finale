import React, { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/check", {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(`${email}:${password}`)}`,
        },
      });

      if (!response.ok) {
        throw new Error("Invalid Credentials");
      }

      const data = await response.json();
      const role = data.role || "user";

      localStorage.setItem("basicAuthToken", btoa(`${email}:${password}`));
      localStorage.setItem("userRole", role);

      onLogin(role);
    } catch (err) {
      setError(err.message || "Error during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#E0E0E0" }}
    >
      <div
        className="shadow-sm p-5"
        style={{
          maxWidth: "480px",
          width: "100%",
          borderRadius: "20px",
          backgroundColor: "#FFFFFF",
          // Removed red border here
          border: "none",
        }}
      >
        <h3
          className="mb-5 text-center fw-bold"
          style={{ color: "#264653", fontSize: "2.2rem" }}
        >
          Login
        </h3>

        {error && (
          <div
            className="alert py-3"
            role="alert"
            style={{
              backgroundColor: "#F0F0F0", // light neutral background instead of red
              color: "#b00020", // dark red text for error message
              borderRadius: "8px",
              border: "1px solid #b00020", // subtle dark red border
              fontWeight: "700",
              fontSize: "1.1rem",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="form-label fw-semibold"
              style={{ color: "#264653", fontSize: "1.1rem" }}
            >
              Username / Email
            </label>
            <input
              type="text"
              id="email"
              className="form-control"
              placeholder="Insert username or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              autoComplete="username"
              style={{
                borderColor: "#ccc", // neutral gray border
                backgroundColor: "#FFFFFF",
                color: "#264653",
                borderRadius: "12px",
                fontSize: "1.1rem",
                padding: "12px",
              }}
            />
            <small
              style={{ color: "#264653", opacity: 0.6, fontSize: "0.9rem" }}
            >
              Insert username or email to access.
            </small>
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="form-label fw-semibold"
              style={{ color: "#264653", fontSize: "1.1rem" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Insert password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              autoComplete="current-password"
              style={{
                borderColor: "#ccc", // neutral gray border
                backgroundColor: "#FFFFFF",
                color: "#264653",
                borderRadius: "12px",
                fontSize: "1.1rem",
                padding: "12px",
              }}
            />
            <small
              style={{ color: "#264653", opacity: 0.6, fontSize: "0.9rem" }}
            >
              Password must be kept secret.
            </small>
          </div>

          <button
            type="submit"
            className="fw-semibold"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#1E40AF",
              border: "none",
              color: "rgba(255, 255, 255, 1)",
              padding: "14px",
              fontSize: "1.3rem",
              borderRadius: "12px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              !loading && (e.currentTarget.style.backgroundColor = "#1E40AF")
            }
            onMouseLeave={(e) =>
              !loading && (e.currentTarget.style.backgroundColor = "#1E40AF")
            }
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                  style={{
                    borderColor: "#A7FFEB transparent #A7FFEB transparent",
                  }}
                />
                Access in progress...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
