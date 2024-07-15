import * as mongodb  from "mongodb";

import { Buyer } from "./buyer";

export const collections: {
    buyer?: mongodb.Collection<Buyer>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("visor-tech-retail");
    await applySchemaValidation(db);

    const buyerCollection = db.collection<Buyer>("buyer");
    collections.buyer = buyerCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "email", "passwordHash", "createdAt", "updatedAt"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                email: {
                    bsonType: "string",
                    description: "'email' is required and is a string",
                    minLength: 10
                },
                passwordHash: {
                    bsonType: "string",
                    description: "'passwordHash' is required and is a string",
                },
                phone:{
                    bsonType: "number",
                    description: "'phone' is required and is a number",
                },
                createdAt:{
                    bsonType: "date",
                    description: "'createdAt' is required and is a date",
                },
                updatedAt:{
                    bsonType: "date",
                    description: "'updatedAt' is required and is a date",
                }

            },
        },
    };

    await db.command({
        collMod: "buyer", 
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("buyer", {validator: jsonSchema});
        }
    });
}
