const fs = require("fs").promises
const path = require("path")

/** @param {import("fastify").FastifyInstance} app */
module.exports = async function (app) {

    const storeFile = path.resolve(app.root, "store.json")
    
    /** @type {import("..").Store} */
    const store = JSON.parse((await fs.readFile(storeFile, "utf8")) || "{}")
    if (!store.levelRanking) store.levelRanking = {}
    if (!store.userLevel) store.userLevel = {}
    app.decorate("store", store)
    
    app.decorateRequest("user", undefined)
    app.decorateRequest("userLevel", undefined)
    app.addHook("preHandler", async (req, res) => {
        if (req.user || req.url === "/css/style.css") return
        if (req.url !== "/" && !req.session.get("user")) {
            req.user = "(anonymous)"
            return res.callNotFound()
        }
        res.header("Cache-Control", "no-store")
        Object.defineProperties(req, {
            user: {
                get() { return req.session.get("user") },
                set(v) {
                    req.session.set("user", v)
                    if (store.userLevel[v] ===  undefined) {
                        store.userLevel[v] = 0
                        fs.writeFile(storeFile, JSON.stringify(store, undefined, 2))
                    }
                },
            },
            userLevel: {
                get() { return store.userLevel[req.session.get("user")] || 0 },
                set(v) {
                    const user = req.session.get("user")
                    const level = store.userLevel[user] || 0
                    if (v < level) return
                    if (!store.levelRanking[v]) {
                        store.levelRanking[v] = {}
                    }
                    if (store.levelRanking[v][user] === undefined) {
                        store.userLevel[user] = v
                        store.levelRanking[v][user] = new Date().toISOString()
                        fs.writeFile(storeFile, JSON.stringify(store, undefined, 2))
                    }
                },
            },
        })
    })
}