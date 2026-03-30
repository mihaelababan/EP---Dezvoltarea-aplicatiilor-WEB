import { Paper, Typography, Box, IconButton, Chip, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './ToDoItem.module.css';

export default function ToDoItem({ todo, onEdit, onDelete }) {
  return (
    <Paper elevation={1} className={styles.itemCard}>
      <Box className={styles.contentBox}>
        <Typography variant="caption" className={styles.idLabel}>ID: {todo.id}</Typography>
        <Typography variant="h6" className={styles.taskTitle}>{todo.title}</Typography>
        <Typography variant="body2" className={styles.taskDesc}>{todo.description}</Typography>
        
        <Stack direction="row" spacing={1} className={styles.chipStack}>
          <Chip label={todo.status} size="small" color="primary" />
          {todo.deadline && (
            <Chip label={`Due: ${todo.deadline}`} size="small" variant="outlined" />
          )}
        </Stack>
      </Box>
      
      <Box className={styles.actionBox}>
        <IconButton onClick={onEdit} color="primary" size="small"><EditIcon /></IconButton>
        <IconButton onClick={onDelete} color="error" size="small"><DeleteIcon /></IconButton>
      </Box>
    </Paper>
  );
}