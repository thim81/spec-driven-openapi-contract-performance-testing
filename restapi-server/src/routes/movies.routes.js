import {Router} from "express";
import {prisma} from "../db.js";

import {deserializeField, deserializeFields, serializeFields} from "../utils/serializer.js";
import {validateRequestPayload} from "../utils/prismaValidation.js";
import {handleErrors} from "../utils/errorHandler.js";

const router = new Router();

router.get("/movies", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not provided

    const offset = (page - 1) * limit;

    // Get total number of resources
    const totalResources = await prisma.movie.count();
    const totalPages = Math.ceil(totalResources / limit);

    // Check if the requested page is out of range
    if (offset >= totalResources) {
      return res.status(400).json({
        error: `Page number cannot be greater than ${totalPages}`
      });
    }
    
    // Get resources
    const resources = await prisma.movie.findMany({
      skip: offset,
      take: limit,
    });

    // Deserialize
    deserializeFields(resources, 'release_date', 'dateTime')

    const pagination = {
      total: totalResources,
      current_page: page,
      next_page: page < totalPages ? page + 1 : null,
      prev_page: page > 1 ? page - 1 : null,
      per_page: limit,
      total_pages: totalPages
    };

    // Return data as JSON response
    res.json({
      movies: resources,
      pagination: pagination,
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
});

router.post("/movies", async (req, res) => {
  try {
    // Serialize
    serializeFields(req.body, 'release_date', 'dateTime')

    // Validate request body
    const validatedPayload = await validateRequestPayload('Movie', req.body);

    const newResource = await prisma.movie.create({
      data: validatedPayload,
    });

    // Deserialize
    deserializeField(newResource, 'release_date', 'dateTime')

    res.json(newResource);
  } catch (error) {
    // Handle errors generic
    handleErrors(res, error);
  }
});

router.get("/movies/:id", async (req, res) => {
  try {
    const resource = await prisma.movie.findFirst({
      where: {
        id: +req.params.id,
      }
    });

    if (!resource) return res.status(404).json({error: "Resource not found"});

    // Deserialize
    deserializeField(resource, 'release_date', 'dateTime')

    res.json(resource);
  } catch (error) {
    // Handle errors generic
    handleErrors(res, error);
  }
});


router.put("/movies/:id", async (req, res) => {
  try {
    const resourceId = +req.params.id;

    // Serialize
    serializeFields(req.body, 'release_date', 'dateTime')

    // Validate request body
    const validatedPayload = await validateRequestPayload('Movie', req.body);

    const updatedResource = await prisma.movie.update({
      where: {
        id: resourceId,
      },
      data: validatedPayload,
    });

    // Deserialize
    deserializeField(updatedResource, 'release_date', 'dateTime');

    res.json(updatedResource);
  } catch (error) {
    // Handle errors generic
    handleErrors(res, error);
  }
})

router.delete("/movies/:id", async (req, res) => {
  try {
    const resource = await prisma.movie.delete({
      where: {
        id: +req.params.id,
      },
    });

    res.status(204).send()
  } catch (error) {
    // Handle errors generic
    handleErrors(res, error);
  }
});

export default router;
