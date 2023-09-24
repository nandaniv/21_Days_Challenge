import React, { useState, useEffect } from 'react';
import { auth, firestore } from './firebase';

const TodoList = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [message , setMessage] = useState('');
  useEffect(() => {
    // Listen for user authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchTodos(user.uid);
      } else {
        setUser(null);
        setTodos([]);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const fetchTodos = async (userId) => {
    try {
      const snapshot = await firestore
        .collection('todos')
        .where('userId', '==', userId)
        .get();
      const todosData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTodos(todosData);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      await firestore.collection('todos').add({
        userId: user.uid,
        todo: newTodo,
        completed: false,
        completedTime: null,
        streaks: 0
      });
      setNewTodo('');
      fetchTodos(user.uid);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateValid = (completedTime) => {
    const currentDate = new Date().toLocaleDateString('en-IN');
    return completedTime !== currentDate;
  };

  const handleUpdate = async (todoId, completed, streaks) => {
    try {
      const todoRef = firestore.collection('todos').doc(todoId);
      const todoDoc = await todoRef.get();
      let currentStreaks = todoDoc.data().streaks;
      const lastUpdate = todoDoc.data().completedTime;

      const currentDate = new Date().toLocaleDateString('en-IN');
      const completedTime = new Date(todoDoc.data().completedTime).toLocaleDateString('en-IN');

      if (currentDate === completedTime) {
        //currentStreaks=currentStreaks;
      } else {
        currentStreaks = 0;
      }

      if (updateValid(lastUpdate)) {
        await todoRef.update({
          completed: !completed,
          streaks: currentStreaks + 1,
          completedTime: currentDate
        });
        setShowButton(true);
        setMessage('Well Done!');
    setTimeout(() => {
      setShowButton(false);
    }, 2000);
        console.log('Todo status updated successfully');

        setTodos((prevTodos) =>
          prevTodos.map((todo) => {
            if (todo.id === todoId) {
              return { ...todo, streaks: currentStreaks + 1 };
            }
            return todo;
          })
        );
      } else {
        console.log('Update is not valid');
        setShowButton(true);
        setMessage('You have already received streak for this task for today');
    setTimeout(() => {
      setShowButton(false);
    }, 2000);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

 /* const deleteTodo = async (todoId) => {
    try {
      await firestore.collection('todos').doc(todoId).delete();
      fetchTodos(user.uid);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };*/

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.email}!</h2>
          <button onClick={handleLogout} style={{position: 'absolute', top: 5, right: 5}}>Logout</button>
          <h3>Add New Todo</h3>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo}>Add</button>
          <h3>Your Todos</h3>
        
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Task</th>
                <th>Streaks</th>
                
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr>
                  <td>{todo.todo}</td>
                  <td>{todo.streaks}</td> 
                  <td>  <button onClick={() => handleUpdate(todo.id)}>Done</button></td>
                </tr>

              ))}
            </tbody>
          </table>
         {showButton && (
                    <button>
                        {message}
                    </button>
                  )}
        </div>
      ) : (
        <div>
          <h2>Please log in</h2>
        </div>
      )}
    </div>
  );
};

export default TodoList;
