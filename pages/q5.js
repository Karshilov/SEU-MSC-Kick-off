const { requireLevel } = require("./_utils")

const level = 5

/** @param {import("fastify").FastifyInstance} app */
module.exports = async function (app) {
    app.get(`/q${level}`, {
        preHandler: requireLevel(level)
    }, async (req, res) => {
        return res.html`
<h1>Q5</h1>
<p>question 5</p>
<p>芜湖的密文</p>
<p>巴卜歪比歪比歪比巴卜歪比歪比歪比巴卜歪比歪比歪比巴卜歪比巴卜歪比巴卜歪比歪比巴卜歪比巴卜巴卜巴卜巴卜歪比歪比歪比巴卜歪比巴卜歪比巴卜歪比歪比巴卜歪比巴卜歪比歪比巴卜歪比歪比巴卜巴卜巴卜巴卜歪比巴卜歪比歪比巴卜歪比巴卜巴卜歪比巴卜歪比歪比巴卜巴卜巴卜歪比歪比巴卜歪比歪比巴卜歪比巴卜巴卜巴卜巴卜歪比歪比巴卜歪比歪比歪比歪比巴卜歪比歪比巴卜歪比歪比歪比巴卜巴卜歪比歪比巴卜巴卜歪比歪比歪比</p>
<!-- 针不辍，这届新人针不辍 -->
<!-- 不过如果你认真做了上一题应该不会来看这个才对？怎么回事，小老弟？ -->
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
        if (typeof answer === "string" && answer.toLowerCase() === "wuhukaichong") {
            req.userLevel = level
            return res.redirect(`/q${level + 1}`)
        }
        return res.redirect("/wrong-answer")
    })
}
