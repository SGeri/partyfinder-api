export default function handler(req, res) {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token || token !== "123") {
    res.json({ error: "Helytelen token!" });
    return;
  }

  res.json({ success: true });
}
