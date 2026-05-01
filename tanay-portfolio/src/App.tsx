import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// No more CharacterModel — removed for perf & stability
import MainContainer from "./components/MainContainer";
const CertificationsPage = lazy(() => import("./pages/CertificationsPage"));
const BeyondCodePage = lazy(() => import("./pages/BeyondCodePage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));

import { LoadingProvider } from "./context/LoadingProvider";
import { SectionProvider } from "./context/SectionContext";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <LoadingProvider>
      <SectionProvider>
        <BrowserRouter>
          <ErrorBoundary
            fallback={
              <div style={{ color: "white", padding: 50, zIndex: 9999, position: "absolute" }}>
                <h1>Something went wrong</h1>
                <p>Please refresh the page.</p>
              </div>
            }
          >
            <Suspense fallback={<div style={{ background: "#050810", height: "100vh" }} />}>
              <Routes>
                <Route path="/" element={<MainContainer />} />
                <Route path="/certifications" element={<CertificationsPage />} />
                <Route path="/beyond-code" element={<BeyondCodePage />} />
                <Route path="/project/:id" element={<ProjectDetailPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </SectionProvider>
    </LoadingProvider>
  );
};

export default App;
