import React from "react";
import createHistory from 'history/createHashHistory'
import PropTypes from 'prop-types';
//import { login } from '../../actions/authActions';
import { login } from '../../actions/businessActions';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';


@connect(store => ({
 auth: store.auth.business
}))
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {},
			isLoading: false,
			errorMessage: {
				display: 'none'
			}
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}


	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}


	callLogin() {
			
		this.props.login(this.state).then(
			(res) => {this.props.auth.businessId!=undefined? createHistory().push('/owner-profile/'+this.props.auth.businessId):
			this.setState({ isLoading: false, errorMessage: { display: 'block' } })},
			(err) => this.setState({ isLoading: false, errorMessage: { display: 'block' } })
		);	
		this.props	
	}
	
	onSubmit(e) {
		e.preventDefault();
		this.setState({ errors: {}, isLoading: true });
		this.callLogin();
	}

	render() {
		const responseGoogle = (response) => {
			this.setState({ email: response.profileObj.email, password: response.profileObj.googleId });
			console.log(response.profileObj.email + " " + response.profileObj.googleId);
			this.callLogin();
		}
		const responseFacebook = (response) => {
			this.setState({ email: response.email, password: response.id });
			console.log(response.email + " " + response.id);
			this.callLogin();
		}
		return (
			
				<div class="container login">
					<div class="omb_login">
						<img src='../../../styles/img/logo2.png' />
						<h3 class="omb_authTitle">Sign in</h3>
						{/*<div class="row omb_row-sm-offset-3 omb_socialButtons">
							<div class="col-xs-4 col-sm-2 google">
								<GoogleLogin
									clientId="422141561901-0a74kgo7l091cnv2likor8pblvrim3tb.apps.googleusercontent.com"
									buttonText="Google+"
									onSuccess={responseGoogle}
									onFailure={responseGoogle}
									/>
							</div>
							<div class="col-xs-4 col-sm-2">
								<a href="#" class="btn btn-lg btn-block omb_btn-twitter">
									<i class="fa fa-twitter visible-xs"></i>
									<span class="hidden-xs">Twitter</span>
								</a>
							</div>
							<div class="col-xs-4 col-sm-2 facebooke">
								<FacebookLogin
									appId="196958860828715"
									textButton="Facebooke"
									autoLoad={false}
									fields="name,email,picture"
									onClick={responseFacebook}
									callback={responseFacebook} />
							</div>
						</div>

						<div class="row omb_row-sm-offset-3 omb_loginOr">
							<div class="col-xs-12 col-sm-6">
								<hr class="omb_hrOr" />
								<span class="omb_spanOr">or</span>
							</div>
						</div>*/}

						<div class="row omb_row-sm-offset-3">
							<div class="col-xs-12 col-sm-6">
								<form class="omb_loginForm" onSubmit={this.onSubmit} autoComplete="off" method="POST">
									<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-user"></i></span>
										<input type="email" onChange={this.onChange} class="form-control" name="email" placeholder="email address" required autoFocus />
									</div>
									<span class="help-block"></span>

									<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-lock"></i></span>
										<input type="password" onChange={this.onChange} class="form-control" name="password" placeholder="Password" />
									</div>
									<br />
									<span class="alert alert-danger" style={this.state.errorMessage}>Wrong Email or password</span>

									<button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
								</form>
							</div>
						</div>
						<div class="row omb_row-sm-offset-3">
							<div class="col-xs-12 col-sm-3">
								<label class="checkbox">
									<input type="checkbox" value="remember-me" />Remember Me
				</label>
							</div>
							<div class="col-xs-12 col-sm-3">
								<p class="omb_forgotPwd">
									<a href="#">Forgot password?</a>
								</p>
							</div>
						</div>
					</div>
				</div>
		);
	}
}

Login.propTypes = {
	login: PropTypes.func
}

export default connect(null, { login })(Login);