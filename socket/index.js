const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173/" });

let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("a user connected with id: ", socket.id);

    socket.on("addNewUser", (userId) => {
        if (userId) {
            const user = onlineUsers.find((user) => user.userId === userId);
            if (user) {
                user.socketIds.push(socket.id);
                console.log("user already online: ", userId);
                return;
            } else {
                console.log("new user added: ", userId);
                onlineUsers.push({ userId, socketIds: [socket.id] });
            }
        }

        io.emit("onlineUsers", onlineUsers);
        console.log("online users: ", onlineUsers);
    });

    socket.on("disconnect", () => {
        console.log(`user with ID ${socket.id} disconnected`);
        user = onlineUsers.find((u) => u.socketIds.includes(socket.id));
        if (!user) {
            return;
        }

        user.socketIds = user.socketIds.filter((id) => id !== socket.id);
        if (user.socketIds.length === 0) {
            onlineUsers = onlineUsers.filter((u) => u.userId !== user.userId);
        }

        io.emit("onlineUsers", onlineUsers);
    });
});

io.listen(5000);
