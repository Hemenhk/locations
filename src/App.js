import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import SignUpForm from "./pages/auth/SignUpForm";
import "./api/axiosDefaults";
import SignInForm from "./pages/auth/SignInForm";
import CreatePostForm from "./pages/posts/CreatePostForm";
import PostDetailPage from "./pages/posts/PostDetailPage";



function App() {
  

  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Routes>
              <Route path="/" element={<h1>Home</h1>} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/signin" element={<SignInForm />} />
              <Route path="/posts/create" element={<CreatePostForm />} />
              <Route path="/posts/:id" element={<PostDetailPage />} />
            </Routes>
          </Container>
        </div>
      
  );
}

export default App;
