const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://10.0.2.2:3000",
  },
});

const port = process.env.PORT || 4000;
let chatGroups = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user is just connected.`);

  socket.on("getAllGroups", () => {
    socket.emit("groupList", chatGroups);
  });

  socket.on("createNewGroup", (groupName) => {
    console.log("group name is: ", groupName);
    chatGroups.unshift({ id: chatGroups.length + 1, groupName, message: [] });
    socket.emit("groupList", chatGroups);
  });
});

app.get("/api", (req, res) => {
  res.json(chatGroups);
});

http.listen(port, () => {
  console.log(`Backend Running on Port ${port}`);
});
