import { Link } from "react-router-dom";
import logo from "../assets/marvel-logo.svg";
import heart from "../assets/heart.svg";
import "./Navbar.scss";
import { useContext } from "react";
import {
  FavoritesContext,
  type FavoritesContextType,
} from "@/context/FavoritesContext";

function Navbar() {
  const context = useContext<FavoritesContextType | undefined>(
    FavoritesContext
  );

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Marvel brand logo" />
      </Link>

      <div>
        <Link to="/favorites" className="navbar__favorites">
          <img src={heart} alt="Heart icon" />
          {context && context.favoriteCharacterIds?.length > 0 && (
            <span data-testid="favorite-count">
              {context.favoriteCharacterIds.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
