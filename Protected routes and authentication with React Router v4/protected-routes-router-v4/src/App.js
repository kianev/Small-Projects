import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'

const fakeAuth = {
  isAuthenticated: false,
  authenticate(callback){
    this.isAuthenticated = true
    setTimeout(callback, 100) // fake async
  },
  signout(callback){
    this.isAuthenticated = false
    setTimeout(callback, 100)
  }
}

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
      pathname: '/login',
      state: { from: props.location }
    }}/>
  )}
  />
)

class Login extends React.Component {
  state = {
    redirectToReffer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReffer: true
      }))
    })
  }

  render () {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReffer } = this.state
    if(redirectToReffer === true){
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div>
        <p>You must login to view this page at {from.pathName}!</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated === true
    ? <p>
        Welcome <button onClick={() => {
          fakeAuth.signout(() => history.push("/"))
  }}>Sign Out</button>
      </p>
    : <p>You are not logged in!</p>
))

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <AuthButton />
          <ul>
            <li><Link to="/public">Public Page</Link></li>
            <li><Link to="/protected">Protected Page</Link></li>
          </ul>

          <Route path="/public" component={Public}/>
          <Route path="/login" component={Login}/>
          <PrivateRoute path="/protected" component={Protected}/>
        </div>
      </Router>
    )
  }
}

export default App
