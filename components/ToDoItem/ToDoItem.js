import { Paper, Typography, Box, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function ToDoItem({ todo, onEditClick }) {
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography variant="h6">{todo.title}</Typography>
        <Typography variant="body2" color="text.secondary">{todo.description}</Typography>
        <Chip label={todo.status} size="small" color="primary" sx={{ mt: 1 }} />
      </Box>
      <IconButton onClick={onEditClick} color="primary">
        <EditIcon />
      </IconButton>
    </Paper>
  );
}