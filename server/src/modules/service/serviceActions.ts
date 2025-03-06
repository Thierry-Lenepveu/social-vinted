import type { RequestHandler } from "express";
import serviceRepository from "./serviceRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all services
    const services = await serviceRepository.readAll();

    // Respond with the services in JSON format
    res.json(services);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific service based on the provided ID
    const serviceId = Number(req.params.id);
    const service = await serviceRepository.read(serviceId);

    // If the service is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the service in JSON format
    if (service == null) {
      res.sendStatus(404);
    } else {
      res.json(service);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the service data from the request body
    const newService = {
      date: req.body.date,
      title: req.body.title,
      description: req.body.description,
      category_id: req.body.category_id,
      user_id: req.body.user_id,
    };

    // Create the service
    const insertId = await serviceRepository.create(newService);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted service
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Add (Delete) operation
const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific service based on the provided ID
    const serviceId = Number(req.params.id);
    const service = await serviceRepository.delete(serviceId);

    // If the service is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the service in JSON format
    if (service == null) {
      res.sendStatus(404);
    } else {
      await serviceRepository.delete(serviceId);
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add, destroy };
