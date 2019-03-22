import React, { Component } from "react";
import classNames from "classnames";
import logo from "./logo.png";
import checkMark from "./check-mark.svg";
import "./App.css";
import Sidebar from "./components/Sidebar.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      currentNoteIndex: 0
    };
    this.markAsRead = this.markAsRead.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.getTotalUnread = this.getTotalUnread.bind(this);
    this.getNotesRows = this.getNotesRows.bind(this);
    
  }
  
  componentWillMount() {
    fetch('/notes')
	.then(response => response.json())
    .then(
		notes => {
			this.setState({
				notes: notes,
				currentNoteIndex: 0
			})
    }
  )
	.catch(
		error => {
			console.log('Ooops!');
			console.log(error);
		}
	);
  }

  
  markAsRead() {
    this.setState(currentState => {
      let marked = {
        ...currentState.notes[currentState.currentNoteIndex],
        read: true
      };
      let notes = [...currentState.notes];
      notes[currentState.currentNoteIndex] = marked;
      return { ...currentState, notes };
    });
  }

  
  selectNote(e) {
    this.setState({ currentNoteIndex: parseInt(e.currentTarget.id, 10) });

  }

  getTotalUnread() {
    let unreadArray = this.state.notes.filter(note => {
    return note.read === false;
    })
    return unreadArray.length;
    }

    getNotesRows() {
      return this.state.notes.map(note => (
        <div
          key={note.subject}
          className={classNames("NotesSidebarItem", {
            selected:
              this.state.notes.indexOf(note) === this.state.currentNoteIndex
          })}
          onClick={this.selectNote}
          
          id={this.state.notes.indexOf(note)}
        >
          <h4 className="NotesSidebarItem-title">{note.subject}</h4>
          {note.read && <img alt="Check Mark" src={checkMark} />}
        </div>
      ));
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">To-Do App</h1>
          <div className="App-title-unread">
            Remaining to Complete:
            <span className="App-title-unread-count">
              {this.getTotalUnread()}
            </span>
          </div>
        </header>
        <div className="Container">
        <Sidebar getNotesRows={this.getNotesRows}/>
        <section className="NoteDetails">
  {this.state.notes.length > 0 && (
    <h3 className="NoteDetails-title">
      {this.state.notes[this.state.currentNoteIndex].subject}
    </h3>
  )}
  {this.state.notes.length > 0 && (
    <p className="NoteDetails-subject">
      {this.state.notes[this.state.currentNoteIndex].body}
    </p>
  )}
  {this.state.notes.length > 0 && (
    <button onClick={this.markAsRead}>Mark as Complete</button>
  )}
  {this.state.notes.length <= 0 && (
    <p>
    No Notes!
    </p>
  )}
</section>
</div>
</div>
    );
  }
}

export default App;