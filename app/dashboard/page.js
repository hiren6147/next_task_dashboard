"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useProjectStore } from "@/store/useProjectStore";
import { useTaskStore } from "@/store/useTaskStore";
import { Plus, FolderOpen, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";
import TaskRow from "./components/TaskRow";

// Loading skeleton components
const ProjectSkeleton = () => (
  <div className="h-full rounded-lg border-0 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
    <div className="mb-6">
      <div className="flex items-center space-x-3">
        <Skeleton className="animate-skeleton h-10 w-10 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="animate-skeleton h-5 w-32" />
          <Skeleton className="animate-skeleton h-4 w-24" />
        </div>
      </div>
    </div>
    <div className="space-y-4">
      <Skeleton className="animate-skeleton h-4 w-20" />
      <div className="space-y-2">
        <Skeleton className="animate-skeleton h-16 w-full rounded-lg" />
        <Skeleton className="animate-skeleton h-16 w-full rounded-lg" />
        <Skeleton className="animate-skeleton h-16 w-full rounded-lg" />
      </div>
    </div>
  </div>
);

const TaskSkeleton = () => (
  <div className="mb-2 rounded-lg border-0 bg-white/70 p-4 shadow-sm backdrop-blur-sm">
    <div className="flex items-center space-x-3">
      <Skeleton className="animate-skeleton h-5 w-5 rounded-full" />
      <Skeleton className="animate-skeleton h-4 flex-1" />
      <Skeleton className="animate-skeleton h-6 w-20 rounded-md" />
    </div>
  </div>
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
  const { tasksByProject, fetchTasks, addTask, updateTask, deleteTask } =
    useTaskStore();

  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectNameError, setProjectNameError] = useState("");

  useEffect(() => {
    (async () => {
      await fetchMe();
      await fetchProjects();
    })();
  }, [fetchMe, fetchProjects]);

  // Auto-fetch tasks for all projects when projects change
  useEffect(() => {
    if (projects.length > 0) {
      projects.forEach((p) => {
        if (tasksByProject[p.id] === undefined) {
          fetchTasks(p.id);
        }
      });
    }
  }, [projects, tasksByProject, fetchTasks]);

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
  };

  const handleDeleteProject = async (projectId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this project? This action cannot be undone and will delete all associated tasks.",
      )
    ) {
      await deleteProject(projectId);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30">
        <Header />
        <div className="container mx-auto space-y-8 px-4 py-6">
          {/* Create Project Section */}
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FolderOpen className="h-6 w-6 text-blue-600" />
                <span>Start a new workspace</span>
              </CardTitle>
              <CardDescription>
                Create a project to organize your tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                  <div className="md:col-span-4">
                    <Label
                      htmlFor="projectName"
                      className="text-sm font-medium"
                    >
                      Project Name
                    </Label>
                    <Input
                      id="projectName"
                      placeholder="Enter project name"
                      value={projectName}
                      onChange={(e) => {
                        setProjectName(e.target.value);
                        if (projectNameError) setProjectNameError("");
                      }}
                      className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                    {projectNameError && (
                      <Alert
                        variant="destructive"
                        className="animate-slide-up mt-2"
                      >
                        <AlertDescription className="text-xs">
                          {projectNameError}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <div className="md:col-span-6">
                    <Label
                      htmlFor="projectDesc"
                      className="text-sm font-medium"
                    >
                      Description
                    </Label>
                    <Input
                      id="projectDesc"
                      placeholder="Enter project description (optional)"
                      value={projectDesc}
                      onChange={(e) => setProjectDesc(e.target.value)}
                      className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium opacity-0">
                      Create
                    </Label>
                    <Button
                      type="submit"
                      className="h-10 w-full bg-gradient-to-r from-blue-600 to-purple-600 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
                      disabled={createLoading}
                    >
                      {createLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Create
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {projectsLoading ? (
              // Show skeleton loading for projects
              Array.from({ length: 2 }).map((_, index) => (
                <ProjectSkeleton key={index} />
              ))
            ) : projects.length === 0 ? (
              <div className="col-span-full">
                <Card className="border-0 bg-white/80 py-12 text-center shadow-lg backdrop-blur-sm">
                  <CardContent>
                    <FolderOpen className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
                    <h3 className="text-muted-foreground mb-2 text-lg font-semibold">
                      No projects yet
                    </h3>
                    <p className="text-muted-foreground">
                      Create your first project to get started
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              projects.map((project) => (
                <Card
                  key={project.id}
                  className="group flex h-full flex-col border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                          <FolderOpen className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {project.name}
                          </CardTitle>
                          {project.description && (
                            <CardDescription className="mt-1">
                              {project.description}
                            </CardDescription>
                          )}
                        </div>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteProject(project.id)}
                            disabled={projectsLoading}
                            className="h-8 w-8 p-0 text-red-500 transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete project</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-4">
                    <AddTaskForm
                      onAdd={(payload) => addTask(project.id, payload)}
                    />

                    <div className="space-y-3">
                      <h4 className="text-muted-foreground flex items-center text-sm font-semibold">
                        <span className="mr-2 h-2 w-2 rounded-full bg-blue-600"></span>
                        Tasks
                      </h4>
                      <div className="space-y-2">
                        {tasksByProject[project.id] === undefined ? (
                          Array.from({ length: 3 }).map((_, index) => (
                            <TaskSkeleton key={index} />
                          ))
                        ) : (tasksByProject[project.id] || []).length === 0 ? (
                          <div className="py-8 text-center">
                            <p className="text-muted-foreground text-sm">
                              No tasks yet. Add some tasks to get started.
                            </p>
                          </div>
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
