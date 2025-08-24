# Confera - Real-Time Video Chat Application

Confera is a modern, full-stack video chat application designed for seamless real-time communication. It allows users to create accounts, join video meetings, and interact through video, audio, and text chat. The project is built with a robust MERN-stack architecture (MongoDB, Express, React, Node.js) and utilizes WebRTC for high-quality, peer-to-peer video streaming.

---

## ✨ Features Breakdown

### Frontend (Client-Side)

-   **Authentication Pages**: Clean, intuitive forms for user registration and login.
-   **Protected Routes**: Ensures that only authenticated users can access core application pages like the home and history screens.
-   **Home Dashboard**: A central hub for authenticated users to start or join meetings by entering a meeting code.
-   **Interactive Video Room**:
    -   **Media Controls**: Simple toggles to mute/unmute the microphone and turn the camera on/off.
    -   **Screen Sharing**: Functionality to share your screen with other participants for presentations or collaboration.
    -   **Real-Time Chat**: An integrated chat panel for sending and receiving text messages during a call.
-   **Meeting History**: A dedicated page that lists all past meetings a user has joined, with the ability to rejoin any meeting with a single click.

### Backend (Server-Side)

-   **Secure User API**: RESTful endpoints for handling user registration and login.
-   **Password Hashing**: Utilizes **bcrypt** to securely hash and salt user passwords, ensuring they are never stored in plain text.
-   **JWT Authentication**: Implements JSON Web Tokens to secure the API. A token is generated on login and used to authenticate subsequent requests.
-   **Meeting History API**: Endpoints to save a new meeting to a user's record and to fetch the complete history for a logged-in user.
-   **Real-Time Signaling Server (Socket.IO)**:
    -   **WebRTC Signaling**: Manages the exchange of connection metadata (offers, answers, ICE candidates) required to establish direct peer-to-peer video streams.
    -   **Room Management**: Handles users joining and leaving specific meeting rooms and notifies other participants of these events.
    -   **Chat Broadcasting**: Relays live chat messages to all participants within the same meeting room.
-   **Database Modeling**: Uses **Mongoose** to define schemas and models for `Users` and `Meetings` for structured data storage in MongoDB.
-   **CORS Configuration**: Properly configured to allow requests from the deployed frontend application, ensuring smooth communication between the two services.

---

## 🛠️ Tech Stack

| Category         | Technology                                                              |
| ---------------- | ----------------------------------------------------------------------- |
| **Frontend** | React, Vite, React Router, Material-UI, Axios, Socket.IO Client         |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, Socket.IO, JSON Web Token (JWT) |
| **Real-Time** | WebRTC, Socket.IO                                                       |
| **Database** | MongoDB                                                                 |

---

## ⚙️ Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

- **Node.js** (v18 or later)
- **npm** (Node Package Manager)
- **MongoDB** (A running instance, either local or on a cloud service like MongoDB Atlas)


## 🏃‍♂️ Running the Application

1.  **Start the Backend Server**
    From the `backend` directory, run:
    ```sh
    npm run dev
    ```
    The server will start on the port specified in your `.env` file (e.g., `http://localhost:8000`).

2.  **Start the Frontend Development Server**
    From the `frontend` directory, run:
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---



<img width="1919" height="862" alt="image" src="https://github.com/user-attachments/assets/693a916e-1f60-4317-9341-f9dcd314eb28" />


<img width="1919" height="862" alt="image" src="https://github.com/user-attachments/assets/091a4fb7-7ff1-4d48-883f-c0054a62d5df" />


<img width="1918" height="863" alt="image" src="https://github.com/user-attachments/assets/4940dd32-b12e-484a-90be-627303216c2d" />

