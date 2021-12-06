const handleChannelErrors = (err) => {
  if (err.code === 11000) {
    return { error: "that channel is already registered" };
  }

  if (err.message.includes("user validation failed")) {
    let errors = {};
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }

  return { message: err.message };
};
module.exports = handleChannelErrors;
