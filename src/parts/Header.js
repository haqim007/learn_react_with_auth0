import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

class Header extends Component{
    state = {
        Posts: [{ id: 1 }, { id: 2 }, { id: 3 }]
    }
    render(){
        return (
            <div>
                <Link to="/" style={{ padding: "0 5px" }}>Main</Link>
                <Link to="/privateroute" style={{ padding: "0 5px" }}>Private Route</Link>
                {this.state.Posts.map((val, id) =>
                    <Link key={id} to={{ pathname: '/component/' + val.id }} style={{ padding: "0 5px" }}>
                        Component {val.id}
                    </Link>
                )}
                <Link to="/profile" style={{ padding: "0 5px" }}>Profile</Link>
                {   
                    !this.props.is_authenticated ?
                        <button onClick={() => this.props.auth.login()}>Login</button> :
                        <button onClick={() => this.props.auth.logout()}>Logout</button>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        is_authenticated: state.auth_reducer.is_authenticated
    }
}



export default connect(mapStateToProps)(Header);
