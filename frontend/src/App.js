import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Archived from "./pages/Archived";
import Home from "./pages/Home";
import Header from "./components/nav/Header"
import EditNote from "./pages/EditNote";
import CreateNote from "./pages/CreateNote";
import Search from "./pages/Search";
import CreateCategory from "./pages/CreateCategory"

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/archived' component={Archived} />
        <Route exact path="/search" component={Search} />
        <Route path="/edit/:slug" component={EditNote} />
        <Route path="/create-note" component={CreateNote} />
        <Route path="/create-category" component={CreateCategory} />
        <Route path="/category/:slug" component={Search} />
      </Switch>
  </BrowserRouter>
  );
};

export default App;
