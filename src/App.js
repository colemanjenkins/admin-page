import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import ListDisplay from './ListDisplay';
import CreateSection from './CreateSection';
import EditSection from './EditSection';

// import "bootswatch/dist/yeti/bootstrap.min.css";

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
    rootRef.on('value', snap => {
      this.setState({
        students: snap.val().students,
        teachers: snap.val().teachers,
        admin: snap.val().admin,
        classes: snap.val().classes,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Thomas Jefferson Elementary School</h1>
        <div className="contents">
          <ListDisplay obj={this.state.students} title="Students" />
          <ListDisplay obj={this.state.teachers} title="Teachers" />
          <ListDisplay obj={this.state.admin} title="Admin" />
          <CreateSection homerooms={this.state.classes}
            teachers={this.state.teachers} />
          <EditSection />
        </div>
      </div>
    );
  }
}

export default App;


// create = { this.updateData } 