const { requireLevel } = require("./_utils")

const level = 1

/** @param {import("fastify").FastifyInstance} app */
module.exports = async function (app) {
    app.get(`/q${level}`, {
        preHandler: requireLevel(level)
    }, async (req, res) => {
        return res.html`
<h1>Q1</h1>
<p>question 1</p>
<p>输入MSC的全称并提交就可以进入下一关（空格不要漏了哦）</p>
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
        if (typeof answer === "string" && answer.toLowerCase() === "microsoft student club") {
            req.userLevel = level
            return res.redirect(`/q${level + 1}`)
        }
        return res.redirect("/wrong-answer")
    })
}
