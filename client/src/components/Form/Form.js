import "./Form.scss";
export default function Form({ handleSubmit, error }) {
  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <div className="group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        {error && error.email && <p className="error">{error.email}</p>}
      </div>
      <div className="group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        {error && error.password && <p className="error">{error.password}</p>}
      </div>
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
}
