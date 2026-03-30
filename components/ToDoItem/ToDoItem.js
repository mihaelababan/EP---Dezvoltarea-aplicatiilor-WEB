import { Paper, Typography, Box, IconButton, Chip, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ToDoItem({ todo, onEdit, onDelete }) {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography variant="caption" color="text.disabled">ID: {todo.id}</Typography>
        <Typography variant="h6">{todo.title}</Typography>
        <Typography variant="body2">{todo.description}</Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Chip label={todo.status} size="small" color="primary" />
          {todo.deadline && <Chip label={`Due: ${todo.deadline}`} size="small" variant="outlined" />}
        </Stack>
      </Box>
      <Box>
        <IconButton onClick={onEdit} color="primary"><EditIcon /></IconButton>
        <IconButton onClick={onDelete} color="error"><DeleteIcon /></IconButton>
      </Box>
    </Paper>
  );
}