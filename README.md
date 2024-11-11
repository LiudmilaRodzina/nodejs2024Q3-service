## Home Library Service

### Description

This Home Library Service is developed with NestJS and Node.js. Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library.

### Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

### Clone Repository

To get started, clone the repository with the following command:

```bash
git clone {repository URL}
```

### Install Dependencies

Navigate to the project directory and run:

```bash
npm install
```

### Configuration

Application is running on port by default: http://localhost:4000

You can change the port. Open the `.env` file and set the desired port number:

```bash
PORT=4000
```

### Running application

To start the application:

```bash
npm run start
```

To run the app in development mode with hot-reloading, use:

```bash
npm run start:dev
```

### Testing

After application running open new terminal and enter:

To run all tests without authorization

```bash
npm run test
```

To run only one of all test suites

```bash
npm run test -- <path to suite>
```

#### Auto-fix and format

Ensure code quality and consistency by running:

```bash
npm run lint
```

```bash
npm run format
```

#### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
