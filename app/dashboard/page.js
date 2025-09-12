"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useProjectStore } from "@/store/useProjectStore";
import { useTaskStore } from "@/store/useTaskStore";
import {
  Plus,
  FolderOpen,
  Trash2,
  Loader2,
  Sparkles,
  Target,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
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
  <Card className="animate-in fade-in bg-card h-full border shadow-sm duration-500">
    <CardHeader>
      <div className="flex items-center space-x-3">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-4 w-20" />
      <div className="space-y-2">
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
    </CardContent>
  </Card>
);

const TaskSkeleton = () => (
  <div className="bg-card/50 animate-in fade-in rounded-lg border p-4 duration-300">
    <div className="flex items-center space-x-3">
      <Skeleton className="h-5 w-5 rounded-full" />
      <Skeleton className="h-4 flex-1" />
      <Skeleton className="h-6 w-20 rounded-md" />
    </div>
  </div>
);

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, color }) => (
  <Card className="hover-lift bg-card border shadow-sm transition-all hover:shadow-md">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <p className="text-foreground mt-1 text-2xl font-bold">{value}</p>
        </div>
        <div className={`rounded-lg p-3 ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const { fetchMe, loading: authLoading, user } = useAuthStore();
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

  // Calculate stats
  const totalTasks = Object.values(tasksByProject).flat().length;
  const completedTasks = Object.values(tasksByProject)
    .flat()
    .filter((task) => task.status === "Done").length;
  const inProgressTasks = Object.values(tasksByProject)
    .flat()
    .filter((task) => task.status === "In Progress").length;
  const todoTasks = Object.values(tasksByProject)
    .flat()
    .filter((task) => task.status === "Todo").length;

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Header />

        <div className="container mx-auto space-y-8 px-4 py-8">
          {/* Welcome Section */}
          <div className="animate-in fade-in slide-in-from-bottom space-y-2 duration-500">
            <h1 className="text-foreground text-3xl font-bold tracking-tight">
              Welcome back,{" "}
              <span className="gradient-text">
                {user?.displayName || user?.email || "User"}
              </span>
            </h1>
            <p className="text-muted-foreground">
              Here&apos;s an overview of your projects and tasks
            </p>
          </div>

          {/* Stats Grid */}
          <div className="animate-in fade-in slide-in-from-bottom grid grid-cols-1 gap-4 duration-700 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Projects"
              value={projects.length}
              icon={FolderOpen}
              color="bg-blue-500"
            />
            <StatsCard
              title="Total Tasks"
              value={totalTasks}
              icon={Target}
              color="bg-purple-500"
            />
            <StatsCard
              title="In Progress"
              value={inProgressTasks}
              icon={Clock}
              color="bg-yellow-500"
            />
            <StatsCard
              title="Completed"
              value={completedTasks}
              icon={CheckCircle2}
              color="bg-green-500"
            />
          </div>

          {/* Create Project Section */}
          <Card className="animate-in fade-in slide-in-from-bottom bg-card border shadow-sm duration-900">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <Sparkles className="text-primary h-5 w-5" />
                <span>Create New Project</span>
              </CardTitle>
              <CardDescription>
                Start organizing your tasks with a new project
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
                      placeholder="e.g., Website Redesign"
                      value={projectName}
                      onChange={(e) => {
                        setProjectName(e.target.value);
                        if (projectNameError) setProjectNameError("");
                      }}
                      className="bg-background/50 border-muted focus-ring mt-1"
                      required
                    />
                    {projectNameError && (
                      <Alert
                        variant="destructive"
                        className="animate-in slide-in-from-top mt-2 duration-200"
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
                      Description (Optional)
                    </Label>
                    <Input
                      id="projectDesc"
                      placeholder="Brief description of your project"
                      value={projectDesc}
                      onChange={(e) => setProjectDesc(e.target.value)}
                      className="bg-background/50 border-muted focus-ring mt-1"
                    />
                  </div>
                  <div className="flex items-end md:col-span-2">
                    <Button
                      type="submit"
                      className="hover-lift w-full"
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
                <Card className="animate-in fade-in zoom-in bg-card border py-16 text-center shadow-sm duration-500">
                  <CardContent>
                    <FolderOpen className="text-muted-foreground/50 mx-auto mb-4 h-16 w-16" />
                    <h3 className="text-foreground mb-2 text-xl font-semibold">
                      No projects yet
                    </h3>
                    <p className="text-muted-foreground">
                      Create your first project to start managing tasks
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              projects.map((project, index) => (
                <Card
                  key={project.id}
                  className="group hover-lift animate-in fade-in slide-in-from-bottom bg-card flex h-full flex-col border shadow-sm transition-all duration-500 hover:shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                          <FolderOpen className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-foreground text-lg">
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
                            className="text-destructive h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
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
                      <div className="flex items-center justify-between">
                        <h4 className="text-foreground flex items-center text-sm font-semibold">
                          <span className="bg-primary mr-2 h-2 w-2 animate-pulse rounded-full"></span>
                          Tasks
                        </h4>
                        <span className="text-muted-foreground text-xs">
                          {(tasksByProject[project.id] || []).length} tasks
                        </span>
                      </div>
                      <div className="max-h-96 space-y-2 overflow-y-auto pr-2">
                        {tasksByProject[project.id] === undefined ? (
                          Array.from({ length: 3 }).map((_, index) => (
                            <TaskSkeleton key={index} />
                          ))
                        ) : (tasksByProject[project.id] || []).length === 0 ? (
                          <div className="py-12 text-center">
                            <AlertCircle className="text-muted-foreground/30 mx-auto mb-3 h-10 w-10" />
                            <p className="text-muted-foreground text-sm">
                              No tasks yet. Add your first task above.
                            </p>
                          </div>
                        ) : (
                          (tasksByProject[project.id] || []).map(
                            (task, taskIndex) => (
                              <div
                                key={task.id}
                                className="animate-in fade-in slide-in-from-left duration-300"
                                style={{
                                  animationDelay: `${taskIndex * 50}ms`,
                                }}
                              >
                                <TaskRow
                                  task={task}
                                  onUpdate={(updates) =>
                                    updateTask(project.id, task.id, updates)
                                  }
                                  onDelete={() =>
                                    deleteTask(project.id, task.id)
                                  }
                                />
                              </div>
                            ),
                          )
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
