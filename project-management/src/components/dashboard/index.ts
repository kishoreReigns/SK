import React from 'react';

const Dashboard: React.FC = () => {
    // Sample data for demonstration
    const projectStats = {
        totalProjects: 10,
        completedTasks: 25,
        pendingTasks: 5,
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Project Statistics</h2>
            <ul>
                <li>Total Projects: {projectStats.totalProjects}</li>
                <li>Completed Tasks: {projectStats.completedTasks}</li>
                <li>Pending Tasks: {projectStats.pendingTasks}</li>
            </ul>
        </div>
    );
};

export default Dashboard;