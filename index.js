const enmap = require("enmap");
const express = require("express");
let config = require("./config/config");
const ejs = require("ejs");

const Database = new enmap({ name: "socialpointsDB", autoFetch: true, fetchAll: false, dataDir: "Database" })

if (!Database.get("user")) {
    Database.ensure("user", [])
}
Database.set("user", [])
if (!Database.get("ruser")) {
  Database.ensure("ruser", {});
}

const app = express();
app.set("views", __dirname + "/views");
app.set('view engine', ejs);
app.use(express.static('public'))
app.set();

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/api/search/:q", (req, res) => {
    users = Database.get("user");
    seluser = users.filter((obj) => obj.name.toLowerCase().startsWith(req.params.q.toLowerCase()));
    res.json({"users": seluser})
})

app.get("/api/search", (req, res) => {
    res.json({"users": []})
})

app.get("/api/adduser/:uname", (req, res) => {
    users = Database.get("user");
    i = 0;
    users.forEach(el => { if (Number(el.id) > i) i = Number(el.id) });
    i++;
    i = Number(i);
    users.push({ name: req.params.uname, id: i.toString(), descs: [] })
    Database.set("user", users);
    return res.json({ id: i });
})

app.get("/api/addreview/:id/:review", (req, res) => {
    users = Database.get("user");
    users.find((el) => el.id == req.params.id)?.descs.push(req.params.review);
    Database.set("user", users);
    res.json({ "sucess": true });
})

app.get("/user/:id", (req, res) => {
    users = Database.get("user")
    _user = users.find((el) => el.id == req.params.id);
    if (!_user) { res.redirect("/") }
    res.render("view.ejs", {user: _user})
})

app.get("*", (req, res) => {
    res.status(404).json({"For Human": "Ignore this!", "error": "true", "code": 404});
})

app.listen(config.PORT, () => {
    console.log("Botlist is listening on http://localhost:" + config.PORT)
});