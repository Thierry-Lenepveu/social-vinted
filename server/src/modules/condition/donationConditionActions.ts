import type { RequestHandler } from "express";
import donationConditionRepository from "./donationConditionRepository";
import { tr } from "@faker-js/faker/.";

// The B of BREAD - Browse operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all conditions
    const conditions = await donationConditionRepository.readAll();

    // Respond with the conditions in JSON format
    res.json(conditions);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific condition based on the provided ID
    const conditionId = Number(req.params.id);
    const condition = await donationConditionRepository.read(conditionId);

    // If the condition is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the condition in JSON format
    if (condition == null) {
      res.sendStatus(404);
    } else {
      res.json(condition);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit: RequestHandler = async (req, res, next) => {
  try {
    // Extract the condition data from the request body
    const updatedCondition = {
      id: Number(req.params.id),
      name: req.body.name,
    };

    // Update the condition
    const affectedRows =
      await donationConditionRepository.update(updatedCondition);

    // If the condition is not updated, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 204 (No Content)
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the condition data from the request body
    const newCondition = {
      name: req.body.name,
    };

    // Create the donation
    const insertId = await donationConditionRepository.create(newCondition);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted donation
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Delete a specific category based on the provided ID
    const conditionId = Number(req.params.id);

    await donationConditionRepository.delete(conditionId);

    // Respond with HTTP 204 (No Content) anyway
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
