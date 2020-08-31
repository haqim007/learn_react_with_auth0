import React, { Component } from 'react'
import Header from 'parts/Header';
import Main from 'pages/Main'
import Part1 from "parts/Part1";
import { Router, Route, Switch, Redirect} from 'react-router'
import History from 'utils/History'
import Callback from 'pages/Callback'
import Auth from "utils/Auth";
import AuthCheck from 'utils/AuthCheck'
import UnauthRedirect from 'routes/UnauthRedirect';
import ProtectedRoutes from 'routes/ProtectedRoutes';
import * as ACTIONS from 'store/actions/action'
import { connect } from "react-redux";
import Profile from 'pages/Profile';


export const auth = new Auth();

const handleAuthentication = props => {
    if(props.location.hash){
        auth.handleAuth()
    }
}

const PrivateRoute = ({component: Component, auth}) => {
  return (
    <Route render={props => auth.isAuthenticated() === true ?
      <Component auth={auth} {...props} /> :
      <Redirect to={{ pathname: "/redirect" }} />
    } />
  )
}

class Routers extends Component {
  componentDidMount(){
    if (auth.isAuthenticated()) {
      this.props.login_success()
      setTimeout(() => {
        this.props.add_profile(auth.userProfile)
      }, 1500);
    } else {
      this.props.login_failure()
      this.props.remove_profile()
    }
  }
    render() {
        return (
          <>
            <Router history={History}>
              <Header auth={auth} />
              <Switch>
                <Route path="/" exact render={(props) => <Main {...props} auth={auth} />} />
                <Route path="/redirect" component={UnauthRedirect} />
                <Route path="/authcheck" render={(props) => <AuthCheck {...props} auth={auth} />} />

                <Route path="/callback" render={(props) => {handleAuthentication(props); return <Callback {...props} /> }} />
                <Route path="/component/:id" render={(props) => <Part1 {...props} title="Component" />} />

                <PrivateRoute path="/privateroute" auth={auth} component={ProtectedRoutes} />
                <PrivateRoute path="/profile" auth={auth} component={Profile} />
              </Switch>
            </Router>
          </>
        );
    }
}

const mapDispatchToProps = dispatch => {
  return {
    login_success: () => dispatch(ACTIONS.login_success()),
    login_failure: () => dispatch(ACTIONS.login_failure()),
    add_profile: (profile) => dispatch(ACTIONS.add_profile(profile)),
    remove_profile: () => dispatch(ACTIONS.remove_profile())
  }
}

export default connect(null, mapDispatchToProps)(Routers);
