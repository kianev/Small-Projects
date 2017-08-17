import React, {Component} from 'react';
import $ from '../node_modules/jquery';
import uuid from '../node_modules/uuid';
import Projects from './components/Projects';
import AddProject from './components/Add-Project';
import Todos from './components/Todos';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            todos: []
        }
    }

    getTodos() {
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/todos",
            dataType: "json",
            cashe: false,
            success: function (data) {
                this.setState({todos: data})
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }
        })
    }

    getProjects() {
        this.setState({
            projects: [
                {
                    id: uuid.v4(),
                    title: "Business Website",
                    category: "Web Design"
                },
                {
                    id: uuid.v4(),
                    title: "Social App",
                    category: "Mobile Development"
                },
                {
                    id: uuid.v4(),
                    title: "Ecommerce Shopping Cart",
                    category: "Web Development"
                }
            ]
        });
    }

    componentWillMount() {
        this.getProjects();
        this.getTodos();
    }

    componentDidMount() {
        this.getTodos();
    }

    handleAddProject(project) {
        let projects = this.state.projects;
        projects.push(project);
        this.setState({projects: projects})
    }

    handleDeleteProject(id) {
        let projects = this.state.projects;
        let index = projects.findIndex(x => x.id === id);
        projects.splice(index, 1);
        this.setState({projects: projects})
    }

    render() {
        return (
            <div className="App">
                <h1>Project Manager App</h1>
                <AddProject addProject={this.handleAddProject.bind(this)}/>
                <hr/>
                <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
                <Todos todos={this.state.todos} />
            </div>
        );
    }
}


