'use client';
import { useState, useEffect } from 'react';
import { TextField, Button, Stack, MenuItem } from '@mui/material';

export default function ToDoForm({ onSubmit, editData, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setDescription(editData.description);
      setStatus(editData.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('Pending');
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({ title, description, status });

    setTitle('');
    setDescription('');
    setStatus('Pending');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField 
          label="Titlu Task" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          fullWidth 
        />
        <TextField 
          label="Descriere" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          multiline 
          rows={2} 
          fullWidth 
        />
        <TextField 
          select 
          label="Status" 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
          fullWidth
        >
          <MenuItem value="Pending">În așteptare</MenuItem>
          <MenuItem value="In Progress">În lucru</MenuItem>
          <MenuItem value="Completed">Finalizat</MenuItem>
        </TextField>
        
        <Button type="submit" variant="contained" color={editData ? "secondary" : "primary"}>
          {editData ? "Actualizează Task" : "Adaugă Task"}
        </Button>
        {editData && <Button onClick={onCancel} variant="text">Anulează</Button>}
      </Stack>
    </form>
  );
}