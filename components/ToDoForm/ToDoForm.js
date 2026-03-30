'use client';
import { useState, useEffect } from 'react';
import { TextField, Button, Stack, MenuItem, Typography, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function ToDoForm({ onSubmit, editData, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setDescription(editData.description);
      setStatus(editData.status);
      setDeadline(editData.deadline || '');
    } else {
      setTitle(''); setDescription(''); setStatus('Pending'); setDeadline('');
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description, status, deadline });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: '600' }}>
        {editData ? '✏️ Edit Task' : '🚀 Add New Task'}
      </Typography>
      <Stack spacing={2.5}>
        <TextField label="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth variant="filled" />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={2} fullWidth variant="filled" />
        
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value)} fullWidth variant="filled">
            <MenuItem value="Pending">🕒 Pending</MenuItem>
            <MenuItem value="In Progress">🛠️ In Progress</MenuItem>
            <MenuItem value="Completed">✅ Completed</MenuItem>
          </TextField>
          
          <TextField 
            label="Deadline" type="date" value={deadline} 
            onChange={(e) => setDeadline(e.target.value)} 

          />
        </Box>
        
        <Stack direction="row" spacing={2}>
          <Button 
            type="submit" variant="contained" fullWidth size="large"
            startIcon={editData ? <SaveIcon /> : <AddCircleIcon />}
            color={editData ? "secondary" : "primary"}
          >
            {editData ? "Update Task" : "Add Task"}
          </Button>
          {editData && <Button onClick={onCancel} variant="outlined" color="inherit">Cancel</Button>}
        </Stack>
      </Stack>
    </form>
  );
}