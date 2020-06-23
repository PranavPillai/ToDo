import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './dashboardpage.scss';
import firebase from '../firebase.js';
import ToDo from '../components/ToDo';

function DashboardPage(props) {

  const { userID } = props;

  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState(null);
  
  useEffect(() => {
    firebase.database().ref(`todo/${userID}`).once('value').then((snapshot) => {
      setTodos(snapshot.val());
    });
  }, [userID])

  const onSubmit = () => {
    const todoRef = firebase.database().ref(`todo/${userID}`)
    const newTodo = {
      text: todo
    }
    todoRef.push(newTodo);
    firebase.database().ref(`todo/${userID}`).once('value').then((snapshot) => {
      setTodos(snapshot.val());
    });
  }

  const onDelete = (todoId) => {
    firebase.database().ref(`todo/${userID}/${todoId}`).remove().then(() => {
      firebase.database().ref(`todo/${userID}`).once('value').then((snapshot) => {
        setTodos(snapshot.val());
      });
    });
  }

  const onEditSubmit = (todoId, newText) => {
    firebase.database().ref(`todo/${userID}/${todoId}`).update({
      text: newText
    }).then(() => {
      firebase.database().ref(`todo/${userID}`).once('value').then((snapshot) => {
        const newTodos = Object.assign({}, snapshot.val());
        setTodos(newTodos);
      });
    });
  }

  const todoElements = todos && Object.entries(todos).map(([entryId, entry]) => {
    return (
    <ToDo 
      key={entryId}
      id={entryId}
      text={entry.text}
      onDelete={onDelete}
      onEditSubmit={onEditSubmit}
      userID={userID}
      setTodos={setTodos}
    />);
  }); 

  return (
    <div className="dashboard-page">
      <div className="content-container">
        <div className="header-container">
          <p className="header">Add Todo Items</p>
        </div>
        <div className="form-container">
          <div className="form-fields">
            <TextField
              label="I need to..."
              type="text"
              className="input"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <Button 
              className="go-btn"
              variant="contained"
              color="secondary"
              onClick={onSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div className="todos-container">
        {todoElements}
      </div>
    </div>
  );

}

export default withRouter(DashboardPage);
