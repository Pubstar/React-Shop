import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Row from 'react-bootstrap/Row';
import {Route, Routes, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import Cart from './components/Cart';

function App() {

  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a class="navbar-brand" href="#">Navbar</a>
      <div class="navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
          <Link to="/" class="nav-link" href="#">Home</Link>
          </li>
          <li class="nav-item">
            <Link to="/cart" class="nav-link" href="#">Shopping cart</Link>
          </li>
        </ul>
      </div>
    </nav>
    <div className='container'>
      <Row className='d-flex justify-content-center'>
        <Routes>
          <Route path="/" element={<Homepage />}>
          </Route>
          <Route path="/cart" element={<Cart />}>
          </Route>
        </Routes>
      </Row>
    </div>
    </>
  )
}

export default App
