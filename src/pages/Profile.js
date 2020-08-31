import React, { Component } from 'react';
import {connect} from 'react-redux'

class Profile extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.dataProfile === null
                    ? 'loading ...' 
                    : (typeof (this.props.dataProfile.profile.nickname) !== undefined && this.props.dataProfile.profile.nickname)}</h1>
                <br/>
                {this.props.dataProfile !== null
                    ? (typeof (this.props.dataProfile.profile.picture) !== undefined && <img src={this.props.dataProfile.profile.picture} alt=""/>) 
                : 'loading...'}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    dataProfile: state.auth_reducer.profile
})

export default connect(mapStateToProps)(Profile);