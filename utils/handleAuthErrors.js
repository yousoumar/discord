const handleAuthErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }

  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
    return errors;
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
    return errors;
  }

  if (err.message === "incorrect current password") {
    errors.password = "Incorrect current password";
    return errors;
  }

  return { message: err.message };
};
module.exports = handleAuthErrors;
