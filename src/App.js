// import logo from './logo.svg';
// import "./App.css";
import React ,{useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Header from "./components/Header";
import Detail from "./pages/detail/Detail";




function App() {

  const [them,setThem] = useState(false)

  const handelThem = () => {
    setThem(!them)
  }

  console.log(them)
  return (
    <Router>
      <div className={!them ? 'App': 'App white_theme'}>
        <Header handelThem={handelThem} them={them} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/weathers/:productId" component={Detail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
