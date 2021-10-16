import React from 'react';
import Header from '../common/header';
import { HEADER_BUTTONS } from './../common/enums';
import EditAccount from './editaccount';
import './account.css';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            username: "",
            pwd: "",
            email: "",
            communities: []
        }
    }

    handleEditClick() {
        this.setState((prevState, props) => {
            return { editable: true };
        });
    }

    async handleEditSubmit(user) {
        var data = { user: user, userid: this.props.userid };
        let options = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        await fetch('http://localhost:3001/users/', options);

        this.getUserInfo();
        
        this.setState((prevState, props) => {
            return { editable: false };
        });
    }

    handleEditCancel() {
        this.setState((prevState, props) => {
            return { editable: false };
        });
    }

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo() {
        fetch('http://localhost:3001/users/' + this.props.userid)
            .then(res => res.json())
            .then(data => {
                this.setState(
                    (prevState) => {
                        return {
                            username: data.info[0].username,
                            pwd: data.info[0].pwd,
                            email: data.info[0].email,
                            communities: data.info[0].communities
                        }
                    }
                )
            });
    }

    render() {
        const communities = this.state.communities;
        var communitiesDisplay;
        if (communities.length === 0) {
            communitiesDisplay = <p className="info" id="noCommunitiesMsg">No communities chosen yet</p>
        } else {
            var i = 0;
            communitiesDisplay = <ul id="communitiesList">
                {communities.map(c => <li className="info" key={i++} >{c}</li>)}
            </ul>;
        }

        return (
            <div >
                <Header lButton={HEADER_BUTTONS.HOME} rButton={HEADER_BUTTONS.LOGOUT} onNavBtnClick={(page) => this.props.onNavBtnClick(page)} />

                {/* if editing, show the edit account page, otherwise display the user's account information */}
                {!this.state.editable ?
                    <div className="page">
                        <h1 id="welcome">Hi {this.state.username}!</h1>
                        <p id="usernameLabel" className="infoLabel">Username: </p>
                        <p id="usernameInfo" className="info">{this.state.username}</p>
                        <p id="emailLabel" className="infoLabel">Email: </p>
                        <p id="emailInfo" className="info">{this.state.email}</p>
                        <p id="communitiesLabel" className="infoLabel">Communities:</p>
                        {communitiesDisplay}

                        <button id="editAccountButton" onClick={() => this.handleEditClick()}>Edit Account Information</button>
                    </div>
                    : <EditAccount userid={this.props.userid} currentUsername={this.state.username} onSubmit={(user) => this.handleEditSubmit(user)} onCancel={() => this.handleEditCancel()} />}
            </div>
        );
    }
}

export default Account;