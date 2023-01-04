import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='signup' element={() => {}}/>
        <Route path='signin' element={() => {}}/>
      </Routes>
    </div>
  );
}

export default App;
