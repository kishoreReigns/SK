import express from 'express';
import { json } from 'body-parser';
import { apiRouter } from './services/api';
import { dashboardRouter } from './components/dashboard';
import { projectsRouter } from './components/projects';
import { tasksRouter } from './components/tasks';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use('/api', apiRouter);
app.use('/dashboard', dashboardRouter);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;