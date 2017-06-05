import React from "react";
import { IndexLink, Link, Redirect } from "react-router-dom";
//import { login } from '../../actions/authActions';
import { login } from '../../actions/businessActions';
import { connect } from 'react-redux';


class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {},
			isLoading: false,
			redirect: false,
			errorMessage:{
				display:'none'
			}
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentWillUpdate(nextProps) {
      
       //console.log()
      
    }

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ errors: {}, isLoading: true });
		this.props.login(this.state).then(
			(res) => this.setState({ redirect: true }),
			(err) => this.setState({ errors: err.response.data.errors, isLoading: false, errorMessage:{display:'block'} })
		);
	}

	render() {
		const { errors, email, password, isLoading } = this.state;
		const path = this.props.location.pathname;
		return (
			this.state.redirect ?
				<Redirect to={'/'} /> :

				<div class="container login">
					<div class="omb_login">
						<img  src='../../../styles/img/logo2.png' />
						<h3 class="omb_authTitle">Sign in</h3>
						<div class="row omb_row-sm-offset-3 omb_socialButtons">
							<div class="col-xs-4 col-sm-2">
								<a href="#" class="btn btn-lg btn-block omb_btn-facebook">
									<i class="fa fa-facebook visible-xs"></i>
									<span class="hidden-xs">Facebook</span>
								</a>
							</div>
							<div class="col-xs-4 col-sm-2">
								<a href="#" class="btn btn-lg btn-block omb_btn-twitter">
									<i class="fa fa-twitter visible-xs"></i>
									<span class="hidden-xs">Twitter</span>
								</a>
							</div>
							<div class="col-xs-4 col-sm-2">
								<a href="#" class="btn btn-lg btn-block omb_btn-google">
									<i class="fa fa-google-plus visible-xs"></i>
									<span class="hidden-xs">Google+</span>
								</a>
							</div>
						</div>

						<div class="row omb_row-sm-offset-3 omb_loginOr">
							<div class="col-xs-12 col-sm-6">
								<hr class="omb_hrOr" />
								<span class="omb_spanOr">or</span>
							</div>
						</div>

						<div class="row omb_row-sm-offset-3">
							<div class="col-xs-12 col-sm-6">
								<form class="omb_loginForm" onSubmit={this.onSubmit} autoComplete="off" method="POST">
									<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-user"></i></span>
										<input type="email" onChange={this.onChange} class="form-control" name="email" placeholder="email address" required />
									</div>
									<span class="help-block"></span>

									<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-lock"></i></span>
										<input type="password" onChange={this.onChange} class="form-control" name="password" placeholder="Password" />
									</div>
									<br/>
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
	login: React.PropTypes.func.isRequired
}

export default connect(null, { login })(Login);