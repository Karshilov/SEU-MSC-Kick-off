
/** @type {(level: number) => import("fastify").preHandlerHookHandler} */
module.exports.requireLevel = function (level) {
    return async function (req, res) {
        if (level > 1 && req.userLevel < level - 1) {
            return res.callNotFound()
        }
    }
}
