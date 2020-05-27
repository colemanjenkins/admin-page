import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import ListDisplay from './ListDisplay';
import CreateSection from './CreateSection';

class App extends Component {

  constructor() {
    super();
    this.state = {
      students: [],
      teachers: [],
      admin: [],
      classes: [],
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    // const valRef = rootRef;
    // console.log("before valref");
    rootRef.on('value', snap => {
      console.log("in valref");
      this.setState({
        students: snap.val().students,
        teachers: snap.val().teachers,
        admin: snap.val().admin,
        classes: snap.val().classes,
      });
      // console.log(snap.val());
    });

    console.log("after valred")
    // console.log(this.state);
  }

  updateData = (data) => {
    console.log(data);

    const rootRef = firebase.database().ref();

    if (data.objType === "student") { //student
      const studentRef = rootRef.child("students");
      // const newStudent = {
      //   name: data.name,
      //   address: data.address,
      //   homeroom: data.homeroom,
      //   birthday: data.birthday,
      //   teacher: data.teacher,
      //   enrolled: data.enrolled === "yes" ? true : false
      // }
      studentRef.push().set({
        name: data.name,
        address: data.address,
        homeroom: data.homeroom,
        birthday: data.birthday,
        teacher: data.teacher,
        enrolled: data.enrolled === "yes" ? true : false
      })
      // this.setState(prevState => {
      //   let newStudents = prevState.students;
      //   newStudents['new name'] = newStudent;
      //   return {
      //     students: newStudents
      //   }
      // });
    } else if (data.objType === "student") { //teacher

    } else if (data.objType === "student") { //admin

    } else if (data.objType === "student") { //class

    } else {

    }
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.value}</h1>
        <button>Add one</button>
        <div className="contents">
          <ListDisplay obj={this.state.students} title="Students" />
          <ListDisplay obj={this.state.teachers} title="Teachers" />
          <ListDisplay obj={this.state.admin} title="Admin" />
          <CreateSection create={this.updateData} />
        </div>
      </div>
    );
  }
}

export default App;
