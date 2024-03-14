const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "Alice",
        email: "alice@example.com",
      },
      {
        name: "Bob",
        email: "bob@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd4",
    chatName: "Alice",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Eve",
        email: "eve@example.com",
      },
      {
        name: "Bob",
        email: "bob@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "Eve",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Charlie",
        email: "charlie@example.com",
      },
      {
        name: "Bob",
        email: "bob@example.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd4",
    chatName: "Charlie",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Alice",
        email: "alice@example.com",
      },
      {
        name: "Bob",
        email: "bob@example.com",
      },
      {
        name: "Eve",
        email: "eve@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Friends",
    groupAdmin: {
      name: "Eve",
      email: "eve@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Diana",
        email: "diana@example.com",
      },
      {
        name: "Bob",
        email: "bob@example.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd4",
    chatName: "Diana",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Alice",
        email: "alice@example.com",
      },
      {
        name: "Bob",
        email: "bob@example.com",
      },
      {
        name: "Eve",
        email: "eve@example.com",
      },
    ],
    _id: "617a518c4081150016472c78",
    chatName: "Chill Zone",
    groupAdmin: {
      name: "Eve",
      email: "eve@example.com",
    },
  },
];

module.exports = chats;
