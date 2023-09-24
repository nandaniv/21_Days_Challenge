import React, { useState, useEffect } from 'react';
import { auth, firestore } from './firebase';

const TodoList = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const todosRef = firestore.collection('todos').where('userId', '==', user.uid);
        const unsubscribe = todosRef.onSnapshot((snapshot) => {
          const todosData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setTodos(todosData);
        });
        return () => unsubscribe();
      } else {
        setUser(null);
        setTodos([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim() !== '') {
      try {
        await firestore.collection('todos').add({
          text: newTodo,
          completed: false,
          userId: user.uid,
          completedTime: null,
        });
        setNewTodo('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const handleCompleteTodo = async (todoId) => {
    try {
      const todoRef = firestore.collection('todos').doc(todoId);
      const todoDoc = await todoRef.get();

      if (!todoDoc.exists) {
        console.error('Todo does not exist');
        return;
      }

      const todoData = todoDoc.data();
      const currentTime = firestore.FieldValue.serverTimestamp();
      const completedTime = todoData.completedTime;

      // Check if the todo is completed within 24 hours
      if (completedTime && currentTime.toMillis() - completedTime.toMillis() <= 24 * 60 * 60 * 1000) {
        await firestore.runTransaction(async (transaction) => {
          // Get the current points
          const currentPoints = todoData.points || 0;

          // Increment the points by 1
          transaction.update(todoRef, { points: currentPoints + 1 });
        });
      }

      // Update the completed status and completed time
      await todoRef.update({ completed: true, completedTime: currentTime });
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await firestore.collection('todos').doc(todoId).delete();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <h2>Welcome, {user.email}!</h2>
          <input
            type="text"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add Todo</button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.text}
                {!todo.completed && (
                  <>
                    <button onClick={() => handleCompleteTodo(todo.id)}>Complete</button>
                    <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Please log in to view your todos.</p>
      )}
    </div>
  );
};

export default TodoList;
