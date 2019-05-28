import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Consumer } from '../../context';

import TextInputGroup from '../layout/TextInputGroup';

class EditEmployee extends Component {
  //form state
  state = {
    name: '',
    email: '',
    phone: ''
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const res = await axios.get(`/api/users/${id}`);
    const employee = res.data;
    this.setState({
      name: employee.name,
      email: employee.email,
      phone: employee.phone
    });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    //get current input values from state
    const { name, email, phone } = this.state;

    //assign them to an object
    const edtEmployee = {
      name,
      email,
      phone
    };

    //get the ID from the url
    const { id } = this.props.match.params;

    //PUT the data on the server
    const res = await axios.put(`/api/users/${id}`, edtEmployee);

    //call dispatch
    dispatch({ type: 'UPDATE_EMPLOYEE', payload: res.data });

    //reset form
    this.setState({
      name: '',
      email: '',
      phone: ''
    });

    //return to dashboard
    this.props.history.push('/');
  };

  render() {
    const { name, email, phone } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          // const { id } = this.props.match.params;
          // let emp;
          // emp = employees.filter(employee => {
          //   if (employee.id == id) {
          //     return employee;
          //   }
          //   return;
          // });

          return (
            <div className='add-employee'>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-8 m-auto'>
                    <Link to='/' className='btn btn-light'>
                      Go Back
                    </Link>
                    <h1 className='display-4 text-center'>Edit Employee</h1>
                    <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                      <TextInputGroup
                        type='text'
                        name='name'
                        placeholder={name}
                        value={name}
                        onChange={this.onChange}
                      />
                      <TextInputGroup
                        type='text'
                        name='email'
                        placeholder={email}
                        value={email}
                        onChange={this.onChange}
                      />

                      <TextInputGroup
                        type='text'
                        name='phone'
                        placeholder={phone}
                        value={phone}
                        onChange={this.onChange}
                      />
                      <input
                        type='submit'
                        className='btn btn-info btn-block mt-4'
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditEmployee;
