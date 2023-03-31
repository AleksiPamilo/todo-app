import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Todos = lazy(() => import("./sites/Todos"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Todos />} />
        </Routes>
      </Router>
    </Suspense>
  )
};

export default App;
