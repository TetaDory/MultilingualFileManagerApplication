import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import FileUpload from './components/FileUpload';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Multilingual File Manager</h1>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/upload" component={FileUpload} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
