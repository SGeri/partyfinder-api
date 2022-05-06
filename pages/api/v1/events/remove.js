import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.body;

  if (!id) {
    res.json({ error: "Az eseményazonosító megadása kötelező!" });
    return;
  }

  try {
    await prisma.party.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({ success: true });
  } catch (e) {
    res.json({ error: "Hiba történt: " + e });
    return;
  }
}
