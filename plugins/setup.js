
/** @param {import("fastify").FastifyInstance} app */
module.exports = async function (app) {
    await app.register(require("fastify-formbody"))
    await app.register(require("fastify-secure-session"), {
        cookieName: "session",
        secret: Buffer.from("2590e22540a197ec32196b92524db7896f8cb072cf0a2b6a44dc2625f316ede2", "hex")
    })
}