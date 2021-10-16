import React from 'react';
import { CRAFTS } from './../common/enums';
import './projectCard.css';

class ProjectCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: "",
            imgsrc: "",
            status: "",
            otherType: ""
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/projects/' + this.props.projectid)
            .then(res => res.json())
            .then(data => {
                if(data.info[0] !== undefined){
                    this.setState(
                        (prevState) => {
                            return {
                                name: data.info[0].name,
                                type: data.info[0].type,
                                // imgsrc: data.info[0].imgbase64,
                                imgsrc: data.info[0].imgsrc,
                                status: data.info[0].status,
                                otherType: data.info[0].otherType
                            }
                        }
                    )
                }
            });
    }

    render() {
        return (
            <button className="projectCard" onClick={() => this.props.onClick(this.props.projectid)}>
                <h3>{this.state.name}</h3>
                <p>{this.state.type !== CRAFTS.OTHER ? this.state.type : this.state.otherType}</p>
                {/* {this.state.imgsrc !== undefined && this.state.imgsrc !== "" ? <img src={this.state.imgsrc} /> : <img id="placeholderimg" src={process.env.PUBLIC_URL + "/noimage.png"} />} */}
                {this.state.imgsrc !== undefined && this.state.imgsrc !== "" ? <img src={"http://localhost:3001/" + this.state.imgsrc} /> : <img id="placeholderimg" src={process.env.PUBLIC_URL + "/noimage.png"} />}
                {/* if I can get the filename saved to the db, then the above line should properly display the image */}
                <p>Status: {this.state.status}</p>
            </button>
        );
    }
}

export default ProjectCard;