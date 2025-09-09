"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useProjectStore } from "@/store/useProjectStore";
import { useTaskStore } from "@/store/useTaskStore";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  Stack,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";
import TaskRow from "./components/TaskRow";

// Loading skeleton components
const ProjectSkeleton = () => (
  <Card sx={{ height: "100%" }}>
    <CardHeader
      avatar={<Skeleton variant="circular" width={40} height={40} />}
      title={<Skeleton variant="text" width="60%" />}
      subheader={<Skeleton variant="text" width="40%" />}
    />
    <Divider />
    <CardContent>
      <Skeleton variant="text" width="30%" sx={{ mb: 2 }} />
      <Stack spacing={1}>
        <Skeleton variant="rectangular" height={60} />
        <Skeleton variant="rectangular" height={60} />
        <Skeleton variant="rectangular" height={60} />
      </Stack>
    </CardContent>
  </Card>
);

const TaskSkeleton = () => (
  <Paper variant="outlined" sx={{ p: 2, mb: 1 }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Skeleton variant="circular" width={20} height={20} />
      <Skeleton variant="text" width="70%" />
      <Box sx={{ ml: "auto" }}>
        <Skeleton variant="rectangular" width={80} height={24} />
      </Box>
    </Box>
  </Paper>
);

export default function DashboardPage() {
  const { fetchMe, loading: authLoading } = useAuthStore();
  const {
    projects,
    fetchProjects,
    createProject,
    deleteProject,
    loading: projectsLoading,
    createLoading,
  } = useProjectStore();
  const {
    tasksByProject,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    loading: tasksLoading,
  } = useTaskStore();

  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [openProjectDialog, setOpenProjectDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectNameError, setProjectNameError] = useState("");

  useEffect(() => {
    (async () => {
      await fetchMe();
      await fetchProjects();
    })();
  }, [fetchMe, fetchProjects]);

  // Auto-fetch tasks when a project is selected
  useEffect(() => {
    if (selectedProject) {
      fetchTasks(selectedProject.id);
    }
  }, [selectedProject, fetchTasks]);

  const handleCreateProject = async (e) => {
    e.preventDefault();

    // Reset errors
    setProjectNameError("");

    // Validate project name
    if (!projectName.trim()) {
      setProjectNameError("Project name is required");
      return;
    }

    await createProject(projectName, projectDesc);
    setProjectName("");
    setProjectDesc("");
    setProjectNameError("");
    setOpenProjectDialog(false);
  };

  const handleDeleteProject = async (projectId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this project? This action cannot be undone and will delete all associated tasks."
      )
    ) {
      await deleteProject(projectId);
      // If the deleted project was selected, clear the selection
      if (selectedProject?.id === projectId) {
        setSelectedProject(null);
      }
    }
  };

  if (authLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Create Project Section */}
        <Card sx={{ mb: 4 }}>
          <CardHeader
            title="Create Project"
            subheader="Start a new workspace"
          />
          <CardContent>
            <Box component="form" onSubmit={handleCreateProject}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Project Name"
                    fullWidth
                    value={projectName}
                    onChange={(e) => {
                      setProjectName(e.target.value);
                      if (projectNameError) setProjectNameError("");
                    }}
                    error={!!projectNameError}
                    helperText={projectNameError}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Description"
                    fullWidth
                    value={projectDesc}
                    onChange={(e) => setProjectDesc(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ height: "100%" }}
                    disabled={createLoading}
                  >
                    {createLoading ? <CircularProgress size={20} /> : "Create"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <Grid container spacing={3}>
          {projectsLoading ? (
            // Show skeleton loading for projects
            Array.from({ length: 3 }).map((_, index) => (
              <Grid item xs={12} md={6} key={index}>
                <ProjectSkeleton />
              </Grid>
            ))
          ) : projects.length === 0 ? (
            <Grid item xs={12}>
              <Paper sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No projects yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create your first project to get started
                </Typography>
              </Paper>
            </Grid>
          ) : (
            projects.map((project) => (
              <Grid item xs={12} md={6} key={project.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardHeader
                    title={project.name}
                    subheader={project.description}
                    action={
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          size="small"
                          variant={
                            selectedProject?.id === project.id
                              ? "contained"
                              : "outlined"
                          }
                          onClick={() => setSelectedProject(project)}
                        >
                          {selectedProject?.id === project.id
                            ? "Selected"
                            : "Select"}
                        </Button>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteProject(project.id)}
                          disabled={projectsLoading}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  />
                  <Divider />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <AddTaskForm
                      onAdd={(payload) => addTask(project.id, payload)}
                    />

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Tasks
                      </Typography>
                      {tasksLoading && selectedProject?.id === project.id ? (
                        // Show skeleton loading for tasks
                        Array.from({ length: 3 }).map((_, index) => (
                          <TaskSkeleton key={index} />
                        ))
                      ) : (tasksByProject[project.id] || []).length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                          No tasks yet. Add some tasks to get started.
                        </Typography>
                      ) : (
                        (tasksByProject[project.id] || []).map((task) => (
                          <TaskRow
                            key={task.id}
                            task={task}
                            onUpdate={(updates) =>
                              updateTask(project.id, task.id, updates)
                            }
                            onDelete={() => deleteTask(project.id, task.id)}
                          />
                        ))
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
}
