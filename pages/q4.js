const { requireLevel } = require("./_utils")

const level = 4

/** @param {import("fastify").FastifyInstance} app */
module.exports = async function (app) {
    app.get(`/q${level}`, {
        preHandler: requireLevel(level)
    }, async (req, res) => {
        return res.html`
<h1>Q4</h1>
<p>question 4</p>
<p>INTRODUCTION</p>
<!-- 上一关的密码可不只是个字符串哦 -->
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
        if (typeof answer === "string" && answer.toLowerCase() === "nothingistrue") {
            req.userLevel = level
            return res.redirect(`/q${level + 1}`)
        }
        return res.redirect("/wrong-answer")
    })
}
