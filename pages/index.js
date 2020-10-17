const html = require("nanohtml")

function render(badname) {
    return html`
<h1>Welcome to MSC</h1>
<form method="post">
    <fieldset>
        <legend for="user">选择一个用户名吧</legend>
        <p>
            <input type="text" name="user" placeholder="lyynb">
            <input type="submit" value="开始解谜">
        </p>
        ${badname !== undefined ? html`<p style="color: red">不能有更多的"${badname}"了</p>` : ""}
    </fieldset>
</form>`
}

/** @param {import("fastify").FastifyInstance} app */
module.exports = async function (app) {
    app.get("/", async (req, res) => {
        if (req.user && typeof req.userLevel === "number" && req.userLevel < 7) {
            return res.redirect(`/q${req.userLevel + 1}`)
        }

        return res.html`${render()}`
    })
    app.post("/", async (req, res) => {
        if (req.user) {
            return res.redirect(`/q${req.userLevel + 1}`)
        }
        const user = req.body.user
        const allusers = new Set(Object.keys(app.store.userLevel).map(x => x.toLowerCase()))
        if (typeof user === "string" && user.length && !allusers.has(user.toLowerCase())) {
            req.user = user
            return res.redirect("/q1")
        }
        return res.html`${render(user)}`
    })
}
