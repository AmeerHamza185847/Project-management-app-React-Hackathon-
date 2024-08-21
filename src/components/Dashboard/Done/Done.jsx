import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { db } from '../../../Firebase/firebase';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import './Done.css';


export const Done = () => {

  const [showInput, setShowInput] = useState(false);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'done'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksArray);
    });

    return () => unsubscribe();
  }, []);



  const handleClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (task.trim()) {
      try {
        // Add the task to the 'todo' collection in Firestore
        const docRef = await addDoc(collection(db, 'done'), {
          title: task,
          status: 'done',
          createdAt: new Date(),
        });
        console.log("Task added with ID: ", docRef.id);

        // Update local state
        setTasks([{ id: docRef.id, title: task, status: 'done' }, ...tasks]);
        setTask('');
        setShowInput(false);
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      // Delete the task from the 'todo' collection in Firestore
      await deleteDoc(doc(db, 'todo', id));
      // Update local state
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };


  return (
    <div className='doneContainer'>
      <h3>Completed</h3>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Button
          sx={{
            textAlign: 'center',
            borderColor: 'blue',
            width:'100%',
            padding: '2px 7px',
            color: 'blue',
            '&:hover': {
              borderColor: 'lightblue',
              backgroundColor: 'lightblue',
            },
          }}
          onClick={handleClick}
          variant="outlined"
          startIcon={<AddIcon sx={{ color: 'blue', fontSize: '1.5rem' }} />}>
          Add Task
        </Button>
      </Stack>
      {showInput && (
        <form onSubmit={handleSubmit} className='taskForm'>
          <TextField
            variant="outlined"
            placeholder="Enter your task"
            value={task}
            onChange={handleInputChange}
            sx={{ width: '100%' }}
          />
        </form>
      )}

      <div className="taskList">
        {tasks.map((task, index) => (
          <div key={index} className="taskItem">
            {task.title}
            <DeleteIcon
              sx={{ color: 'red', cursor: 'pointer', marginLeft: '10px',
               }}
              onClick={() => handleDelete(task.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

