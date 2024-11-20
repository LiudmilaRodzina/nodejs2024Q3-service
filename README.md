## Home Library Service

### Description

This Home Library Service is developed with NestJS and Node.js. Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library.

### Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/get-started).

### Get started

To get started, clone the repository with the following command:

```bash
git clone https://github.com/liudmilarodzina/nodejs2024Q3-service.git
```

Navigate to the project directory:

```bash
cd nodejs2024Q3-service
```

Switch to development branch:

```bash
git checkout part_2
```

### Configuration

Application is running on port by default: http://localhost:4000

You can change the port. Open the `.env` file and set the desired port number:

```bash
PORT=4000
```

### Running application

#### Using Docker

To start the application:

```bash
npm run docker:up
```

Open your browser and navigate to http://localhost:4000 to access the application.

To stop the containers:

```bash
npm run docker:down
```

To scan Docker images for vulnerabilities:

```bash
npm run docker:scan
```

#### Without Docker

Install the dependencies:

```bash
npm install
```

To start the application:

```bash
npm run start
```

To run the app in development mode with hot-reloading, use:

```bash
npm run start:dev
```

### API Documentation

API Documentation is provided in doc/api.yaml file

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
