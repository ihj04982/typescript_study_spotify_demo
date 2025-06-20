import React, { Suspense, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import LoadingSpinner from "./common/components/LoadingSpinner";
import useExchangeToken from "./hooks/useExchangeToken";

const AppLayout = React.lazy(() => import("./layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage/components/SearchPage"));
const SearchWithKeywordPage = React.lazy(() => import("./pages/SearchPage/SearchWithKeywordPage"));
const PlaylistDetailPage = React.lazy(() => import("./pages/PlaylistPage/PlaylistDetailPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage/LoginPage"));
const LibraryPage = React.lazy(() => import("./pages/LibraryPage/LibraryPage"));

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");
  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
    }
  }, [code, codeVerifier, exchangeToken]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="search/:keyword" element={<SearchWithKeywordPage />} />
          <Route path="playlist/:id" element={<PlaylistDetailPage />} />
          <Route path="library" element={<LibraryPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
