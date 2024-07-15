import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";

export const buyerRouter = express.Router();
buyerRouter.use(express.json());

buyerRouter.get("/", async (_req, res) => {
    try {
        const buyers = await collections?.buyer?.find({}).toArray();
        res.status(200).send(buyers);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

buyerRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const buyer = await collections?.buyer?.findOne(query);

        if (buyer) {
            res.status(200).send(buyer);
        } else {
            res.status(404).send(`Failed to find a buyer: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find a buyer: ID ${req?.params?.id}`);
    }
});

buyerRouter.post("/", async (req, res) => {
    try {
        const buyer = req.body;
        const result = await collections?.buyer?.insertOne(buyer);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new buyer: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new buyer.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

buyerRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const employee = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.buyer?.updateOne(query, { $set: employee });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a buyer: ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find a buyer: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update a buyer: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

buyerRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.buyer?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a buyer: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove a buyer: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find a buyer: ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});