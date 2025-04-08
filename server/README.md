# TechForing Task Backend

This directory (`server`) contains the backend application for the TechForing task. It is built using Node.js, Express, and MongoDB.

**Cloud API URL:** [https://techforing-task-server.onrender.com/api](https://techforing-task-server.onrender.com/api)

## Getting Started (Backend)

These instructions will guide you on how to set up and run the backend application locally.

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your system. You can download them from [nodejs.org](https://nodejs.org/). You will also need a MongoDB database running or access to a MongoDB Atlas cluster.

### Installation (Backend)

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `server` directory and add the following environment variables:

    ```env
    PORT=<Your desired port number (e.g., 3001)>
    MONGO_URI="<Your MongoDB connection string (e.g., mongodb+srv://<username>:<password>@<cluster-url>/<database-name>)>"
    JWT_SECRET="<Your secret key for JSON Web Token signing>"
    ```

    Replace the `<placeholders>` with your actual values.

### Running the Backend Application

#### Development Mode

To run the backend application in development mode with automatic restarts on code changes:

```bash
npm run dev
# or
yarn dev