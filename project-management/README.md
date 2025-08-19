# Project Management Application

This project is a web application designed for managing projects and tasks efficiently. It provides a user-friendly interface to create, edit, and track projects and their associated tasks.

## Features

- **Dashboard**: Displays project statistics and an overview of tasks.
- **Projects Management**: List all projects and allows users to create or edit them.
- **Task Management**: Manage tasks associated with a project, including adding, editing, and deleting tasks.

## File Structure

```
project-management
├── src
│   ├── components
│   │   ├── dashboard
│   │   ├── projects
│   │   └── tasks
│   ├── models
│   │   ├── Project.ts
│   │   └── Task.ts
│   ├── services
│   │   └── api.ts
│   ├── utils
│   │   └── helpers.ts
│   └── app.ts
├── tests
│   └── unit
│       └── helpers.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd project-management
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To start the application, run:
```bash
npm start
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.