import { Paper, Typography, Box, IconButton, Chip, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ToDoItem({ todo, onEdit, onDelete }) {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">{todo.title}</Typography>
        <Typography variant="body2" color="text.secondary">{todo.description}</Typography>
        <Chip 
          label={todo.status} 
          size="small" 
          color={todo.status === 'Completed' ? 'success' : 'primary'} 
          sx={{ mt: 1 }} 
        />
      </Box>
      
      <Stack direction="row" spacing={1}>
        <IconButton onClick={onEdit} color="primary" size="small">
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete} color="error" size="small">
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
}