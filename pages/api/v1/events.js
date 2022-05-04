export default function handler(req, res) {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token || token !== "123") {
    res.json({ error: "Helytelen token!" });
    return;
  }

  res.json({
    events: [
      {
        id: 1,
        name: "Offline Party 2021",
        location: "Storyclub",
        date: "08.19 19:00",
        description: "Az Offline Party sorozat 1. része.",
      },
      {
        id: 2,
        name: "Offline Party 2022",
        location: "Remix",
        date: "08.20 20:00",
        description: "Az Offline Party sorozat 2. része.",
      },
      {
        id: 3,
        name: "Offline Party 2023",
        location: "Morrisons 2",
        date: "08.21 21:00",
        description: "Az Offline Party sorozat 3. része.",
      },
    ],
  });
}
