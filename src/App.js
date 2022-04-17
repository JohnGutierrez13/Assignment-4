// src/App.js
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debits from './components/Debits';
import Credits from './components/Credits';

import axios from 'axios';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0.0,
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '07/23/96',
      },
      debits : [],
      credits :[]
    }
    
    
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    newUser.memberSince = new Date().toLocaleString()
    this.setState({currentUser: newUser})
  }
  clearInputFields= (e)=>{
    e.target.amount.value = ""
    e.target.description.value = ""
  }
  addDebit=(e)=>
  {
    e.preventDefault()
    this.setState({accountBalance : this.state.accountBalance - parseFloat(e.target.amount.value)})
    
    let debitId = this.state.debits.length+1
    let date = new Date().toLocaleString()
    let desc = e.target.description.value
    let amount = e.target.amount.value

    this.setState({debits:[{id: debitId, description: desc, amount: amount, date: date}, ...this.state.debits]})
    this.clearInputFields(e)
  }

  addCredit=(e)=>
  {
    e.preventDefault()
    this.setState({accountBalance : this.state.accountBalance + parseFloat(e.target.amount.value)})
    
    let creditId = this.state.credits.length+1
    let date = new Date().toLocaleString()
    let desc = e.target.description.value
    let amount = e.target.amount.value

    this.setState({credits:[{id: creditId, description: desc, amount: amount, date: date}, ...this.state.credits]})
    this.clearInputFields(e)
  }


  processDebit(debit)
  {
    let totalDebit = 0
    debit.forEach(element =>{
      totalDebit+= element.amount
    })
    this.setState({accountBalance: this.state.accountBalance - totalDebit})
  }

  processCredit(credit)
  {
    let totalCredit = 0.0
    credit.forEach(element =>{
      totalCredit+= element.amount
    })
    this.setState({accountBalance: this.state.accountBalance + totalCredit})
  }

  fetchAndStoreDebitData =async ()=> {
    try {
      const result = await axios.get("https://moj-api.herokuapp.com/debits")
      this.setState({debits: result.data})

      this.processDebit(result.data)      
      return result.data;

    } catch (error) {
      console.error(error);
    }
  }

  fetchAndStoreCreditData =async ()=> {
    try {
      const result = await axios.get("https://moj-api.herokuapp.com/credits")
      this.setState({credits: result.data})
      
      this.processCredit(result.data)      
      return result.data;

    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount()
  { 
    try{
      await this.fetchAndStoreDebitData() 
      await this.fetchAndStoreCreditData()
    }
    catch(error)
    {
      console.error(error);
    }
  }
  // Create Routes and React elements to be rendered using React components
  render() {  
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>)
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    )
    
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)  // Pass props to "LogIn" component
    const CreditComponent = ()=> (<Credits data = {this.state.credits} addCredit= {this.addCredit}></Credits>)
    
    const DebitComponent = () =>(<Debits data = {this.state.debits} addDebit= {this.addDebit}></Debits>) 
    
    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/credits" render={CreditComponent}/>
            <Route exact path="/debits" render={DebitComponent}/>
          </div>
        </Router>
    );
  }
}

export default App;