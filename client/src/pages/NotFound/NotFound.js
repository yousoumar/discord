import { Link } from "react-router-dom";

import "./NotFound.scss";
export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Page not found, you seem to be lost.</h1>
      <Link className="button primary" to="/">
        Go back to home
      </Link>
    </main>
  );
}
