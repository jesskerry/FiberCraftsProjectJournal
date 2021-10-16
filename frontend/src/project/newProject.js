import React from 'react';
import Header from '../common/header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HEADER_BUTTONS, CRAFTS, STATUS } from './../common/enums';
import imageCompression from 'browser-image-compression';

class NewProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValue: "",
            typeValue: CRAFTS.OTHER,
            materialsValue: "",
            patsrcValue: "",
            otherValue: "",
            imgsrcValue: "",
            displayImgsrcValue: "",
        }

        // code for the below functions was adapted from https://reactjs.org/docs/forms.html
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleMaterialsChange = this.handleMaterialsChange.bind(this);
        this.handlePatsrcChange = this.handlePatsrcChange.bind(this);
        this.handleImgsrcChange = this.handleImgsrcChange.bind(this);
        this.handleOtherChange = this.handleOtherChange.bind(this);
    }

    // updates state every time the name input is changed
    handleNameChange(event) {
        this.setState((prevState, props) => {
            return { nameValue: event.target.value };
        });
    }

    // updates state every time the type input is changed
    handleTypeChange(event) {
        var otherValue = this.state.otherValue;
        if (event.target.value !== CRAFTS.OTHER) {
            otherValue = "";
        }
        this.setState((prevState, props) => {
            return { typeValue: event.target.value, otherValue: otherValue };
        });
    }

    // updates state every time the materials input is changed
    handleMaterialsChange(event) {
        this.setState((prevState, props) => {
            return { materialsValue: event.target.value };
        });
    }

    // updates state every time the pattern source input is changed
    handlePatsrcChange(event) {
        this.setState((prevState, props) => {
            return { patsrcValue: event.target.value };
        });
    }

    // updates state every time the image source input is changed
    handleImgsrcChange(event) {
        if (event.target.files[0] !== undefined) {
            this.setState((prevState, props) => {
                return { displayImgsrcValue: URL.createObjectURL(event.target.files[0]) }; // https://medium.com/@650egor/react-30-day-challenge-day-2-image-upload-preview-2d534f8eaaa
            });
        }
    }

    // updates state every time the text input for "Other" is changed
    handleOtherChange(event) {
        this.setState((prevState, props) => {
            return { otherValue: event.target.value };
        });
    }

    handleSave(event) {
        event.preventDefault();
        console.log("HANDLING SAVE");
        if (this.state.nameValue === "" || this.state.nameValue.match(/^\s*$/)) {
            toast("Please enter a project name", { autoClose: 10000, pauseOnHover: true, progressClassName: "toastProgressBar", position: "bottom-center" });
        } else if (this.state.typeValue === CRAFTS.OTHER && (this.state.otherValue === "" || this.state.otherValue.match(/^\s*$/))) {
            toast("Please enter a project type", { autoClose: 10000, pauseOnHover: true, progressClassName: "toastProgressBar", position: "bottom-center" });
        } else {
            const formData = new FormData(event.target);
            this.props.onSave(formData);
        }
    }

    render() {
        const nameValue = this.state.nameValue;
        const typeValue = this.state.typeValue;
        const materialsValue = this.state.materialsValue;
        const patsrcValue = this.state.patsrcValue;
        const otherValue = this.state.otherValue;
        const displayImgsrcValue = this.state.displayImgsrcValue;

        const onNavBtnClick = this.props.onNavBtnClick;

        return (
            <div>
                <Header lButton={HEADER_BUTTONS.HOME} rButton={HEADER_BUTTONS.MYACCT} onNavBtnClick={(page) => onNavBtnClick(page)} />
                <div id="newProjPage" className="page">
                    <h1 className="formHeader">Create a New Project</h1>
                    <p className="requiredFieldNote"> * Indicates a required field</p>

                    <form id="newProjForm" onSubmit={(event) => this.handleSave(event)} encType="multipart/form-data">
                        <label htmlFor="projname">Project name: *</label> <br />
                        <input type="text" id="projname" name="projname" value={nameValue} onChange={(e) => this.handleNameChange(e)} /> <br />
                        <span>Project type: *</span>
                        <div id="typeContainer" className="formGroupContainer">
                            <input type="radio" id="sewing" name="projtype" value={CRAFTS.SEWING} defaultChecked={typeValue === CRAFTS.SEWING} onChange={(e) => this.handleTypeChange(e)} />
                            <label htmlFor="sewing"> {CRAFTS.SEWING} </label><br />
                            <input type="radio" id="quilting" name="projtype" value={CRAFTS.QUILTING} defaultChecked={typeValue === CRAFTS.QUILTING} onChange={(e) => this.handleTypeChange(e)} />
                            <label htmlFor="quilting"> {CRAFTS.QUILTING}</label><br />
                            <input type="radio" id="crochet" name="projtype" value={CRAFTS.CROCHET} defaultChecked={typeValue === CRAFTS.CROCHET} onChange={(e) => this.handleTypeChange(e)} />
                            <label htmlFor="crochet"> {CRAFTS.CROCHET}</label><br />
                            <input type="radio" id="knitting" name="projtype" value={CRAFTS.KNITTING} defaultChecked={typeValue === CRAFTS.KNITTING} onChange={(e) => this.handleTypeChange(e)} />
                            <label htmlFor="knitting"> {CRAFTS.KNITTING}</label><br />
                            <input type="radio" id="embroidery" name="projtype" value={CRAFTS.EMBROIDERY} defaultChecked={typeValue === CRAFTS.EMBROIDERY} onChange={(e) => this.handleTypeChange(e)} />
                            <label htmlFor="embroidery"> {CRAFTS.EMBROIDERY}</label><br />
                            <input type="radio" id="other" name="projtype" value={CRAFTS.OTHER} defaultChecked={typeValue === CRAFTS.OTHER} onChange={(e) => this.handleTypeChange(e)} />
                            <label htmlFor="other"> {CRAFTS.OTHER}</label>
                            {typeValue === CRAFTS.OTHER ? <input type="text" id="otherType" name="otherType" className="otherText" value={otherValue} onChange={(e) => this.handleOtherChange(e)} /> : <br />}
                        </div>

                        <label htmlFor="materials">Materials:</label> <span className="optional">(optional)</span> <br />
                        <textarea id="materials" name="materials" value={materialsValue} onChange={(e) => this.handleMaterialsChange(e)} /> <br />

                        <label htmlFor="patternsource">Pattern source:</label> <span className="optional">(optional)</span> <br />
                        <input type="text" id="patternsource" name="patternsource" value={patsrcValue} onChange={(e) => this.handlePatsrcChange(e)} /><br />

                        <label htmlFor="projectimg">Upload an image:</label> <span className="optional">(optional)</span> <br />
                        {displayImgsrcValue !== "" ?
                            <span>
                                <img src={displayImgsrcValue} /> <br />
                            </span>
                            : <span></span>
                        }
                        <input type="file" id="projectimg" accept="image/*" name="projectimg" onChange={(e) => this.handleImgsrcChange(e)}/> <br />
                        <input type="submit" id="createProjButton" value="Create Project" />
                    </form>
                </div>
            </div>
        );
    }
}

export default NewProject;