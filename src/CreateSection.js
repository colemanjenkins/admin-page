import React, { Component } from 'react';
import * as firebase from 'firebase';
// import { Formik } from 'formik';
// import * as yup from 'yup';
// import Form from 'react-bootstrap/Form';

import './CreateSection.css'


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

    updateData = (data) => {
        console.log(data);

        const rootRef = firebase.database().ref();

        if (data.objType === "student") { //student
            const studentRef = rootRef.child("students");
            studentRef.push().set({
                name: data.name,
                address: data.address,
                homeroom: data.homeroom,
                birthday: data.birthday,
                teacher: data.teacher,
                enrolled: data.enrolled === "yes" ? true : false
            })
        } else if (data.objType === "teacher") { //teacher
            const teacherRef = rootRef.child("teachers");
            teacherRef.push().set({
                name: data.name,
                address: data.address,
                homeroom: data.homeroom,
                birthday: data.birthday,
            })
        } else if (data.objType === "admin") { //admin
            const adminRef = rootRef.child("admin");
            adminRef.push().set({
                name: data.name,
            })
        } else if (data.objType === "class") { //class
            const classRef = rootRef.child("classes");
            classRef.push().set({
                name: data.name,
            })
        }
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
        this.updateData(st);
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

    render() {
        const {
            homerooms,
            teachers
        } = this.props;
        return (
            <div style={{ margin: "15px", width: "250px" }}>
                <h3>Create New</h3>
                <label> Type <br />
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
                        <select value={this.state.homeroom} onChange={this.handleHomeroomChange}>
                            <option value=""> -- </option>
                            {(homerooms !== null && homerooms !== undefined) &&
                                Object.values(homerooms).map(homeroom => {
                                    return (
                                        <option value={homeroom.name}>{homeroom.name}</option>
                                    );
                                })}
                        </select>
                    </label>}
                {this.state.objType === "student" && <label>
                    <br />Teacher
                    <select value={this.state.teacher} onChange={this.handleTeacherChange}>
                        <option value=""> -- </option>
                        {(teachers !== null && teachers !== undefined) &&
                            Object.values(teachers).map(teacher => {
                                return (
                                    <option value={teacher.name}>{teacher.name}</option>
                                );
                            })}
                    </select>
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

export default CreateSection;
