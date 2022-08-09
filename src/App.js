import { faBook,faPlus, faSearch, faArrowsUpDownLeftRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import BookList from "./components/BookList";
import Create from "./components/Create";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Protected from "./components/Protected";
import Search from "./components/Search";
import Update from "./components/Update";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/list">React LMS</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/list"><FontAwesomeIcon icon={faBook} /> Books</Nav.Link>
              <Nav.Link as={Link} to="/create"><FontAwesomeIcon icon={faPlus} />Create</Nav.Link>
              <Nav.Link as={Link} to="/search"><FontAwesomeIcon icon={faSearch} />Search</Nav.Link>
              {localStorage.getItem('login') ? 
              <Nav.Link as={Link} to="/logout"><FontAwesomeIcon icon={faArrowsUpDownLeftRight} />Logout</Nav.Link>:
              <Nav.Link as={Link} to="/login"><FontAwesomeIcon icon={faArrowsUpDownLeftRight} />Login</Nav.Link>
              }
              
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/list" element={<Protected Component={BookList}  />} />
          <Route path="/create" element={<Protected Component={Create} />} />
          <Route path="/search" element={<Protected Component={Search} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/update/:id" element={<Protected Component={Update} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
