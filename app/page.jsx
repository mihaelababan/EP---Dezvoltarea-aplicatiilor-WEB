'use client';
import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ToDoForm from '@/components/ToDoForm/ToDoForm';
import ToDoItem from '@/components/ToDoItem/ToDoItem';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('my_tasks_list');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  const handleSave = (formData) => {
    let newTodoList;

    if (taskToEdit) {
      newTodoList = todos.map((t) => 
        t.id === taskToEdit.id ? { ...t, ...formData } : t
      );
      setTaskToEdit(null);
    } else {
      const newTask = { ...formData, id: Date.now() };
      newTodoList = [...todos, newTask];
    }

    setTodos(newTodoList);
    
    localStorage.setItem('my_tasks_list', JSON.stringify(newTodoList));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>ToDo App</Typography>

      <Box sx={{ mb: 4 }}>
        <ToDoForm 
          onSubmit={handleSave} 
          editData={taskToEdit} 
          onCancel={() => setTaskToEdit(null)} 
        />
      </Box>

      <Box>
        <Typography variant="h6">Task-uri ({todos.length}):</Typography>
        {todos.length === 0 ? (
          <Typography color="textSecondary">Nu există task-uri. Adaugă unul!</Typography>
        ) : (
          todos.map((t) => (
            <ToDoItem 
              key={t.id} 
              todo={t} 
              onEditClick={() => setTaskToEdit(t)} 
            />
          ))
        )}
      </Box>
    </Container>
  );
}