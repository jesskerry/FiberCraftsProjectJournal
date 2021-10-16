import React from 'react';
import ProjectCard from './projectCard';
import Header from '../common/header';
import './homepage.css';
import { HEADER_BUTTONS } from './../common/enums';
import YelpDisplay from './yelpDisplay';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectids: [],
            allprojects: [],
            loading: false
        }
    }

    componentDidMount() {
        this.setState(
            (prevState) => { return { loading: true } }
        )

        fetch('http://localhost:3001/users/' + this.props.userid) // get the project ids
            .then(res => res.json())
            .then(data => {
                this.setState(
                    (prevState) => { return { projectids: data.info[0].projects } }
                )
            });
        fetch('http://localhost:3001/projects/') // get all project documents from the database
            .then(res => res.json())
            .then(data => {
                this.setState(
                    (prevState) => { return { allprojects: data.info, loading: false } }
                )
            });
    }

    render() {
        // filter the projects to just the ones belonging to this user, then map them to project cards
        // var filteredProjects = this.state.allprojects.filter(project => this.state.projectids.includes(project._id));
        var filteredProjects = this.state.allprojects.filter(project => project.userid === this.props.userid);
        var projectsDisplay = filteredProjects.map(project =>
            <ProjectCard
                projectid={project._id}
                onClick={(projectid) => this.props.onProjCardClick(projectid)} />
        );

        return (
            <div>
                <Header lButton={HEADER_BUTTONS.NEWPROJ} rButton={HEADER_BUTTONS.MYACCT} onNavBtnClick={(page) => this.props.onNavBtnClick(page)} />
                <div id="home-container">
                    <div id="projects-container">
                        {projectsDisplay.length === 0 && this.state.loading !== true ? <p id="noProjMsg">No projects created yet!</p> : projectsDisplay}
                    </div>
                    <div id="yelp-display-container">
                        <YelpDisplay sorted={false}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;