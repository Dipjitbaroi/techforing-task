## Client (Frontend)

The frontend application is located in the `client` directory and is built using React, Vite, Material-UI, Redux Toolkit, and Tailwind CSS.

**Cloud URL (Frontend):** [https://techforing-task-mu.vercel.app](https://techforing-task-mu.vercel.app)

### Getting Started (Client)

These instructions will guide you on how to set up and run the frontend client application locally.

#### Prerequisites

Make sure you have Node.js and npm (or yarn) installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

#### Installation (Client)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Dipjitbaroi/techforing-task
    cd techforing-task
    ```

2.  **Navigate to the client directory:**
    ```bash
    cd client
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables (Client)

The frontend application uses environment variables for configuration. Create a `.env.local` file in the `client` directory and define the following:

```env
VITE_API_URL="<Your Backend API URL>"

### Running the Client Application

#### Development Mode (Client)

To run the client application in development mode with hot-reloading:

```bash
npm run dev
# or
yarn dev
