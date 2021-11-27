// import logo from './logo.svg';
// import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Header from "./components/Header";
import Detail from "./pages/detail/Detail";



function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/weathers/:productId" component={Detail} />
        </Switch>
      </div>
   
    </Router>
  );
}

export default App;
