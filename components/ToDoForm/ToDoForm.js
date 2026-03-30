'use client';
import { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;

    onAdd(title, description);

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField 
          label="Titlu Task" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          fullWidth
        />
        <TextField 
          label="Descriere" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Adaugă Task
        </Button>
      </Stack>
    </form>
  );
}