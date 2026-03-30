'use client';
import { Paper, Typography, Box, IconButton, Chip, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import styles from './ToDoItem.module.css';

export default function ToDoItem({ todo, onEdit, onDelete }) {
  
  const statusColors = {
    'Pending': '#1976d2',     
    'In Progress': '#ed6c02',  
    'Completed': '#2e7d32'    
  };

  return (
    <Paper 
      elevation={2} 
      className={styles.itemCard}
      style={{ borderLeftColor: statusColors[todo.status] || '#ccc' }}
    >
      <Box className={styles.contentBox}>
        <Typography variant="caption" className={styles.idLabel}>
          ID: #{todo.id.toString().slice(-4)}
        </Typography>
        
        <Typography variant="h6" className={styles.taskTitle}>
          {todo.title}
        </Typography>
        
        <Typography variant="body2" className={styles.taskDesc}>
          {todo.description}
        </Typography>
        
        <Stack direction="row" spacing={1} className={styles.chipStack}>
          <Chip 
            label={todo.status} 
            size="small" 
            sx={{ backgroundColor: statusColors[todo.status], color: 'white' }} 
          />
          {todo.deadline && (
            <Box className={styles.deadlineBox}>
              <CalendarMonthIcon fontSize="small" />
              <span>Due: {todo.deadline}</span>
            </Box>
          )}
        </Stack>
      </Box>
      
      <Box className={styles.actionBox}>
        <IconButton onClick={onEdit} color="primary" size="small">
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete} color="error" size="small">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}