import './index.css'
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { TasksProvider } from './components/context/context/TasksContext';

function App() {
  return (
    <>
      <TasksProvider>
        <Router>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />}></Route>
            </Routes>
            
          </div>
      </Router>
      </TasksProvider>
    </>
  );
}

export default App;
