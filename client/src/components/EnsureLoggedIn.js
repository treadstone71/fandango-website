import React from 'react';

import { connect } from 'react-redux';
import { apiActions } from '../apiActions';
import { Redirect, withRouter }  from 'react-router-dom';
import { history } from '../_helpers/history';

class EnsureLoggedIn extends React.Component {

	componentDidMount() {
	    const { dispatch, authentication } = this.props;
	    dispatch(apiActions.isLoggedIn());
	}

	render() {

		const { loggedIn } = this.props.authentication;
		let children = this.props.children;
		let pathname = window.location.pathname;
		console.log("EnsureLoggedIn ", loggedIn);
	    if (loggedIn) {
	    	console.log("returning home", window.location.pathname)
	    	return children;
	    } else if(loggedIn == false && pathname!="/userlogin" && pathname!="/adminlogin" && pathname!="/madminlogin" && pathname!="/signup"){
	    	console.log("REturnning login");
	    	return (
	    		<Redirect to="/userlogin"/>
	    	);
	    } else{
	    	console.log("returnnng null");
		    return (
		      	null
		    );
	    }
	}
}

function mapStateToProps(state) {
    const { authentication } = state;
    return {
        authentication
    };
}

const EnsureLoggedInContainer = connect(mapStateToProps)(EnsureLoggedIn);
export default withRouter(EnsureLoggedInContainer);