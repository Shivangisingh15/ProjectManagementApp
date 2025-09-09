export const APP_CONSTANTS = {
  APP_NAME: 'Project Management',
  VERSION: '1.0.0',
  
  TASK_STATUS: {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    DONE: 'done',
  },
  
  PROJECT_STATUS: {
    ACTIVE: 'active',
    COMPLETED: 'completed',
    ON_HOLD: 'on_hold',
  },
  
  TIMER_STATUS: {
    STOPPED: 'stopped',
    RUNNING: 'running',
    PAUSED: 'paused',
  },
  
  ONBOARDING_SLIDES: [
    {
      key: '1',
      title: 'Manage Projects Efficiently',
      text: 'Organize and track all your projects in one place with powerful project management tools.',
      image: 'project_management',
    },
    {
      key: '2',
      title: 'Kanban Board',
      text: 'Visualize your workflow with intuitive Kanban boards. Drag and drop tasks to track progress.',
      image: 'kanban_board',
    },
    {
      key: '3',
      title: 'Time Tracking',
      text: 'Track time spent on tasks and projects. Generate detailed reports for better productivity.',
      image: 'time_tracking',
    },
    {
      key: '4',
      title: 'Team Collaboration',
      text: 'Work together with your team in shared workspaces. Assign tasks and collaborate efficiently.',
      image: 'team_collaboration',
    },
  ],
};
