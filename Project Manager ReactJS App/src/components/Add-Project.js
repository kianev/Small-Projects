import React, {Component} from 'react';
import uuid from '../../node_modules/uuid';
import PropTypes from '../../node_modules/prop-types';

export default class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newProject: {}
        }
    }

    static defaultProps = {
        categories: ["Web Design", "Mobile Development", "Web Development"]
    };


    handleSumbit(event) {
        event.preventDefault();
        if (this.refs.title.value === "") {
            alert("Title is required!");
        } else {
            this.setState({
                newProject: {
                    id: uuid.v4(),
                    title: this.refs.title.value,
                    category: this.refs.category.value
                }
            }, function () {
                this.props.addProject(this.state.newProject)
            });
        }
    }

    render() {
        let categoryOptions = this.props.categories.map(category => {
            return <option key={category} value={category}>{category}</option>
        });

        return (
            <div>
                <h3>Add Project</h3>
                <form onSubmit={this.handleSumbit.bind(this)}>
                    <div>
                        <label>Title</label><br/>
                        <input type="text" ref="title"/>
                    </div>
                    <div>
                        <label>Category</label><br/>
                        <select ref="category">
                            {categoryOptions}
                        </select>
                    </div>
                    <br />
                    <button type="sumbit">Sumbit</button>
                </form>
            </div>

        );
    }
}

AddProject.propTypes = {
    handleSumbit: PropTypes.func,
    addProject: PropTypes.func,
    categories: PropTypes.array
};


