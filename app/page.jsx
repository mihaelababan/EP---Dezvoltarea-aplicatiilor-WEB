'use client';
import { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, TextField, InputAdornment, MenuItem, FormControl, InputLabel, Select, Stack, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ToDoForm from '@/components/ToDoForm/ToDoForm';
import ToDoItem from '@/components/ToDoItem/ToDoItem';
import styles from './page.module.css'; 

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

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
    setTodos(newList);
    localStorage.setItem('bagheera_tasks', JSON.stringify(newList));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      const newList = todos.filter((t) => t.id !== id);
      setTodos(newList);
      localStorage.setItem('bagheera_tasks', JSON.stringify(newList));
    }
  };

  const processedTodos = todos
    .filter((todo) => 
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return b.id - a.id;
      if (sortBy === 'oldest') return a.id - b.id;
      if (sortBy === 'deadline') {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      }
      return 0;
    });

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Typography variant="h4" align="center" gutterBottom className={styles.title}>
        ToDo Manager
      </Typography>

      <Paper className={styles.formPaper}>
        <ToDoForm onSubmit={handleSave} editData={taskToEdit} onCancel={() => setTaskToEdit(null)} />
      </Paper>

      <Stack direction="row" spacing={2} className={styles.filterSection}>
        <TextField
          fullWidth
          label="Search Tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <FormControl className={styles.sortControl}>
          <InputLabel>Sort</InputLabel>
          <Select
            value={sortBy}
            label="Sort"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="deadline">Deadline</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Divider className={styles.divider} />

      <Box className={styles.listContainer}>
        <Typography variant="h6" className={styles.listTitle}>
          My Tasks ({processedTodos.length})
        </Typography>
        {processedTodos.map((todo) => (
          <ToDoItem 
            key={todo.id} 
            todo={todo} 
            onEdit={() => setTaskToEdit(todo)} 
            onDelete={() => handleDelete(todo.id)} 
          />
        ))}
      </Box>
    </Container>
  );
}