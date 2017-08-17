import React, {Component} from 'react';
import TodoItem from './Todo-Item';
import PropTypes from '../../node_modules/prop-types';

export default class Todos extends Component {
    render() {
        let todoItems;
        if (this.props.todos) {
            todoItems = this.props.todos.map(todo => {
                return (
                   <TodoItem key={todo.id} todo={todo}/>
                )
            })
        }

        return (
            <div className="todos">
                <h3>Todo List</h3>
                {todoItems}
            </div>

        );
    }
}

//checks if the property type is correct
Todos.propTypes = {
    todos: PropTypes.array,
};
