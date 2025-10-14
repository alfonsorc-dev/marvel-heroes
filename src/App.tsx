import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Favorites from "./Favorites";
import Details from "./Details";
import "./App.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navbar from "@/components/Navbar";
import { FavoritesContextProvider } from "./context/FavoritesContextProvider";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </Router>
      </FavoritesContextProvider>
    </QueryClientProvider>
  );
}

export default App;
