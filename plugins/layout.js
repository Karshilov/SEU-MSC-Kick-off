
const html = require("nanohtml")
const format = require("dateformat")

/** @param {import("fastify").FastifyInstance} app */
module.exports = async function (app) {

    app.get("/css/style.css", async (req, res) => {
        res.type("text/css")
        res.send(`
body,td,th {
	font-family: "Microsoft YaHei UI Light";
	color: #FFFFFF;
	text-align: center;
}
body {
	background-color: #11294E;
	padding: 3% 15%;
	text-align: center;
}
body a {
	color: #6699FF;
}`)
    })
    
    app.decorateReply("html", function () {
        const user = this.request.user
        this.type("text/html; charset=utf-8")
        return html`<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz - MSC</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
<!-- hello, ${user} -->
${html.apply(this, arguments)}
</body>
</html>`.toString()
    })

    app.decorateReply("levelInfo", function (level) {
        const store = app.store
        const userLevels = Object.keys(store.userLevel).map(u => store.userLevel[u])
        const passed = userLevels.filter(x => x >= level).length
        const levelRecords = store.levelRanking[level] || {}
        const first3 = Object.keys(levelRecords)
            .map(x => ({user: x, time: new Date(levelRecords[x])}))
            .sort((a, b) => a.time - b.time)
            .slice(0, 3)
        
        return html`
<hr style="margin-top: 10vh">
<p>已通过：${passed}人</p>
${first3.length ? html`
    <p>前${first3.length}名</p>
    ${first3.map(x => html`<p>${format(x.time, "HH:MM:ss")} - ${x.user}</p>`)}`
: ""}`
    })
    
    app.setNotFoundHandler(async (req, res) => {
        return res.status(404).send(res.html`
<h1>404</h1>
<h2>Oops! Page not found</h2>
<p>此页已经奏了</p>`)
    })
}