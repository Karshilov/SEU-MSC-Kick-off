const { requireLevel } = require("./_utils")

const level = 7

/** @param {import("fastify").FastifyInstance} app */
module.exports = async function (app) {
    app.get(`/q${level}`, {
        preHandler: requireLevel(level)
    }, async (req, res) => {
        return res.html`
<h1>Q7</h1>
<p>question 7</p>
<p>XHU0ZTFjIFx1NTM1NyBcdTU5MjcgXHU1YjY2IFx1NzY4NCBcdTgyZjEgXHU2NTg3IFx1N2YyOSBcdTUxOTk=</p>
<!-- 做了那么多题了，这题就送分了吧 -->
<form method="post">
    <input type="text" name="answer" placeholder="msc">
    <input type="submit" value="提交">
</form>
${res.levelInfo(level)}`
    })
    app.post(`/q${level}`, {
        preHandler: requireLevel(level)
    }, async (req, res) => {
        const {answer} = req.body
        if (typeof answer === "string" && answer === "seu") {
            req.userLevel = level
            return res.redirect(`/q8`)
        }
        return res.redirect("/wrong-answer")
    })
}
