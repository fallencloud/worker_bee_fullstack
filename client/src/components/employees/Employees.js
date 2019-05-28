import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../context';
import Employee from './Employee';

class Employees extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { employees } = value;
          return (
            <div className='dashboard'>
              <div className='container'>
                <div className='row'>
                  <div className='col-lg-12'>
                    {/*<!-- Dashboard Actions -->*/}
                    <button type='button' className='btn btn-link mb-4'>
                      <i className='fas fa-user-circle text-info mr-1' />
                      <Link to='/add-employee'>Add Employee</Link>
                    </button>

                    {/*<!-- Employees -->*/}
                    <div>
                      <h4 className='mb-2'>Employee Directory</h4>
                      <table className='table'>
                        <tbody>
                          {employees.map(employee => (
                            <Employee key={employee._id} employee={employee} />
                          ))}
                        </tbody>
                      </table>
                    </div>
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

export default Employees;
