import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './editaccount.css';
import { CRAFTS } from './../common/enums';

class EditAccount extends React.Component {
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
        this.handleCommunitiesChange = this.handleCommunitiesChange.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:3001/users/' + this.props.userid)
            .then(res => res.json())
            .then(data => {
                this.setState(
                    (prevState) => {
                        return {
                            usernameValue: data.info[0].username,
                            passwordValue: data.info[0].pwd,
                            emailValue: data.info[0].email,
                            communitiesValue: data.info[0].communities
                        }
                    }
                )
            });
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

        const user = { username: usernameValue, pwd: passwordValue, email: emailValue, communities: communitiesValue };

        if (usernameValue === "" || usernameValue.match(/^\s*$/)) {
            toast("Please enter a valid username", { autoClose: 10000, pauseOnHover: true, progressClassName: "toastProgressBar", position: "bottom-center" });
        } else if (passwordValue === "" || passwordValue.match(/^\s*$/)) {
            toast("Please enter a valid password", { autoClose: 10000, pauseOnHover: true, progressClassName: "toastProgressBar", position: "bottom-center" });
        } else if (emailValue.match(emailRegex) === null) {
            toast("Please enter a valid email", { autoClose: 10000, pauseOnHover: true, progressClassName: "toastProgressBar", position: "bottom-center" });
        } else {
            fetch('https://jkerry-389n-backend.herokuapp.com/users/')
                .then(res => res.json())
                .then(data => {
                    var usernameAlreadyExists = false;
                    for(var i = 0; i < data.info.length; i++){
                        if(data.info[i].username !== this.props.currentUsername && data.info[i].username === usernameValue) {
                            usernameAlreadyExists = true;
                            break;
                        }
                    }
                    if(!usernameAlreadyExists){
                        this.props.onSubmit(user);
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
        console.log(communitiesValue);
        console.log(communitiesValue.includes(CRAFTS.CROCHET));

        return (
            <div id="new-account-container" className="page">
                <h1 className="formHeader">Edit Account</h1>
                <p className="requiredFieldNote"> * Indicates a required field</p>
                <form id="editAccountInfo" action="account.html">

                    <label htmlFor="username">Username: *</label><br />
                    <input type="text" id="username" name="username" className="account-input" value={usernameValue} onChange={(e) => this.handleUsernameChange(e)} /> <br />
                    <label htmlFor="pwd">Password: *</label><br />
                    <input type="text" id="pwd" name="password" className="account-input" value={passwordValue} onChange={(e) => this.handlePwdChange(e)} /><br />
                    <label htmlFor="email">Email: *</label><br />
                    <input type="email" id="email" name="email" className="account-input" value={emailValue} onChange={(e) => this.handleEmailChange(e)} /><br />


                    <span htmlFor="">Communities:</span> <span className="optional">(optional)</span><br />
                    <div id="communities-checkboxes" className="formGroupContainer">
                        <input type="checkbox" name="communitiesCB" id="knittingCB" value={CRAFTS.KNITTING} checked={communitiesValue.includes(CRAFTS.KNITTING)} onChange={(e) => this.handleCommunitiesChange(e)} />{CRAFTS.KNITTING}<br />
                        <input type="checkbox" name="communitiesCB" id="crochetCB" value={CRAFTS.CROCHET} checked={communitiesValue.includes(CRAFTS.CROCHET)} onChange={(e) => this.handleCommunitiesChange(e)} />{CRAFTS.CROCHET}<br />
                        <input type="checkbox" name="communitiesCB" id="sewingCB" value={CRAFTS.SEWING} checked={communitiesValue.includes(CRAFTS.SEWING)} onChange={(e) => this.handleCommunitiesChange(e)} />{CRAFTS.SEWING}<br />
                        <input type="checkbox" name="communitiesCB" id="quiltingCB" value={CRAFTS.QUILTING} checked={communitiesValue.includes(CRAFTS.QUILTING)} onChange={(e) => this.handleCommunitiesChange(e)} />{CRAFTS.QUILTING}<br />
                        <input type="checkbox" name="communitiesCB" id="embroideryCB" value={CRAFTS.EMBROIDERY} checked={communitiesValue.includes(CRAFTS.EMBROIDERY)} onChange={(e) => this.handleCommunitiesChange(e)} />{CRAFTS.EMBROIDERY}<br />
                    </div>

                    <input type="button" id="saveProjButton" value="Save" onClick={() => this.validateAndSignup()} />
                    <input type="button" className="formCancelBtn" value="Cancel" onClick={() => this.props.onCancel()} />
                </form>
            </div>
        );
    }
}

export default EditAccount;