import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    id,
    name,
    organizer,
    locationDisplay,
    locationCoords,
    date,
    description,
    link,
  } = req.body;

  if (!id) {
    res.json({ error: "Az eseményazonosító megadása kötelező!" });
    return;
  }

  try {
    await prisma.party.update({
      where: {
        id: Number(id),
      },
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
