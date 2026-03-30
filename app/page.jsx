'use client';
import { useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import ToDoForm from '@/components/ToDoForm/ToDoForm';

export default function Home() {
  const [todos, setTodos] = useState([]);//lista goala

  const handleAdd = (title, description) => {
    const newTodo = {
      id: Date.now(),
      title: title,
      description: description,
      status: 'Pending'
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>To Do App (Create Only)</Typography>
      
      <Paper>
        <TodoForm onAdd={handleAdd} />
      </Paper>

      <Box>
        <Typography variant="h6">Listă Task-uri:</Typography>
        {todos.map((todo) => (
          <Paper key={todo.id} variant="outlined">
            <Typography variant="subtitle1" fontWeight="bold">{todo.title}</Typography>
            <Typography variant="body2" color="textSecondary">{todo.description}</Typography>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}