import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import Provider
import { Provider } from './context';

//components
import Header from './components/layout/Header';
import Employees from './components/employees/Employees';
import AddEmployee from './components/employees/AddEmployee';
import EditEmployee from './components/employees/EditEmployee';

//pages
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//jquery
import jquery from 'jquery';
import popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router basename={process.env.PUBLIC_URL}>
          <div className='App'>
            <Header />
            <Switch>
              <Route exact path='/' component={Employees} />
              <Route exact path='/about' component={About} />
              <Route exact path='/add-employee' component={AddEmployee} />
              <Route exact path='/edit-employee/:id' component={EditEmployee} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
