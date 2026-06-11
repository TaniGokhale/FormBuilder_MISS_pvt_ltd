import { BrowserRouter, Routes, Route } from "react-router-dom";

import Builder from "./pages/Builder";
import Form from "./pages/Form";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/form/:id" element={<Form />} />
        <Route path="/analytics/:id" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;