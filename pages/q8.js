const { requireLevel } = require("./_utils")

const level = 8

/** @param {import("fastify").FastifyInstance} app */
module.exports = async function (app) {
    app.get(`/q${level}`, {
        preHandler: requireLevel(level)
    }, async (req, res) => {
        return res.html`
<h2>恭喜你完成了所有的题目</h2>
<h1>Welcome to SEU@MSC!</h1>
${res.levelInfo(level - 1)}`
    })
}
