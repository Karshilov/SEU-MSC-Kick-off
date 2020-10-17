const { requireLevel } = require("./_utils")

const level = 2

/** @param {import("fastify").FastifyInstance} app */
module.exports = async function (app) {
    app.get(`/q${level}`, {
        preHandler: requireLevel(level)
    }, async (req, res) => {
        return res.html`
<h1>Q2</h1>
<p>question 2</p>
<p>这次答案没有显示出来……藏在哪里了呢？</p>
<p>HINT：右键是个好东西</p>
<!-- 本关答案是msc20years -->
<!-- 恭喜你掌握了F12这一重要技能 -->
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
        if (typeof answer === "string" && answer.toLowerCase() === "msc20years") {
            req.userLevel = level
            return res.redirect(`/q${level + 1}`)
        }
        return res.redirect("/wrong-answer")
    })
}
