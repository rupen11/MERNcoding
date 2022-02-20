import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/navcom';
import NoTeS from './components/notes';
import Playwithnotes from './components/playwithnotes';
import History from './components/history';
import Login from './components/login';
import SignUp from './components/signup';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>

        <Route exact path='/Notes'>
          <NoTeS />
        </Route>

        <Route exact path='/PlayWithNotes'>
          <Playwithnotes />
        </Route>

        <Route exact path='/History'>
          <History />
        </Route>

        <Route exact path='/Login'>
          <Login />
        </Route>

        <Route exact path='/Signup'>
          <SignUp />
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
