import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../context';
import axios from 'axios';

class Employee extends Component {
  onDeleteClick = async (id, dispatch) => {
    await axios.delete(`/api/users/${id}`);

    dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
  };

  render() {
    const { _id, name, email, phone } = this.props.employee;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <tr className='employee'>
              <td>
                <span className='font-weight-bold lead'>{name}</span>
                <div
                  className='btn-toolbar float-right'
                  role='toolbar'
                  aria-label='Toolbar with button groups'
                >
                  <div className='btn-group mr-2' role='group'>
                    <button
                      type='button'
                      className='btn btn-link mb-4'
                      style={{ cursor: 'pointer', float: 'right' }}
                      onClick={this.onDeleteClick.bind(this, _id, dispatch)}
                    >
                      <i className='far fa-trash-alt' />
                    </button>
                  </div>
                  <div className='btn-group mr-2' role='group'>
                    <button
                      type='button'
                      className='btn btn-link mb-4'
                      style={{ cursor: 'pointer', float: 'right' }}
                    >
                      <Link to={`/edit-employee/${_id}`}>
                        <i
                          className='far fa-edit btn-link'
                          style={{
                            cursor: 'pointer',
                            float: 'right'
                          }}
                        />
                      </Link>
                    </button>
                  </div>
                </div>
                <ul className='list-unstyled'>
                  <li>
                    <span className='lead'>Phone</span>: {phone}
                  </li>
                  <li>
                    <span className='lead'>Email</span>: {email}
                  </li>
                </ul>
              </td>
            </tr>
          );
        }}
      </Consumer>
    );
  }
}

export default Employee;
