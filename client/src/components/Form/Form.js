import "./Form.scss";
export default function Form({ handleSubmit }) {
  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <div className="group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div className="group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
}
