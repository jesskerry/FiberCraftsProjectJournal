import React from 'react';
import Header from '../common/header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';
import { CRAFTS, HEADER_BUTTONS } from './../common/enums';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameValue: "",
            passwordValue: "",
            emailValue: "",
            communitiesValue: []
        }

        // code for the below functions was adapted from https://reactjs.org/docs/forms.html
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        // this.handleCommunitiesChange = this.handleCommunitiesChange.bind(this);
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

    // updates state every time the email input is changed
    handleEmailChange(event) {
        this.setState((prevState, props) => {
            return { emailValue: event.target.value };
        });
    }

    // updates state every time the communities input is changed
    handleCommunitiesChange(event) {
        var currCommunities = this.state.communitiesValue;
        if (currCommunities.includes(event.target.value)) {
            currCommunities.splice(currCommunities.indexOf(event.target.value), 1);
        } else {
            currCommunities.push(event.target.value);
        }
        this.setState((prevState, props) => {
            return { communitiesValue: currCommunities };
        });
    }

    validateAndSignup() {
        const usernameValue = this.state.usernameValue;
        const passwordValue = this.state.passwordValue;
        const emailValue = this.state.emailValue;
        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
        const communitiesValue = this.state.communitiesValue;

        // for now this just checks that neither field is empty
        if (usernameValue === "" || usernameValue.match(/^\s*$/)) {
            toast("Please enter a valid username", { autoClose: 10000, pauseOnHover: true, progressClassName: "toastProgressBar", position: "bottom-center" });
        } else if (passwordValue === "" || passwordValue.match(/^\s*$/)) {
            toast("Please enter a valid password", { autoClose: 10000, pauseOnHover: true, progressClassName: "toastProgressBar", position: "bottom-center" });
        } else if (emailValue.match(emailRegex) === null) {
            toast("Please enter a valid email", { autoClose: 10000, pauseOnHover: true, progressClassName: "toastProgressBar", position: "bottom-center" });
        } else {
            fetch('http://localhost:3001/users/')
                .then(res => res.json())
                .then(data => {
                    var usernameAlreadyExists = false;
                    for(var i = 0; i < data.info.length; i++){
                        if(data.info[i].username === usernameValue) {
                            usernameAlreadyExists = true;
                            break;
                        }
                    }
                    if(!usernameAlreadyExists){
                        this.props.onSignup(usernameValue, passwordValue, emailValue, communitiesValue);
                    } else {
                        toast("Sorry, that username is already taken", { autoClose: 10000, pauseOnHover: true, progressClassName: "toastProgressBar", position: "bottom-center" });
                    }
                });
        }
    }

    render() {
        const usernameValue = this.state.usernameValue;
        const passwordValue = this.state.passwordValue;
        const emailValue = this.state.emailValue;
        const communitiesValue = this.state.communitiesValue;

        return (
            <div>
                <Header lButton={null} rButton={HEADER_BUTTONS.RETURN} onNavBtnClick={(page) => this.props.onNavBtnClick(page)} />
                <div id="new-account-container" className="page">
                    <h1 className="formHeader">Create a new account</h1>
                    <p className="requiredFieldNote"> * Indicates a required field</p>
                    <form id="create-acct-form">
                        <label htmlFor="username">Username: *</label><br />
                        <input type="text" id="username" name="username" className="login-input" value={usernameValue} onChange={(e) => this.handleUsernameChange(e)} /><br />
                        <label htmlFor="pwd">Password: *</label><br />
                        <input type="password" id="pwd" name="pwd" className="login-input" value={passwordValue} onChange={(e) => this.handlePwdChange(e)} /><br />
                        <label htmlFor="email">Email: *</label><br />
                        <input type="email" id="email" name="email" className="login-input" value={emailValue} onChange={(e) => this.handleEmailChange(e)} /><br />
                        <span >Which communities would you like to be a part of: </span> <span className="optional">(optional)</span><br />
                        <div id="communities-checkboxes" className="formGroupContainer">
                            <input type="checkbox" name="communitiesCB" id="knittingCB" value={CRAFTS.KNITTING} defaultChecked={communitiesValue.includes(CRAFTS.KNITTING)} onChange={(e) => this.handleCommunitiesChange(e)} />{CRAFTS.KNITTING}<br />
                            <input type="checkbox" name="communitiesCB" id="crochetCB" value={CRAFTS.CROCHET} defaultChecked={communitiesValue.includes(CRAFTS.CROCHET)} onChange={(e) => this.handleCommunitiesChange(e)} />{CRAFTS.CROCHET}<br />
                            <input type="checkbox" name="communitiesCB" id="sewingCB" value={CRAFTS.SEWING} defaultChecked={communitiesValue.includes(CRAFTS.SEWING)} onChange={(e) => this.handleCommunitiesChange(e)} />{CRAFTS.SEWING}<br />
                            <input type="checkbox" name="communitiesCB" id="quiltingCB" value={CRAFTS.QUILTING} defaultChecked={communitiesValue.includes(CRAFTS.QUILTING)} onChange={(e) => this.handleCommunitiesChange(e)} />{CRAFTS.QUILTING}<br />
                            <input type="checkbox" name="communitiesCB" id="embroideryCB" value={CRAFTS.EMBROIDERY} defaultChecked={communitiesValue.includes(CRAFTS.EMBROIDERY)} onChange={(e) => this.handleCommunitiesChange(e)} />{CRAFTS.EMBROIDERY}<br />
                        </div>
                        <input type="button" id="create-acct-button" value="Create Account" onClick={() => this.validateAndSignup()} /><br />
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;