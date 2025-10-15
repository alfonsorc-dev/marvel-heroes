import { Link } from "react-router-dom";
import logo from "@/assets/marvel-logo.svg";
import heartIcon from "@/assets/heart.svg";
import "./Navbar.scss";
import useGetFavorites from "@/context/FavoritesContext";

function Navbar() {
  const { favoriteIds } = useGetFavorites();

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Marvel brand logo" />
      </Link>

      <div>
        <Link to="/favorites" className="navbar__favorites">
          <img src={heartIcon} alt="Heart icon" />
          {favoriteIds?.length > 0 && (
            <span data-testid="favorite-count">{favoriteIds.length}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
