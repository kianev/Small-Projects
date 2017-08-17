import React, {Component} from 'react';
import PropTypes from '../../node_modules/prop-types';

export default class ProjectItem extends Component {
    deleteProject(id){
       this.props.onDelete(id);
    }

    render() {
        return (
            <li className="project-item">
                <strong>{this.props.project.title}:</strong> {this.props.project.category}
                <a href="#" onClick={this.deleteProject.bind(this, this.props.project.id)}> [Delete]</a>
            </li>

        );
    }
}

//checks if the property type is correct
ProjectItem.propTypes = {
    deleteProject: PropTypes.func,
    project: PropTypes.object
};

