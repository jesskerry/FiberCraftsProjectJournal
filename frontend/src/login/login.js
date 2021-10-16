import React from 'react';
import Header from '../common/header';
import { ToastContainer, toast } from 'react-toastify'; // toast code from https://reactgo.com/react-toastify/
import 'react-toastify/dist/ReactToastify.css';
import ImageDisplay from './imageDisplay';
import './login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameValue: "",
            passwordValue: ""
        }

        // code for the below functions was adapted from https://reactjs.org/docs/forms.html
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
    }

    // updates state every time the username input is changed
    handleUsernameChange(event) {
        this.setState((prevState, props) => {
            return { usernameValue: event.target.value };
        });
    }

    // updates state every time the pwd input is changed
    handlePwdChange(event) {
        this.setState((prevState, props) => {
            return { passwordValue: event.target.value };
        });
    }

    validateAndLogin() {
        const usernameValue = this.state.usernameValue;
        const passwordValue = this.state.passwordValue;

        // eventually this will check against the database of existing users, for now it just checks that neither field is empty
        if (usernameValue !== "" && passwordValue !== "") {
            this.props.onLogin(usernameValue, passwordValue);
        } else {
            toast("Please enter a valid username and password", { autoClose: 10000, pauseOnHover: true, progressClassName: "toastProgressBar", position: "bottom-center" });
        }
    }

    render() {
        const usernameValue = this.state.usernameValue;
        const passwordValue = this.state.passwordValue;

        return (
            <div>
                <Header lButton={null} rButton={null} />
                <div className="page" id="loginPage">
                    <ImageDisplay />
                    <div id="idk">
                        <div id="login-form-container">
                            <form action="homepage.html">
                                <input type="text" id="username" name="username" placeholder="Username" className="login-input" value={usernameValue} onChange={(e) => this.handleUsernameChange(e)} /><br />
                                <input type="password" id="pwd" name="pwd" placeholder="Password" className="login-input" value={passwordValue} onChange={(e) => this.handlePwdChange(e)} /><br />
                                <input type="button" value="Log in" onClick={() => this.validateAndLogin()} /><br />
                            </form>
                            <hr />
                            <form action="newaccount.html">
                                <label htmlFor="sign-up-button">Don't have an account?</label> <br />
                                <input id="sign-up-button" type="button" value="Sign up" onClick={() => this.props.onSignupClick()} />
                            </form>
                        </div>
                        <p>Use My Project Journal to keep track of your projects for all your favorite crafts. You can also take notes and update your progress as you go.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;