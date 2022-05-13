import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { userInputs } from "./form-db";

//pages and componentes imported
import MainPage from "./pages/landing-page/index"; // -> index page
import StudentHome from "./pages/home/studentHome/StudentHome"; //student-dashboard
import Home from "./pages/home/Home"; // -> index page of evaluator and registrar
import Login from "./pages/login/Login"; // -> student login
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import EvaluatorGrid from "./pages/evaluator/EvaluatorGrid";
// faqs page for student
import Faqs from "./pages/faqs/Faqs";
import Settings from "./pages/settings/Settings";
// main forum page
import Forums from "./pages/forums/Forums";
// subpages for forum section - eval and registrar
import CompletedReps from "./components/forums/completed-reports/CompletedReps";
import UnresolvedReps from "./components/forums/unresolved-reports/UnresolvedReps";
import Assigned from "./components/forums/assigned-reports/Assigned";
import Signup from "./pages/register/Signup";
import SingleView from "./pages/forums/singleView/SingleView";
import Report from "./pages/addPost/Report";
//for dark mode
import "./mode/darkMode.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<MainPage />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="student-dashboard" element={<StudentHome />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="evaluators">
              <Route index element={<EvaluatorGrid />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New Evaluator" />}
              />
            </Route>
            <Route path="forums">
              <Route index element={<Forums />} />
              <Route path="keyword/:keyword" element={<Forums />} />
              <Route path=":forumId" element={<SingleView />} />
              <Route path="add-post" element={<Report />} />
              <Route path="assigned-reports" element={<Assigned />} />
              <Route path="completed-reports" element={<CompletedReps />} />
              <Route path="unresolved-reports" element={<UnresolvedReps />} />
            </Route>
            <Route path="faqs">
              <Route index element={<Faqs />} />
            </Route>
            <Route path="settings">
              <Route index element={<Settings />} />
            </Route>
            <Route path="logout" />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
