import fastify, { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

import SwaggerOptions from "../docs/options";
import { prismaPlugin } from "./plugins";
import user from "./routes/user";
import users from "./routes/users";

const runServer = async () => {
    const server = fastify();

    await server.register(prismaPlugin);

    const { swaggerOptions, swaggerUIOptions } = SwaggerOptions;
    // @ts-ignore
    await server.register(swagger, swaggerOptions);
    await server.register(swaggerUI, swaggerUIOptions);

    server.register(
        (server: FastifyInstance, _: any, done: () => void) => {
            server.register(users, { prefix: "/users" });
            server.register(user, { prefix: "/user" });

            done();
        },
        { prefix: "/api/v1" }
    );

    server.get("/ping", async (_request, _reply) => {
        return "pong\n";
    });

    await server.ready();
    server.listen({ port: 8000 }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
};

runServer();
