const { requireLevel } = require("./_utils")

const level = 3

/** @param {import("fastify").FastifyInstance} app */
module.exports = async function (app) {
    app.get(`/q${level}`, {
        preHandler: requireLevel(level)
    }, async (req, res) => {
        return res.html`
<h1>Q3</h1>
<p>question 3</p>
<p>有图有真相</p>
<img src="https://bbsobs.seu.edu.cn/herald-bbs/static/secrets.png" width="800px"/>
<!-- 密码就在图片里，但是在哪里呢？ -->
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
        if (typeof answer === "string" && answer === "BV1Sf4y117f5") {
            req.userLevel = level
            return res.redirect(`/q${level + 1}`)
        }
        return res.redirect("/wrong-answer")
    })
}
