interface initStateProjects {
  projects: projectsTypes[];
}

interface projectsTypes {
  id: number;
  name: string;
}

interface tasksType {
  id: number;
  projectId: number;
  name: string;
  description: string;
  time: number;
  tracking: number;
  startTime: number;
  complete: boolean;
}

interface user {
  uid: string;
  projects: projectsTypes[];
  tasks: tasksType[];
}
