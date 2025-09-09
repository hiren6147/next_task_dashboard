"use client";
import {
  Paper,
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
} from "@mui/icons-material";
import { statuses, getStatusColor } from "@/lib/utils";

export default function TaskRow({ task, onUpdate, onDelete }) {
  const [status, setStatus] = useState(task.status || "Todo");

  useEffect(() => setStatus(task.status || "Todo"), [task.status]);

  return (
    <Paper variant="outlined" sx={{ p: 2, mb: 1 }}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {task.status === "Done" ? (
              <CheckCircleIcon color="success" />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
            <Typography variant="subtitle2">{task.title}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
            <Chip
              size="small"
              color={getStatusColor(task.status)}
              label={task.status}
            />
            {task.dueDate && (
              <Chip size="small" label={`Due: ${task.dueDate}`} />
            )}
          </Box>
        </Grid>
        <Grid item>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={async (e) => {
                setStatus(e.target.value);
                await onUpdate({ status: e.target.value });
              }}
            >
              {statuses.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <IconButton color="error" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}
