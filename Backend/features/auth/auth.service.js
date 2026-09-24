import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../users/user.model.js";

// Register Service
export const registerService = async ({ name, email, password, roles }) => {
  if (!name || !email || !password) {
    throw {
      status: 400,
      message: "Name, email, and password are required",
    };
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw {
      status: 400,
      message: "Email is already registered",
    };
  }

  if (password.length < 8) {
    throw {
      status: 400,
      message: "Password must be at least 8 characters",
    };
  }

  const allowedRoles = [
    "admin",
    "guest",
    "receptionist",
    "housekeeping",
    "manager",
  ];
  if (roles && !allowedRoles.includes(roles)) {
    throw {
      status: 400,
      message: "Invalid role provided",
    };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
    roles: roles || "guest",
  });

  const accessToken = jwt.sign(
    {
      id: user.id,
      roles: user.roles,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN },
  );

  const userData = user.toJSON();
  delete userData.password;

  return {
    accessToken,
    refreshToken,
    user: userData,
  };
};

// Login Service
export const loginService = async ({ email, password }) => {
  if (!email || !password) {
    throw {
      status: 400,
      message: "Email and password are required",
    };
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw {
      status: 404,
      message: "Invalid email or password",
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw {
      status: 401,
      message: "Invalid email or password",
    };
  }

  const accessToken = jwt.sign(
    { id: user.id, roles: user.roles },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN },
  );

  const userData = user.toJSON();
  delete userData.password;

  return {
    accessToken,
    refreshToken,
    user: userData,
  };
};
