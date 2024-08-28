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
const uniqueId = () => {
  return Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user is just connected.`);

  socket.on("getAllGroups", () => {
    socket.emit("groupList", chatGroups);
  });

  socket.on("createNewGroup", (groupName) => {
    const newGroup = {
      id: uniqueId(),
      groupName,
      messages: []
    };
    chatGroups.unshift(newGroup);
    socket.emit("groupList", chatGroups);
  });

  socket.on("newChatMessage", (data) => {
    const { currentUser, message, timeData, groupId } = data;
    const filterGroup = chatGroups.find((item) => item.id === groupId);
  
    if (filterGroup) {
      if (message.trim() === '') {
        return; 
      }
  
      const newMessage = {
        id: uniqueId(),
        text: message,
        currentUser,
        time: `${timeData.hr}:${timeData.mins}`
      };
  
      filterGroup.messages.push(newMessage); 
      socketIO.to(groupId).emit("groupMessage", newMessage); 
      socket.emit("foundGroup", filterGroup.messages); 
    }
  });
});

app.get("/api", (req, res) => {
  res.json(chatGroups);
});

http.listen(port, () => {
  console.log(`Backend Running on Port ${port}`);
});
