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
