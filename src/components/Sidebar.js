import React, { Component } from "react";
import "../App.css";

class Sidebar extends React.Component{
    
    
    render(){
        return (
            <section className="NotesSidebar">
                <h2 className="NotesSidebar-title">To-Do Items:</h2>
                <div className="NotesSidebar-list">{this.props.getNotesRows()}</div>
            </section>
)}}

export default Sidebar;