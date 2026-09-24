import { registerService, loginService } from "./auth.service.js";

// POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { accessToken, refreshToken, user } = await registerService(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("Error in registerUser:", error);

    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { accessToken, refreshToken, user } = await loginService(req.body);
    //refresh token in cookie for security
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// POST /api/auth/logout
export const logoutUser = async (req, res) => {
  try {
    const { accessToken, refreshToken, user } = await loginService(req.body);
    res.clearCookie("refreshToken");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Logout failed" });
  }
};
