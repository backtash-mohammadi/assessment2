import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <nav style={{ background: "#e9f6fa", padding: "1em", marginBottom: "2em" }}>
            <Link to="/" style={{ marginRight: 20 }}>🏠 Home</Link>
            <Link to="/addrecipe" style={{ marginRight: 20 }}>➕ Add Recipe</Link>

        </nav>
    );
}
