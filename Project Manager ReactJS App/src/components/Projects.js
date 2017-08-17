import React, {Component} from 'react';
import ProjectItem from './Project-Item';
import PropTypes from '../../node_modules/prop-types';

export default class Projects extends Component {
    deleteProject(id){
        this.props.onDelete(id);
    }

    render() {
        let projectItems;
        if (this.props.projects) {
            projectItems = this.props.projects.map(project => {
                return (
                    <ProjectItem onDelete={this.deleteProject.bind(this)} key={project.title} project={project}/>
                )
            })
        }

        return (
            <div className="projects">
                <h3>Latest Projects</h3>
                {projectItems}
            </div>

        );
    }
}

//checks if the property type is correct
Projects.propTypes = {
    projects: PropTypes.array,
    onDelete: PropTypes.func
};


