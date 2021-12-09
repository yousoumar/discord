const handleChannelErrors = (err) => {
  if (err.code === 11000) {
    return { message: "That channel is already registered" };
  }

  if (err.message.includes("channel validation failed")) {
    let errors = {};
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }

  return { message: err.message };
};
module.exports = handleChannelErrors;
