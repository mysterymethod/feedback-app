import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FeedbackProvider } from "./components/context/FeedbackContext";

import "./App.css";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import About from "./pages/About";
import AboutIcon from "./components/AboutIcon";

function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <div className="container">
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                  <AboutIcon />
                </div>
              </>
            }
          ></Route>
          <Route path="/about" element={<About />} />{" "}
        </Routes>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
