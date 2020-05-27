import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import ListDisplay from './ListDisplay';

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
    const valRef = rootRef;
    console.log("before valref");
    valRef.on('value', snap => {
      console.log("in valref");
      this.setState({
        students: snap.val().students,
        teachers: snap.val().teachers,
        admin: snap.val().admin,
        classes: snap.val().classes,
      });
      console.log(snap.val());
    });

    console.log("after valred")
    // console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.value}</h1>
        <button>Add one</button>
        <ListDisplay obj={this.state.students} title="Students" />
        <ListDisplay obj={this.state.teachers} title="Teachers" />
        <ListDisplay obj={this.state.admin} title="Admin" />
      </div>
    );
  }
}

export default App;
