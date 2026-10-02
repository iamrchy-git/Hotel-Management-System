import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const roles = ["admin", "guest", "manager"];

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roles: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3900/api/auth/register",
        formData,
        { timeout: 5000 },
      );

      const { accessToken, refreshToken, user } = res.data.data as {
        accessToken: string;
        refreshToken: string;
        user: object;
      };

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(res.data.message || "Registration successful");
      navigate("/login");
    } catch (err: unknown) {
      console.error("Register error:", err);

      const message = axios.isAxiosError(err)
        ? err.response?.data?.message ||
          "Registration failed. Please try again."
        : "Registration failed. Please try again.";

      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Background */}
      <div className="auth-blob auth-blob--top" />
      <div className="auth-blob auth-blob--bottom" />

      <div className="auth-card">
        {/* Logo */}
        <div
          style={{
            width: "58px",
            height: "58px",
            margin: "0 auto 18px",
            borderRadius: "18px",
            background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 25px rgba(37, 99, 235, 0.25)",
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 5 6.5 5c2 0 3.5 1.2 4.5 2.5C12 6.2 13.5 5 15.5 5 19 5 21.5 8.5 21.5 12.5 19 16.65 12 21 12 21z" />
            <path d="M12 8v7" />
            <path d="M8.5 11.5h7" />
          </svg>
        </div>

        <h1 className="auth-title text-center">Create an account</h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "14px",
            marginTop: "-8px",
            marginBottom: "26px",
          }}
        >
          Create your account to access the system
        </p>

        {/* Error */}
        {error && (
          <div
            className="auth-error"
            role="alert"
            style={{
              borderRadius: "12px",
              padding: "12px 14px",
              marginBottom: "18px",
              fontSize: "13px",
            }}
          >
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="auth-field">
            <label htmlFor="reg-name" className="auth-label">
              Full Name
            </label>

            <div className="auth-input-wrapper">
              <span className="auth-input-icon">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              <input
                id="reg-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="auth-input"
              />
            </div>
          </div>

          {/* Email */}
          <div className="auth-field">
            <label htmlFor="reg-email" className="auth-label">
              Email address
            </label>

            <div className="auth-input-wrapper">
              <span className="auth-input-icon">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>

              <input
                id="reg-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="auth-input"
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <label htmlFor="reg-password" className="auth-label">
              Password
            </label>

            <div className="auth-input-wrapper">
              <span className="auth-input-icon">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              <input
                id="reg-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="auth-input"
              />

              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Role */}
          <div className="auth-field">
            <label htmlFor="reg-role" className="auth-label">
              Register as
            </label>

            <div className="auth-input-wrapper auth-select-wrapper">
              <span className="auth-input-icon">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </span>

              <select
                id="reg-role"
                name="roles"
                required
                value={formData.roles}
                onChange={handleChange}
                className="auth-input auth-select"
              >
                <option value="" disabled>
                  Choose your role…
                </option>

                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </option>
                ))}
              </select>

              <span className="auth-select-arrow">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="register-submit-btn"
            className="auth-btn"
            disabled={loading}
          >
            <span>{loading ? "Creating Account..." : "Create Account"}</span>

            {!loading && (
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="auth-btn-icon"
              >
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
            )}
          </button>
        </form>

        {/* Switch to Login */}
        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login" className="auth-switch-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
