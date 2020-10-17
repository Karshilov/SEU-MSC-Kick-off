import "fastify"

type Store = {
    userLevel: Record<string, number>
    levelRanking: Record<number, Record<string, string>>
}

declare module "fastify" {
    interface FastifyInstance {
        store: Store
        root: string
    }
    interface FastifyRequest {
        user: string
        userLevel: number
    }
    interface FastifyReply {
        html: import("nanohtml")
        levelInfo(level: number): string
    }
}
