
/** @param {import("fastify").FastifyInstance} app */
module.exports = async function (app) {
    app.get("/wrong-answer", async (req, res) => {
        return res.html`
<h2>密码错误，请充值</h2>`
    })
}
