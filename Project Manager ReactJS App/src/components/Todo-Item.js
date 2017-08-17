import React, {Component} from 'react';
import PropTypes from '../../node_modules/prop-types';

export default class TodoItem extends Component {
    render() {
        return (
            <li className="todo-item">
                <strong>{this.props.todo.title},</strong>
            </li>

        );
    }
}

//checks if the property type is correct
TodoItem.propTypes = {
    todo: PropTypes.object
};

