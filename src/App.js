import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/signup" element={<h1>signup</h1>} />
          <Route path="/signin" element={() => {}} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
