import React, { Component } from 'react';
import * as firebase from 'firebase';
import Form from 'react-bootstrap/Form';

class EditSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: null,
            teachers: null,
            admin: null,
            classes: null,
            objType: "none",
            selectionKey: "",
            selection: {
                name: "",
                address: "",
                homeroom: "",
                birthday: "",
                teacher: "",
                enrolled: true,
            }
        }
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
        const newObj = JSON.parse(event.target.value);
        const values = newObj.value;
        const key = newObj.key;
        this.setState({
            selection: values,
            selectionKey: key
        })
    }

    handleNameChange = (event) => {
        const newVal = event.target.value;
        this.setState(prevState => {
            let prev = prevState.selection;
            prev.name = newVal;
            return {
                selection: prev
            }
        })
    }

    handleAddressChange = (event) => {
        const newVal = event.target.value;
        this.setState(prevState => {
            let prev = prevState.selection;
            prev.address = newVal;
            return {
                selection: prev
            }
        })
    }

    handleHomeroomChange = (event) => {
        const newVal = event.target.value;
        this.setState(prevState => {
            let prev = prevState.selection;
            prev.homeroom = newVal;
            return {
                selection: prev
            }
        })
    }

    handleBirthdayChange = (event) => {
        const newVal = event.target.value;
        this.setState(prevState => {
            let prev = prevState.selection;
            prev.birthday = newVal;
            return {
                selection: prev
            }
        })
    }

    handleTeacherChange = (event) => {
        const newVal = event.target.value;
        this.setState(prevState => {
            let prev = prevState.selection;
            prev.teacher = newVal;
            return {
                selection: prev
            }
        })
    }

    handleEnrolledChange = (event) => {
        const newVal = event.target.value;
        this.setState(prevState => {
            let prev = prevState.selection;
            prev.enrolled = newVal;
            return {
                selection: prev
            }
        })
    }

    handleSubmit = (event) => {
        const newInfo = this.state.selection;
        const updateKey = this.state.selectionKey;
        const type = this.state.objType;

        this.setState(prevState => {
            return {
                selectionKey: "",
                selection: {
                    name: "",
                    address: "",
                    homeroom: "",
                    birthday: "",
                    teacher: "",
                    enrolled: true
                }
            }
        });
        this.updateData(newInfo, updateKey, type);
    }

    updateData = (data, key, type) => {
        // console.log(data);

        const rootRef = firebase.database().ref();

        if (type === "student") { //student
            const studentRef = rootRef.child("students");
            const objRef = studentRef.child(key);
            objRef.update(data);
        } else if (type === "teacher") { //teacher
            const teacherRef = rootRef.child("teachers");
            const objRef = teacherRef.child(key);
            objRef.update(data);
        } else if (type === "admin") { //admin
            const adminRef = rootRef.child("admin");
            const objRef = adminRef.child(key);
            objRef.update(data);
        } else if (type === "class") { //class
            const classRef = rootRef.child("classes");
            const objRef = classRef.child(key);
            objRef.update(data);
        }
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
        let keyArr;
        if (this.state[selectType] !== null && this.state[selectType] !== undefined)
            keyArr = Object.keys(this.state[selectType]);
        return (<div style={{ margin: "15px", width: "250px" }}>
            <h3>Edit</h3>
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
                                Object.values(this.state[selectType]).map(obj => {
                                    ct++;
                                    return (
                                        <option key={ct} value={JSON.stringify({ key: keyArr[ct], value: obj })}>{obj.name}</option>
                                    );
                                })}
                        </Form.Control>
                    }
                </Form.Group>
            </Form>
            <div style={{ margin: "15px" }}>
                {this.state.objType !== "none" && <label>
                    <br /> Name
                    <input value={this.state.selection.name} onChange={this.handleNameChange} />
                </label>}
                {(this.state.objType === "student" || this.state.objType === "teacher")
                    && <label>
                        <br /> Address
                    <input value={this.state.selection.address} onChange={this.handleAddressChange} />
                    </label>}
                {(this.state.objType === "student" || this.state.objType === "teacher")
                    && <label>
                        <br />Homeroom Class
                        <select value={this.state.selection.homeroom} onChange={this.handleHomeroomChange}>
                            <option value=""> -- </option>
                            {(this.state.classes !== null && this.state.classes !== undefined) &&
                                Object.values(this.state.classes).map(homeroom => {
                                    return (
                                        <option value={homeroom.name}>{homeroom.name}</option>
                                    );
                                })}
                        </select>
                    </label>}
                {this.state.objType === "student" && <label>
                    <br />Teacher
                    <select value={this.state.selection.teacher} onChange={this.handleTeacherChange}>
                        <option value=""> -- </option>
                        {(this.state.teachers !== null && this.state.teachers !== undefined) &&
                            Object.values(this.state.teachers).map(teacher => {
                                return (
                                    <option value={teacher.name}>{teacher.name}</option>
                                );
                            })}
                    </select>
                </label>}
                {this.state.objType === "student" && <label>
                    <br />Enrolled?
                    <select value={this.state.selection.enrolled ? "yes" : "no"} onChange={this.handleEnrolledChange} >
                        {/* <option value=""> -- </option> */}
                        <option value="yes">yes</option>
                        <option value="no">no</option>
                    </select>
                </label>}
                {(this.state.objType === "student" || this.state.objType === "teacher")
                    && <label>
                        <br />Birthday
                    <input value={this.state.selection.birthday} onChange={this.handleBirthdayChange} />
                    </label>}
                {this.state.objType !== "none" && <label>
                    <button onClick={this.handleSubmit}>Submit</button>
                </label>}

            </div>
        </div>
        )
    }
}

export default EditSection;