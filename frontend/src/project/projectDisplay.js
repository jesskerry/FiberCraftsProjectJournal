import React from 'react';
import './projectDisplay.css';
import Header from '../common/header';
import { HEADER_BUTTONS, PAGES, CRAFTS } from './../common/enums';
import ProjectUpdates from './projectUpdates';
import EditProject from './editProject';
import Modal from 'react-modal';

class ProjectDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            name: "",
            status: "",
            showModal: false,
            type: "",
            imgsrc: "",
            status: "",
            materials: "",
            patsrc: "",
            otherType: ""
        }

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleProjectDelete = this.handleProjectDelete.bind(this);
    }

    componentDidMount() {
        this.getProjectInfo();
    }

    getProjectInfo() {
        console.log("rendering project info");
        fetch('http://localhost:3001/projects/' + this.props.projectid)
            .then(res => res.json())
            .then(data => {
                console.log("data.info: ");
                console.log(data.info[0]);
                this.setState(
                    (prevState) => {
                        return {
                            name: data.info[0].name,
                            status: data.info[0].status,
                            type: data.info[0].type,
                            // imgsrc: data.info[0].imgbase64,
                            imgsrc: data.info[0].imgsrc,
                            status: data.info[0].status,
                            materials: data.info[0].materials,
                            patsrc: data.info[0].patsrc,
                            otherType: data.info[0].otherType
                        }
                    }
                )
            });
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handleEditClick() {
        this.setState((prevState, props) => {
            return { editable: true };
        });
    }

    async handleEditSubmit(formData) {
        formData.append("projectid", this.props.projectid);
        var options = {
            method: 'PUT',
            body: formData
        }
        await fetch("http://localhost:3001/projects/", options);

        this.getProjectInfo();

        this.setState((prevState, props) => {
            return { editable: false };
        });
    }

    async handleUpdatesSubmit(updates, status) {
        var data = { updates: updates, status: status, projectid: this.props.projectid };
        let options = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        console.log(options.body);
        await fetch('http://localhost:3001/projects/', options);

        this.getProjectInfo();

        this.setState((prevState, props) => {
            return { editable: false };
        });

    }

    handleEditCancel() {
        this.setState((prevState, props) => {
            return { editable: false };
        });
    }

    async handleProjectDelete() {
        let data = { projectid: this.props.projectid };
        let options = {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        await fetch('http://localhost:3001/projects/', options);

        this.props.onNavBtnClick(PAGES.HOME);
    }

    render() {
        const onNavBtnClick = this.props.onNavBtnClick;
        const type = this.state.type;
        const imgsrc = this.state.imgsrc;
        const status = this.state.status;
        const materials = this.state.materials;
        const patsrc = this.state.patsrc;
        const otherType = this.state.otherType;
        console.log(this.state);

        return (
            <div>
                <Header lButton={HEADER_BUTTONS.HOME} rButton={HEADER_BUTTONS.MYACCT} onNavBtnClick={(page) => onNavBtnClick(page)} />

                <div id="projectDisplay" className="page">
                    {/* if editing, show the edit project page, otherwise display the project information and updates */}
                    {!this.state.editable ?
                        <div>
                            <h1 id="projectTitle">{this.state.name}</h1>
                            <div id="projectContainer">
                                <div className="project_col">
                                    <p id="projectTypeLabel" className="infoLabel">Craft type:</p>
                                    <p id="projectType" className="info">{type !== CRAFTS.OTHER ? type : otherType}</p>

                                    <p id="projectMaterialsLabel" className="infoLabel">Materials:</p>
                                    <p id="projectMaterials" className="info">{materials}</p>

                                    <p id="projectPatternLabel" className="infoLabel">Pattern source:</p>
                                    <p id="projectPattern" className="info">{patsrc}</p>

                                    <p id="projectStatusLabel" className="infoLabel">Status:</p>
                                    <p id="projectStatus" className="info">{status}</p>

                                    <p id="projectImagesLabel" className="infoLabel">Image: </p>
                                    {imgsrc !== "" && imgsrc !== undefined ?
                                        <span>
                                            <img id="displayImg" src={"http://localhost:3001/" + imgsrc} />
                                            <br />
                                        </span>
                                        : <p className="info">no image available</p>
                                    }

                                    <button id="editProjButton" onClick={() => this.handleEditClick()}>Edit Project Information</button>
                                    <button id="deleteProjButton" onClick={this.handleOpenModal}>Delete Project</button>

                                    <Modal isOpen={this.state.showModal} id="deleteModal" >
                                        <p id="modalText">Are you sure you want to delete this project?</p>
                                        <div id="modalBtns">
                                            <button id="modalCancelBtn" onClick={this.handleCloseModal}>Cancel</button>
                                            <button id="modalDeleteBtn" onClick={this.handleProjectDelete}>Yes, delete it</button>
                                        </div>
                                    </Modal>
                                </div>
                                <ProjectUpdates projectid={this.props.projectid} status={this.state.status} onSubmit={(updates, status) => this.handleUpdatesSubmit(updates, status)} />
                            </div></div>
                        : <EditProject projectid={this.props.projectid} onSubmit={(project) => this.handleEditSubmit(project)} onCancel={() => this.handleEditCancel()} />}
                </div>
            </div>
        );
    }
}

export default ProjectDisplay;