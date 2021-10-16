import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './projectUpdates.css';
import { STATUS } from './../common/enums';

class ProjectUpdates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updates: [],
            formVisible: false,
            dateValue: this.getDateString(),
            textValue: "",
            statusValue: ""
        }

        // code for the below functions was adapted from https://reactjs.org/docs/forms.html
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:3001/projects/' + this.props.projectid)
            .then(res => res.json())
            .then(data => {
                console.log(data.info[0].status);
                this.setState(
                    (prevState) => {
                        return {
                            statusValue: data.info[0].status,
                            updates: data.info[0].updates
                        }
                    }
                )
            });
    }

    getDateString() {
        /* get a default date in a format that the date input can read for its value */
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        /* date formatting code from https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers */
        month = month.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        day = day.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        var todaysdate = year + "-" + month + "-" + day;
        return todaysdate;
    }

    handleUpdateProgressBtnClick() {
        this.setState((prevState, props) => {
            return { formVisible: true };
        });
    }

    handleCancelClick() {
        this.setState((prevState, props) => {
            return {
                formVisible: false,
                dateValue: this.getDateString(),
                textValue: "",
                statusValue: this.props.status
            };
        });
    }

    handleSubmitClick() {
        var textValue = this.state.textValue;
        const statusValue = this.state.statusValue;
        const dateValue = this.state.dateValue;
        var updates = this.state.updates;

        // check for a status change
        if (this.props.status !== statusValue) {
            if (textValue !== "") {
                textValue += "\n";
            }
            textValue += "Changed status to " + statusValue;
        }
        // display an alert if the text value is empty (i.e. no updates and no state changes)
        if (textValue === "" || textValue.match(/^\s*$/)) {
            toast("No update was entered", { autoClose: 10000, pauseOnHover: true, progressClassName: "toastProgressBar", position: "bottom-center" });
        } else {
            var newUpdate = { date: dateValue, text: textValue }
            updates.push(newUpdate);

            // var formData = new FormData();
            // formData.append("updates", updates);
            // formData.append("status", statusValue);

            // var updatedProject = {updates: updates, status: statusValue}

            this.props.onSubmit(updates, statusValue);

            this.setState((prevState, props) => {
                return {
                    formVisible: false,
                    textValue: "",
                    dateValue: this.getDateString()
                };
            });
        }
    }

    // updates state every time the date input is changed
    handleDateChange(event) {
        this.setState((prevState, props) => {
            return { dateValue: event.target.value };
        });
    }

    // updates state every time the text input is changed
    handleTextChange(event) {
        this.setState((prevState, props) => {
            return { textValue: event.target.value };
        });
    }

    // updates state every time the status input is changed
    handleStatusChange(event) {
        this.setState((prevState, props) => {
            return { statusValue: event.target.value };
        });
    }

    render() {
        const updates = this.state.updates;

        // create a list of the current updates
        var i = 0;
        var updatesDisplay = updates.map((update) => <div id="updateContainer" key={`update${i++}`}>
            <p className="date">{update.date}</p>
            <p className="update">{update.text}</p>
        </div>);

        return (
            <div className="project_col">
                {/* if the update form should be visible, display the form, otherwise display a button to open the form */}
                {this.state.formVisible ?
                    <form id="updateProgressForm">
                        <label htmlFor="progressdate">Date:</label>
                        <input type="date" id="progressdate" name="progressdate" value={this.state.dateValue} onChange={this.handleDateChange} /><br />

                        <label htmlFor="progresstext">What is your update?</label><br />
                        <textarea id="progresstext" name="progresstext" value={this.state.textValue} onChange={this.handleTextChange} /> <br/>

                        <span className="infoLabel">Project status:</span>
                        <div id="statusContainer" className="formItemContainer">
                            <input type="radio" id="wip" name="statusRG" value={STATUS.WIP} checked={this.state.statusValue === STATUS.WIP} onChange={this.handleStatusChange} />
                            <label htmlFor="wip"> {STATUS.WIP}</label>
                            <input type="radio" id="completed" name="statusRG" value={STATUS.COMPLETED} checked={this.state.statusValue === STATUS.COMPLETED} onChange={this.handleStatusChange} />
                            <label htmlFor="completed"> {STATUS.COMPLETED}</label>
                            <input type="radio" id="abandoned" name="statusRG" value={STATUS.ABANDONED} checked={this.state.statusValue === STATUS.ABANDONED} onChange={this.handleStatusChange} />
                            <label htmlFor="abandoned"> {STATUS.ABANDONED}</label>
                        </div>

                        <input type="button" value="Submit" onClick={() => this.handleSubmitClick()} />
                        <input type="button" className="formCancelBtn" value="Cancel" onClick={() => this.handleCancelClick()} />
                    </form>
                    :
                    <div id="progressUpdates">
                        <p id="updatesHeader">Progress updates:</p>
                        {/* if there are already updates, display them, otherwise display a message saying there are no updates */}
                        {updates.length === 0 ? <p className="update">No updates added yet</p> : updatesDisplay}
                        <button id="updateProgressButton" onClick={() => this.handleUpdateProgressBtnClick()} >Update Progress</button>
                    </div>
                }
            </div>
        );
    }
}

export default ProjectUpdates;