import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favorites from "@/pages/favorites/Favorites";
import Details from "@/pages/Details";
import "./App.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoritesContextProvider } from "@/context/FavoritesContextProvider";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/home/Home";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="details/:id" element={<Details />} />
            </Route>
          </Routes>
        </Router>
      </FavoritesContextProvider>
    </QueryClientProvider>
  );
}

export default App;
