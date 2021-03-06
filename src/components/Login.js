// src/components/Login.js
// The LogIn component is used to demonstrate the use of Redirect.

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {NavLink} from 'react-router-dom';

class LogIn extends Component {
  constructor () {  // Create and initialize state
    super()
    this.state = {
      user: {
        userName: '',
        password: ''
      },
      redirect: false
    }
  }

  // When the user name input is changed, capture the input and update the state (user.userName)
  handleChange = (e) => {
    const updatedUser = {...this.state.user}
    const inputField = e.target.name
    const inputValue = e.target.value
    updatedUser[inputField] = inputValue

    this.setState({user: updatedUser})
  }

  // When user clicked "Log In" button, store user data and then redirect to "User Profile" page
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.mockLogIn(this.state.user)
    this.setState({redirect: true})
  }
  
  render () {
    if (this.state.redirect) {  // Redirect to "User Profile" page when "Log In" button is clicked
      return (<Redirect to="/userProfile"/>)
    }
    // Render the login form
    return (
      <div>
        <br></br>
            <NavLink to="/" activeClassName="is-active" style={{color: "#ffe54c"}}>Return to Home</NavLink>
            <br></br><br></br>
        <h1>Login</h1>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor ="userName">User Name:</label>
            <input type="text" name="userName" style={{margin : "4px", display: 'inline-block'}} onChange={this.handleChange} value={this.state.user.userName} /><br></br>
            <label htmlFor="password">  Password: </label>
            <input type="password" name="password" style={{margin : "4px", display: 'inline-block'}} />
          </div>
          <br></br>
          <button class="logIn">Log In</button>
        </form>                  
      </div>
    )
  }
}

export default LogIn