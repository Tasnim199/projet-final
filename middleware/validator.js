import { check, validationResult } from "express-validator";

// rules for register
export const validateRegister = () => {
  return [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "password must be at least 8 characters and your password should be have at least upper, lower, num, symbol"
    ).isStrongPassword(),
  ];
};

// rules for login
export const validateLogin = () => {
    return [
      check("email", "Please enter a valid email").isEmail(),
      check(
        "password",
        "password must be at least 8 characters and your password should be have at least upper, lower, num, symbol"
      ).isStrongPassword(),
    ];
  };

// function for handle errors from validator
export const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length>0) { //false
    
    return res
      .status(400)
      .json({  errors : errors.array().map((error)=>error.msg) });
  }
  next();
  
};