import "./Form.scss";
import email from "./email.svg";
import password from "./password.svg";
export default function Form({
  handleSubmit,
  error,
  submitMessage = "Submit",
  loading,
}) {
  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      {error && error.email && <p className="error">{error.email}</p>}
      <div className="group">
        <input type="email" id="email" name="email" placeholder="Email" />
        <img src={email} alt="" />
      </div>
      {error && error.password && <p className="error">{error.password}</p>}
      <div className="group">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <img src={password} alt="" />
      </div>

      <button type="submit" className="button primary">
        {loading ? "..." : submitMessage}
      </button>
    </form>
  );
}
