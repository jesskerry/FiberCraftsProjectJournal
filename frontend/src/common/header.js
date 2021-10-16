import React from 'react';
import './header.css';
import { HEADER_BUTTONS, PAGES } from './enums';

class Header extends React.Component {

    render() {
        var lButton;
        var rButton;
        var onNavBtnClick = this.props.onNavBtnClick;

        /* check from props which button to display on the left */
        if (this.props.lButton === HEADER_BUTTONS.NEWPROJ) {
            lButton = <button id="lButton" className="navButtons" onClick={() => onNavBtnClick(PAGES.NEWPROJ)}>New Project</button>
        } else if (this.props.lButton === HEADER_BUTTONS.MYACCT) {
            lButton = <button id="lButton" className="navButtons" onClick={() => onNavBtnClick(PAGES.ACCOUNT)} >My Account</button>
        } else if (this.props.lButton === HEADER_BUTTONS.LOGOUT) {
            lButton = <button id="lButton" className="navButtons" onClick={() => onNavBtnClick(PAGES.LOGIN)} >Log out</button>
        } else if (this.props.lButton === HEADER_BUTTONS.HOME) {
            lButton = <button id="lButton" className="navButtons" onClick={() => onNavBtnClick(PAGES.HOME)} >Home</button>
        } else {
            lButton = null;
        }

        /* check from props which button to display on the right */
        if (this.props.rButton === HEADER_BUTTONS.NEWPROJ) {
            rButton = <button id="rButton" className="navButtons" onClick={() => onNavBtnClick(PAGES.NEWPROJ)} >New Project</button>
        } else if (this.props.rButton === HEADER_BUTTONS.MYACCT) {
            rButton = <button id="rButton" className="navButtons" onClick={() => onNavBtnClick(PAGES.ACCOUNT)} >My Account</button>
        } else if (this.props.rButton === HEADER_BUTTONS.LOGOUT) {
            rButton = <button id="rButton" className="navButtons" onClick={() => onNavBtnClick(PAGES.LOGIN)} >Log out</button>
        } else if (this.props.rButton === HEADER_BUTTONS.HOME) {
            rButton = <button id="rButton" className="navButtons" onClick={() => onNavBtnClick(PAGES.HOME)} >Home</button>
        } else if (this.props.rButton === HEADER_BUTTONS.RETURN) {
            rButton = <button id="rButton" className="navButtons" onClick={() => onNavBtnClick(PAGES.LOGIN)} >Return to Login Page</button>
        } else {
            rButton = null;
        }

        return (
            <div className="navHeader">
                {lButton === null && rButton === null ? <div></div> : null} {/* if both buttons are null, add another element to the left of the title so it appears centered instead of left aligned */}
                <p id="appName">My Project Journal</p>
                <div id="homepageNavButtons">
                    {lButton}
                    {rButton}
                </div >
            </div>
        );
    }
}

export default Header;