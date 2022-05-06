import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    name,
    organizer,
    locationDisplay,
    locationCoords,
    date,
    description,
    link,
  } = req.body;

  console.log(req.body);

  if (
    !name ||
    !organizer ||
    !locationDisplay ||
    !locationCoords ||
    !date ||
    !description ||
    !link
  ) {
    res.json({ error: "További szükséges adatok!" });
    return;
  }

  try {
    const event = await prisma.party.create({
      data: {
        name,
        organizer,
        locationDisplay,
        locationCoords,
        date: new Date(date),
        description,
        link,
      },
    });

    res.json({ success: true, id: event.id });
  } catch (e) {
    res.json({ error: "Hiba történt: " + e });
    return;
  }
}
