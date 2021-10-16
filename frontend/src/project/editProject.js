import React from 'react';
import './editProject.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HEADER_BUTTONS, CRAFTS } from './../common/enums';
import imageCompression from 'browser-image-compression';

class EditProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValue: "",
            typeValue: "",
            materialsValue: "",
            patsrcValue: "",
            otherValue: "",
            imgsrcValue: "",
            displayImgsrcValue: ""
        }

        // code for the below functions was adapted from https://reactjs.org/docs/forms.html
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleMaterialsChange = this.handleMaterialsChange.bind(this);
        this.handlePatsrcChange = this.handlePatsrcChange.bind(this);
        this.handleImgsrcChange = this.handleImgsrcChange.bind(this);
        this.handleOtherChange = this.handleOtherChange.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:3001/projects/' + this.props.projectid)
            .then(res => res.json())
            .then(data => {
                var displayImgsrc = "";
                if(data.info[0].imgsrc !== undefined && data.info[0].imgsrc !== "" ){
                    displayImgsrc = "http://localhost:3001/" + data.info[0].imgsrc;
                }
                this.setState(
                    (prevState) => {
                        return {
                            nameValue: data.info[0].name,
                            typeValue: data.info[0].type,
                            imgsrcValue: data.info[0].imgsrc,
                            materialsValue: data.info[0].materials,
                            patsrcValue: data.info[0].patsrc,
                            otherValue: data.info[0].otherType,
                            displayImgsrcValue: displayImgsrc
                        }
                    }
                )
            });
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
                return { displayImgsrcValue: URL.createObjectURL(event.target.files[0]) };
            });
        }

    }

    // updates state every time the text input for "Other" is changed
    handleOtherChange(event) {
        this.setState((prevState, props) => {
            return { otherValue: event.target.value };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.nameValue === "" || this.state.nameValue.match(/^\s*$/)) {
            toast("Please enter a project name", { autoClose: 10000, pauseOnHover: true, progressClassName: "toastProgressBar", position: "bottom-center" });
        } else if (this.state.typeValue === CRAFTS.OTHER && (this.state.otherValue === "" || this.state.otherValue.match(/^\s*$/))) {
            toast("Please enter a project type", { autoClose: 10000, pauseOnHover: true, progressClassName: "toastProgressBar", position: "bottom-center" });
        } else {
            const formData = new FormData(event.target);
            for(var key of formData.keys()){
                console.log(key);
            }
            console.log("---");
            for(var value of formData.values()){
                console.log(value);
            }
            this.props.onSubmit(formData);
        }
    }

    render() {
        const nameValue = this.state.nameValue;
        const typeValue = this.state.typeValue;
        const materialsValue = this.state.materialsValue;
        const patsrcValue = this.state.patsrcValue;
        const otherValue = this.state.otherValue;
        var displayImgsrcValue = this.state.displayImgsrcValue;

        return (
            <div>
                <div id="editProjPage">
                    <h1 className="formHeader">Edit Project</h1>
                    <p className="requiredFieldNote"> * Indicates a required field</p>
                    
                    <form id="editProjectInfo" onSubmit={(event) => this.handleSubmit(event)} encType="multipart/form-data">
                        <label htmlFor="projname">Project name: *</label>< br />
                        <input type="text" id="projname" name="projname" value={nameValue} onChange={(e) => this.handleNameChange(e)} /><br />

                        <span>Project type: *</span>
                        <div id="typeContainer" className="formGroupContainer">
                            <input type="radio" id="sewing" name="projtype" value={CRAFTS.SEWING} checked={typeValue === CRAFTS.SEWING} onChange={(e) => this.handleTypeChange(e)} />
                            <label htmlFor="sewing"> {CRAFTS.SEWING} </label><br />

                            <input type="radio" id="quilting" name="projtype" value={CRAFTS.QUILTING} checked={typeValue === CRAFTS.QUILTING} onChange={(e) => this.handleTypeChange(e)} />
                            <label htmlFor="quilting"> {CRAFTS.QUILTING} </label><br />

                            <input type="radio" id="crochet" name="projtype" value={CRAFTS.CROCHET} checked={typeValue === CRAFTS.CROCHET} onChange={(e) => this.handleTypeChange(e)} />
                            <label htmlFor="crochet"> {CRAFTS.CROCHET} </label><br />

                            <input type="radio" id="knitting" name="projtype" value={CRAFTS.KNITTING} checked={typeValue === CRAFTS.KNITTING} onChange={(e) => this.handleTypeChange(e)} />
                            <label htmlFor="knitting"> {CRAFTS.KNITTING} </label><br />

                            <input type="radio" id="embroidery" name="projtype" value={CRAFTS.EMBROIDERY} checked={typeValue === CRAFTS.EMBROIDERY} onChange={(e) => this.handleTypeChange(e)} />
                            <label htmlFor="embroidery"> {CRAFTS.EMBROIDERY} </label><br />

                            <input type="radio" id="other" name="projtype" value={CRAFTS.OTHER} checked={typeValue === CRAFTS.OTHER} onChange={(e) => this.handleTypeChange(e)} />
                            <label htmlFor="other"> {CRAFTS.OTHER} </label>
                            {typeValue === CRAFTS.OTHER ? <input type="text" className="otherText" id="otherType" name="otherType" value={otherValue} onChange={(e) => this.handleOtherChange(e)} /> : <br />}
                        </div>

                        <label htmlFor="materials">Materials:</label> <span className="optional">(optional)</span> <br />
                        <textarea id="materials" name="materials" value={materialsValue} onChange={(e) => this.handleMaterialsChange(e)} /> <br />

                        <label htmlFor="patternsource">Pattern source:</label> <span className="optional">(optional)</span> <br />
                        <input type="text" id="patternsource" name="patternsource" value={patsrcValue} onChange={(e) => this.handlePatsrcChange(e)} /><br />

                        <label htmlFor="projectimg">Project image:</label> <span className="optional">(optional)</span> <br />
                        {displayImgsrcValue !== undefined && displayImgsrcValue !== "" ?
                            <span>
                                <img src={displayImgsrcValue} /> <br />
                            </span>
                            :
                            <span></span>
                        } 
                        <input type="file" id="projectimg" accept="image/*"  name="projectimg" onChange={(e) => this.handleImgsrcChange(e)} /> <br />

                        <input type="submit" id="saveProjButton" value="Save"  />
                        <input type="button" className="formCancelBtn" value="Cancel" onClick={() => this.props.onCancel()} />
                    </form>
                </div>
            </div>
        );
    }
}

export default EditProject;