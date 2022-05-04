export default function handler(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ error: "Email és jelszó megadása kötelező!" });
    return;
  }

  if (email == "email" && password == "password") {
    res.json({ token: "123" });
  } else {
    res.json({ error: "Helytelen bejelentkezési adatok!" });
  }
}
