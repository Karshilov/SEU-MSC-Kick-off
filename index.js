const fastify = require("fastify").default
const fs = require("fs").promises
const path = require("path")

const root = path.resolve(__dirname)

async function main() {

    const app = fastify({
        logger: true
    })

    app.decorate("root", root)

    for (const dirname of ["plugins", "pages"]) {
        const dir = path.resolve(root, dirname)
        const pages = await fs.readdir(dir)
        for (const p of pages) {
            if (!p.startsWith("_")){
                await require(path.resolve(dir, p))(app)
            }
        }
    }

    
    await app.listen(8080)
}

main()
