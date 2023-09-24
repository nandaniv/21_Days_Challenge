import React, { useEffect, useState } from 'react';
import { firestore } from './firebase';

const Crud = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firestore.collection('people').get();
      const people = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(people);
    };

    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await firestore.collection('people').add({ name, age });
      console.log('Person created successfully');
      setName('');
      setAge('');
    } catch (error) {
      console.error('Person creation failed:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await firestore.collection('people').doc(id).delete();
      console.log('Person deleted successfully');
    } catch (error) {
      console.error('Person deletion failed:', error);
    }
  };

  const handleIncrementAge = async (id, currentAge) => {
    try {
      const updatedAge = parseInt(currentAge) + 1;
      await firestore.collection('people').doc(id).update({ age: updatedAge });
      console.log('Person age incremented successfully');
    } catch (error) {
      console.error('Person age increment failed:', error);
    }
  };
  

  return (
    <div>
      <h2>CRUD Operations</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
      <ul>
        {data.map((person) => (
          <li key={person.id}>
            <div>
              Name: {person.name}, Age: {person.age}
              <button onClick={() => handleIncrementAge(person.id, person.age)}>Increment Age</button>
              <button onClick={() => handleDelete(person.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Crud;
