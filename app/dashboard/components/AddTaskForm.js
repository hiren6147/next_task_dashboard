"use client";
import {
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useState } from "react";
import { statuses } from "@/lib/utils";

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Todo");
  const [dueDate, setDueDate] = useState("");
  const [titleError, setTitleError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setTitleError("");

    // Validate task title
    if (!title.trim()) {
      setTitleError("Task title is required");
      return;
    }

    await onAdd({ title, status, dueDate: dueDate || null });
    setTitle("");
    setStatus("Todo");
    setDueDate("");
    setTitleError("");
  };

  return (
    <Paper sx={{ p: { xs: 1.5, sm: 2 }, mb: 2, bgcolor: "grey.50" }}>
      <Typography variant="h6" gutterBottom>
        Add New Task
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={1.5} alignItems="center">
          <Grid item xs={12} sm={6} md={5}>
            <TextField
              label="Task Title"
              fullWidth
              size="small"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (titleError) setTitleError("");
              }}
              placeholder="Enter task title..."
              error={!!titleError}
              helperText={titleError}
              required
            />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                {statuses.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              label="Due Date"
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              startIcon={<AddIcon />}
              size="small"
            >
              Add Task
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
