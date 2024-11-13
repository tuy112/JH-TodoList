import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Subpage from './pages/Subpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sub" element={<Subpage />} />
      </Routes>
    </Router>
  );
}

export default App;