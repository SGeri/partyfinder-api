import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const events = await prisma.party.findMany();

    res.json({ success: false, events });
  } catch (e) {
    res.json({ success: true, error: "Hiba történt: " + e });
    return;
  }
}

/* mockdata:
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
*/
