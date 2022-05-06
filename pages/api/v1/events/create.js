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
    await prisma.party.create({
      data: {
        name,
        organizer,
        locationDisplay,
        locationCoords,
        date,
        description,
        link,
      },
    });

    res.json({ success: true });
  } catch (e) {
    res.json({ error: "Hiba történt: " + e });
    return;
  }
}
