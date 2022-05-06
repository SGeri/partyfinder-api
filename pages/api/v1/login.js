export default function handler(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ error: "Email és jelszó megadása kötelező!" });
    return;
  }

  if (
    email == process.env.ADMIN_EMAIL &&
    password == process.env.ADMIN_PASSWORD
  ) {
    res.json({ token: process.env.ADMIN_TOKEN });
  } else {
    res.json({ error: "Helytelen bejelentkezési adatok!" });
  }
}
