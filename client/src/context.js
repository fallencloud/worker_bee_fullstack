import React, { Component } from 'react';
import axios from 'axios';
//create context
const Context = React.createContext();

//Add reducer to manipulate state
const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter(
          employee => employee.id === action.payload
        )
      };
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        employees: [action.payload, ...state.employees]
      };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map(employee =>
          employee.id === action.payload.id
            ? (employee = action.payload)
            : employee
        )
      };
    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter(employee =>
          employee.id !== action.payload ? employee : null
        )
      };
    default:
      return state;
  }
};

//create Provider
export class Provider extends Component {
  //create state
  state = {
    employees: [],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    },
    getEmployee: this.getEmployee
  };

  getEmployee = id => {
    const emp = this.state.employees.filter(employee => employee.id === id);
    console.log(emp);
    return emp;
  };

  //CRUD: Read data from API
  async componentDidMount() {
    //get data from db
    const res = await axios.get('/api/users');

    //write data to state
    this.setState({
      employees: res.data
    });
  }

  //Ensures app refreshes after state changes
  async componentDidUpdate() {
    //get data from db
    const res = await axios.get('/api/users');

    //write data to state
    this.setState({
      employees: res.data
    });
  }

  //external provider
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

//export consumer
export const Consumer = Context.Consumer;
