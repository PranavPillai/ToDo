import React, { useState } from 'react';
import firebase from '../firebase';

export default function ToDo(props) {

  const { id, text, onDelete, userID, setTodos } = props;

  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(text);

  const onEditSubmit = (newText) => {
    firebase.database().ref(`todo/${userID}/${id}`).update({
      text: newText
    }).then(() => {
      firebase.database().ref(`todo/${userID}`).once('value').then((snapshot) => {
        const newTodos = Object.assign({}, snapshot.val());
        setTodos(newTodos);
      });
    });
  }

  return (
    <div className="todo-container">
      {editMode 
      ? <input 
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      : <p>{text}</p>
      }
      <button onClick={() => setEditMode(!editMode)}>{editMode ? 'Cancel Edit' : 'Edit'}</button>
      {editMode 
      ? <button onClick={() => {onEditSubmit(editText); setEditMode(false)}}>Submit Edit</button>
      : <button onClick={() => onDelete(id)}>Delete</button>}
    </div>
  )
}