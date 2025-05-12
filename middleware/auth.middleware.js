function authenticate(req, res, next) {
    const { userId } = req.body;
    const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
    const user = db.users.find(u => u.id === userId);

    if (!user) return res.status(401).json({ error: "Tidak terautentikasi" });
    req.user = user;
    next();
}

module.exports = authenticate;
