import './index.css'
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Footer from './components/Footer';
import { TasksProvider } from './context/Tasks/TasksContext';
import { UserProvider } from './context/Users/UserContext';

function App() {
  return (
    <>
      <UserProvider>
        <TasksProvider>
          <Router>
            <Navbar />
            <div className='container'>
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/Register' element={<Register />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
                <Route path='/login' element={<Login />}></Route>
              </Routes>
            </div>
            <Footer />
        </Router>
        </TasksProvider>
      </UserProvider>
    </>
  );
}

export default App;
