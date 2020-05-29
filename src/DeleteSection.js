import React, { Component } from 'react';
import * as firebase from 'firebase';
import Form from 'react-bootstrap/Form';

class DeleteSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: null,
            teachers: null,
            admin: null,
            classes: null,
            objType: "none",
            selectionKey: "",
        };
    }

    initDatabase = () => {
        const rootRef = firebase.database().ref();
        rootRef.set({
            students: "",
            teachers: "",
            admin: "",
            classes: ""
        })
    }

    componentDidMount() {
        const rootRef = firebase.database().ref();
        rootRef.on('value', snap => {
            if (snap.val() === null)
                this.initDatabase();
            else
                this.setState({
                    students: snap.val().students,
                    teachers: snap.val().teachers,
                    admin: snap.val().admin,
                    classes: snap.val().classes,
                });
        });
    }

    handleSelect = (event) => {
        const newVal = event.target.value;
        this.setState(prevState => {
            return {
                objType: newVal
            }
        })
    }

    handleObjectSelect = (event) => {
        // const newObj = JSON.parse(event.target.value);
        // const values = newObj.value;
        // const key = newObj.key;
        const e = event;
        this.setState({
            // selection: values,
            selectionKey: e.target.value
        })
    }

    handleDelete = (key, type) => {

        this.setState({
            selectionKey: ""
        });
        this.deleteData(key, type);
    }

    deleteData = (key, type) => {
        if (Object.keys(this.state[type]).length <= 1) {
            alert("You cannot have no members of a type");
            return;
        }

        const rootRef = firebase.database().ref();
        const typeRef = rootRef.child(type);
        typeRef.child(key).remove();

        // if (type === "student") { //student
        //     const studentRef = rootRef.child("students");
        //     const objRef = studentRef.child(key);
        //     objRef.update(data);
        // } else if (type === "teacher") { //teacher
        //     const teacherRef = rootRef.child("teachers");
        //     const objRef = teacherRef.child(key);
        //     objRef.update(data);
        // } else if (type === "admin") { //admin
        //     const adminRef = rootRef.child("admin");
        //     const objRef = adminRef.child(key);
        //     objRef.update(data);
        // } else if (type === "class") { //class
        //     const classRef = rootRef.child("classes");
        //     const objRef = classRef.child(key);
        //     objRef.update(data);
        // }
    }

    render() {
        let ct = -1;
        let selectType = this.state.objType;
        if (selectType === "student") {
            selectType = "students";
        } else if (selectType === "teacher") {
            selectType = "teachers";
        } else if (selectType === "class") {
            selectType = "classes";
        }
        return (
            <div style={{ margin: "15px", width: "250px" }}>
                <h3>Delete</h3>
                <Form>
                    <Form.Group controlID="studentSelection">
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
                        {this.state.objType !== "none" &&
                            <Form.Control as="select" multiple onChange={this.handleObjectSelect}>
                                {(this.state[selectType] !== null && this.state[selectType] !== undefined) &&
                                    Object.keys(this.state[selectType]).map(key => {
                                        ct++;
                                        return (
                                            <option key={ct} value={key}>{this.state[selectType][key].name}</option>
                                        );
                                    })}
                            </Form.Control>
                        }
                    </Form.Group>
                </Form>
                {this.state.objType !== "none" &&
                    <div style={{ margin: "15px" }}>
                        <button style={{ backgroundColor: "red" }} onClick={() => this.handleDelete(this.state.selectionKey, selectType)}>Delete {this.state.objType !== "" ? this.state.objType : ""}</button>
                    </div>}
            </div>
        )
    }
}
export default DeleteSection;