import React, {Component} from 'react';
import TodoListHeader from './todo-list-header';
import TodoListItem from './todo-list-item';
import _ from '../../node_modules/lodash';

export default class TodoList extends Component {
    renderItems() {
        const props = _.omit(this.props, 'todos');
        return _.map(this.props.todos, (todo, index) => <TodoListItem key={index} {...todo} {...props} />);
    }

    render() {
        return (
            <table>
                <TodoListHeader />
                <tbody>
                {this.renderItems()}
                </tbody>
            </table>
        );
    }
}


