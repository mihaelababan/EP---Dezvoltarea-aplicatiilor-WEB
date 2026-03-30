'use client';
import { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import ToDoForm from '@/components/ToDoForm/ToDoForm';
import ToDoItem from '@/components/ToDoItem/ToDoItem';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('bagheera_tasks');
    if (saved) setTodos(JSON.parse(saved));
  }, []);
  const handleSave = (formData) => {
    let newList;
    if (taskToEdit) {
      newList = todos.map((t) => (t.id === taskToEdit.id ? { ...t, ...formData } : t));
      setTaskToEdit(null);
    } else {
      newList = [...todos, { ...formData, id: Date.now() }];
    }
    updateAndSave(newList);
  };

  const handleDelete = (id) => {
    if (window.confirm("Sigur vrei să ștergi acest task?")) {
      const newList = todos.filter((t) => t.id !== id);
      updateAndSave(newList);
    }
  };

  const updateAndSave = (newList) => {
    setTodos(newList);
    localStorage.setItem('bagheera_tasks', JSON.stringify(newList));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        ToDo Manager
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <ToDoForm 
          onSubmit={handleSave} 
          editData={taskToEdit} 
          onCancel={() => setTaskToEdit(null)} 
        />
      </Paper>

      <Divider sx={{ mb: 3 }} />

      <Box>
        <Typography variant="h6" gutterBottom>Tasks ({todos.length})</Typography>
        {todos.length === 0 ? (
          <Typography color="textSecondary" align="center">No tasks available.</Typography>
        ) : (
          todos.map((todo) => (
            <ToDoItem 
              key={todo.id} 
              todo={todo} 
              onEdit={() => setTaskToEdit(todo)} 
              onDelete={() => handleDelete(todo.id)} 
            />
          ))
        )}
      </Box>
    </Container>
  );
}