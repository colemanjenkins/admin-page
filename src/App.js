import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import ListDisplay from './ListDisplay';
import CreateSection from './CreateSection';
import EditSection from './EditSection';
import Header from './Header';
import DeleteSection from './DeleteSection';
import "bootswatch/dist/lux/bootstrap.min.css";

class App extends Component {

  constructor() {
    super();
    this.state = {
      students: [],
      teachers: [],
      admin: [],
      classes: [],
      editMode: true,           //change
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

  editPage = (edit) => {
    this.setState({
      editMode: edit
    })
  }

  render() {
    let flexVal = 0;
    let justifyVal = "center"
    if (this.state.editMode) {
      flexVal = 1;
      justifyVal = "flex-start";
    }
    return (
      <div className="App">
        <div className="header">
          <Header editMode={this.state.editMode} editPage={this.editPage} />
          {/* <h1>Thomas Jefferson Elementary School</h1> */}

        </div>
        <div className="page-contents">
          <div className="peopleContents" style={{ flex: 1, justifyContent: justifyVal }}>
            <ListDisplay obj={this.state.students} title="Students"
              homerooms={this.state.classes} teachers={this.state.teachers} />
            <ListDisplay obj={this.state.teachers} title="Teachers"
              homerooms={this.state.homerooms} />
            <ListDisplay obj={this.state.admin} title="Admin" />
          </div>
          <div className="editContents" style={{ flex: flexVal }}>
            {this.state.editMode &&
              <CreateSection homerooms={this.state.classes}
                teachers={this.state.teachers} />}
            {this.state.editMode &&
              <EditSection />}
            {this.state.editMode &&
              <DeleteSection />}
          </div>
        </div>
      </div>
    );
  }
}

export default App;


// create = { this.updateData } 