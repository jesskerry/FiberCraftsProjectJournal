import React from 'react';
import Modal from 'react-modal';
import { CRAFTS } from './../common/enums';
import './projectInfo.css';

class ProjectInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }

    componentDidMount() {
        fetch('http://localhost:3001/projects/' + this.props.projectid)
            .then(res => res.json())
            .then(data => {
                console.log(data.info[0].patsrc);
                this.setState(
                    (prevState) => {
                        return {
                            type: data.info[0].type,
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

    render() {
        const type = this.state.type;
        const imgsrc = this.state.imgsrc;
        const status = this.state.status;
        const materials = this.state.materials;
        const patsrc = this.state.patsrc;
        const otherType = this.state.otherType;

        return (
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
                {imgsrc !== "" ?
                    <span>
                        <img id="displayImg" src={imgsrc} />
                        <br />
                    </span>
                    : <p className="info">no image available</p>
                }

                <button id="editProjButton" onClick={() => this.props.onEditClick()}>Edit Project Information</button>
                <button id="deleteProjButton" onClick={this.handleOpenModal}>Delete Project</button>

                <Modal isOpen={this.state.showModal} id="deleteModal" >
                    <p id="modalText">Are you sure you want to delete this project?</p>
                    <div id="modalBtns">
                        <button id="modalCancelBtn" onClick={this.handleCloseModal}>Cancel</button>
                        <button id="modalDeleteBtn" onClick={this.props.onProjectDelete}>Yes, delete it</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ProjectInfo;