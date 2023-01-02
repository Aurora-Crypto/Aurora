import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { logger } from "@lib/logger";
import { UsersIndexSchema } from "@lib/types/jsonObjects";
import { UsersRequestBody } from "@lib/types/routeParams";
import { FastifyDone } from "@src/lib/types/fastifyTypes";

const indexRoute = (
    server: FastifyInstance,
    { get: getSchema, post: postSchema }: UsersIndexSchema,
    done: FastifyDone
) => {
    const { prisma, log } = server;

    server.get(
        "/",
        getSchema,
        async (_request: FastifyRequest, reply: FastifyReply) => {
            try {
                const users = await prisma.user.findMany();

                reply.send(users);
            } catch (e) {
                if (e instanceof PrismaClientKnownRequestError) {
                    log.fatal(e);
                    reply.code(500).send("Server error");
                }

                logger(log.error, reply, 500, "Couldn't get users.");
            }
        }
    );

    server.post(
        "/",
        postSchema,
        async (request: FastifyRequest, reply: FastifyReply) => {
            const { email, name } = request.body as UsersRequestBody;

            if (!email)
                logger(log.error, reply, 404, "Missing email parameters");

            try {
                const user = await prisma.user.create({
                    data: {
                        email,
                        name
                    }
                });

                reply.code(201).send(user);
            } catch (e) {
                if (e instanceof PrismaClientKnownRequestError) {
                    log.fatal(e);
                    reply.code(500).send("Server error");
                }

                logger(log.error, reply, 500, "Couldn't create user.");
            }
        }
    );

    done();
};

export default indexRoute;
