import React, {Component} from "react";
import { connect } from "react-redux";

// import * as ACTION_TYPES from 'store/actions/action_type'
import * as ACTIONS from 'store/actions/action'

class Main extends Component {
  render(){
    
    return (
      <div>
        
        <button onClick={() => console.log(this.props.userProfile)}>Get State</button>
        <button onClick={() => this.props.action1()}>Dispatch Action 1</button>
        <button onClick={() => this.props.action2()}>Dispatch Action 2</button>
        <button onClick={() => this.props.actionCreator1()}>Dispatch Action Creator 1</button>
        <button onClick={() => this.props.actionCreator2()}>Dispatch Action Creator 2</button>
        <button onClick={() => this.props.actionCreator3('hello')}>Dispatch Action Creator 3</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateProp1: state.rootReducer.stateProp1,
    inputText: state.form_reducer.input_text,
    userProfile: state.auth_reducer.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action1: () => dispatch(ACTIONS.SUCCESS),
    action2: () => dispatch(ACTIONS.FAILURE),
    actionCreator1: () => dispatch(ACTIONS.success()),
    actionCreator2: () => dispatch(ACTIONS.failure()),
    actionCreator3: (text) => dispatch(ACTIONS.input_text(text)),
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
