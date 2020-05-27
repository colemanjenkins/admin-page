import React, { Component } from 'react';

class CreateSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            objType: "none",
            name: "",
            address: "",
            homeroom: "",
            birthday: "",
            teacher: "",
            enrolled: ""
        }
    }

    handleSelect = (event) => {
        this.setState({
            objType: event.target.value
        })
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleAddressChange = (event) => {
        this.setState({
            address: event.target.value
        })
    }

    handleHomeroomChange = (event) => {
        this.setState({
            homeroom: event.target.value
        })
    }

    handleBirthdayChange = (event) => {
        this.setState({
            birthday: event.target.value
        })
    }

    handleTeacherChange = (event) => {
        this.setState({
            teacher: event.target.value
        })
    }

    handleEnrolledChange = (event) => {
        this.setState({
            enrolled: event.target.value
        })
    }

    handleSubmit = (event) => {
        const st = this.state;

        this.setState(prevState => {
            return {
                objType: prevState.objType,
                name: "",
                address: "",
                homeroom: "",
                birthday: "",
                teacher: "",
                enrolled: ""
            }
        });
        this.props.create(st);
    }

    render() {
        return (
            <div>
                <label> Choose What to Add <br />
                    <select value={this.state.objType}
                        onChange={this.handleSelect}>
                        <option value="none">--</option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="class">Class</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>
                {this.state.objType !== "none" && <label>
                    <br /> Name
                    <input value={this.state.name} onChange={this.handleNameChange} />
                </label>}
                {(this.state.objType === "student" || this.state.objType === "teacher")
                    && <label>
                        <br /> Address
                    <input value={this.state.address} onChange={this.handleAddressChange} />
                    </label>}
                {(this.state.objType === "student" || this.state.objType === "teacher")
                    && <label>
                        <br />Homeroom Class
                    <input value={this.state.homeroom} onChange={this.handleHomeroomChange} />
                    </label>}
                {this.state.objType === "student" && <label>
                    <br />Teacher
                    <input value={this.state.teacher} onChange={this.handleTeacherChange} />
                </label>}
                {this.state.objType === "student" && <label>
                    <br />Enrolled?
                    <select value={this.state.enrolled} onChange={this.handleEnrolledChange} >
                        <option value=""> -- </option>
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                    </select>
                </label>}
                {(this.state.objType === "student" || this.state.objType === "teacher")
                    && <label>
                        <br />Birthday
                    <input value={this.state.birthday} onChange={this.handleBirthdayChange} />
                    </label>}
                {this.state.objType !== "none" && <label>
                    <button onClick={this.handleSubmit}>Submit</button>
                </label>}
            </div>
        );
    }
}

// function StudentOptions(props) {
//     return <div></div>
// }

// function TeacherOptions(props) {
//     return <div></div>
// }

// function ClassOptions(props) {
//     return <div></div>
// }

// function AdminOptions(props) {
//     return <div></div>
// }

export default CreateSection;