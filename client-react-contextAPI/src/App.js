import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './stylesheet/styles.css';
import { Home } from './components/Home';
import { Adduser } from './components/Adduser';
import { Editemployee } from './components/Edituser';


import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/add" component={Adduser} exact />
        <Route path="/edit/:id" component={Editemployee} exact />
      </Switch>
    </GlobalProvider>
  );
}

export default App;
