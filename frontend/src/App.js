import React from 'react';
import './App.css';
import Homepage from './homepage/homepage';
import Account from './account/account';
import ProjectDisplay from './project/projectDisplay';
import NewProject from './project/newProject';
import Login from './login/login';
import YelpDisplay from './homepage/yelpDisplay';
import Signup from './login/signup';
import { PAGES, STATUS, CRAFTS } from './common/enums';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: PAGES.LOGIN,
      userid: "",
      projectid: ""
    }
  }

  componentDidMount() {
    var userid = localStorage.getItem('userid') || "";
    var projectid = localStorage.getItem('projectid') || "";
    var currentPage = PAGES.LOGIN;

    if(userid !== "") {
      currentPage = PAGES.HOME;
    }

    this.setState((prevState, props) => {
      return { userid: userid, projectid: projectid, currentPage: currentPage };
    });    
  }

  /* handles a click from a button that should navigate to a new page changing the state to the correct page */
  handleNavButtonClick(targetPage) {
    if(targetPage === PAGES.LOGIN) {
      localStorage.setItem('userid', "");
      localStorage.setItem('projectid', "");
      this.setState((prevState, props) => {
        return { currentPage: targetPage, userid: "", projectid: "" };
      });
    } else {
      this.setState((prevState, props) => {
        return { currentPage: targetPage };
      });
    }
  }

  /* navigates to the project display for the project card clicked on */
  handleProjCardClick(projectid) {
    localStorage.setItem('projectid', projectid);
    this.setState((prevState, props) => {
      return { currentPage: PAGES.PROJECT, projectid: projectid };
    });
  }

  /* navigates to the project display for the project just created */
  handleNewProjSave(formData) {
    formData.append("userid", this.state.userid);
    var options = {
      method: 'POST',
      body: formData
    }
    fetch("http://localhost:3001/projects/", options)
      .then(res => res.json())
      .then(data => {
        var projectid = data.info._id;
        localStorage.setItem('projectid', projectid);
        this.setState((prevState, props) => {
          return { currentPage: PAGES.PROJECT, projectid: projectid };
        });
      });
  }

  /* log in a user and naviage to their home page (login credentials already validated in login.js) */
  handleLogin(user, pwd) {
    fetch('http://localhost:3001/users/' + user + "/" + pwd)
      .then(res => res.json())
      .then(data => {
        if (data.info.length === 0) {
          toast("Invalid login credentials, please try again", { autoClose: 10000, pauseOnHover: true, progressClassName: "toastProgressBar", position: "bottom-center" });
        } else {
          localStorage.setItem('userid', data.info[0]._id);
          this.setState(
            (prevState) => { return { currentPage: PAGES.HOME, userid: data.info[0]._id } }
          )
        }
      });
  }

  /* creates the account for the user and naviage to their home page (fields already validated in signup.js) */
  async handleSignup(user, pwd, email, communities) {
    var currUser = { username: user, pwd: pwd, email: email, communities: communities, projects: [] };

    let options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currUser)
    }
    await fetch('http://localhost:3001/users/', options).then();

    toast("Account created!", { autoClose: 10000, pauseOnHover: true, progressClassName: "toastProgressBar", position: "bottom-center" });

    this.setState((prevState, props) => {
      return { currentPage: PAGES.LOGIN };
    });
  }

  render() {
    const currentPage = this.state.currentPage;

    /* check which page is currently supposed to be displayed - defaults to login */
    var display;
    if (currentPage === PAGES.HOME) {
      display = <Homepage userid={this.state.userid} onNavBtnClick={(page) => this.handleNavButtonClick(page)} onProjCardClick={(projectid) => this.handleProjCardClick(projectid)} />;
    } else if (currentPage === PAGES.PROJECT) {
      display = <ProjectDisplay userid={this.state.userid} projectid={this.state.projectid} onNavBtnClick={(page) => this.handleNavButtonClick(page)} />;
    } else if (currentPage === PAGES.ACCOUNT) {
      display = <Account userid={this.state.userid} onNavBtnClick={(page) => this.handleNavButtonClick(page)} />;
    } else if (currentPage === PAGES.NEWPROJ) {
      display = <NewProject userid={this.state.userid} onNavBtnClick={(page) => this.handleNavButtonClick(page)} onSave={(project) => this.handleNewProjSave(project)} />;
    } else if (currentPage === PAGES.SIGNUP) {
      display = <Signup onSignup={(user, pwd, email, communities) => this.handleSignup(user, pwd, email, communities)} onNavBtnClick={(page) => this.handleNavButtonClick(page)} />;
    } else {
      display = <Login onLogin={(user, pwd) => this.handleLogin(user, pwd)} onSignupClick={() => this.handleNavButtonClick(PAGES.SIGNUP)} />;
    }

    return (
      <div className="App">
        {display}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
