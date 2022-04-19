import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
// import cors from "cors";

const PORT = process.env.PORT || 80;

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8100",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`Connecté au client ${socket.id}`);
});

app.get("/", (_req, res) => res.send("HELLO YOU"));

httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
