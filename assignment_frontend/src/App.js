import './App.css';

import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './AppRoutes';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App