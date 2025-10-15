import { Link } from "react-router-dom";
import logo from "@/assets/marvel-logo.svg";
import heartIcon from "@/assets/heart.svg";
import "./Navbar.scss";
import useFavorites from "@/context/FavoritesContext";

function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Marvel brand logo" />
      </Link>

      <div>
        <Link to="/favorites" className="navbar__favorites">
          <img src={heartIcon} alt="Heart icon" />
          {favorites?.length > 0 && (
            <span data-testid="favorite-count">{favorites.length}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
