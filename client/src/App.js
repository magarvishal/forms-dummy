import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import NewForm from "./components/NewForm";
import store from "./redux/store";
import { Provider } from "react-redux";
import EditForm from "./components/EditForm";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/newForm" component={NewForm}></Route>
          <Route exact path="/forms/:id" component={EditForm}></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
