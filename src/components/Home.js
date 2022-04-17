// src/components/Home.js
// The Home component is used to demonstrate the use of Link.

import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {NavLink} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
    
           <div>
              <br></br><br></br>
              <h1>Bank of React</h1>
              <br></br><br></br>
              <br></br><br></br>
                <div class="container">
                  <span class="react-logo">
			            <span class="nucleo"></span>
		              </span>
                </div>

                <br></br><br></br><br></br><br></br>
                <br></br><br></br><br></br><br></br>
            <div>
            <NavLink to="/userProfile" style={{color: "#ffe54c"}}>UserProfile</NavLink>
                <br/>
                <NavLink to="/login" style={{color: "#ffe54c"}}>Login</NavLink>
                <br/>
                <NavLink to="/credits" style={{color: "#ffe54c"}}>Credits</NavLink>
                <br/>
                <NavLink to="/debits" style={{color: "#ffe54c"}}>Debits</NavLink>
            </div>
            <br></br>
                <AccountBalance accountBalance={this.props.accountBalance}/>
            </div>
    );
  }
}

export default Home;