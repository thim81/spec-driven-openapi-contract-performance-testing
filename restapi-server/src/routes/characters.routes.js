import {Router} from "express";
import {prisma} from "../db.js";

import {deserializeField, deserializeFields, serializeFields} from "../utils/serializer.js";
import {validateRequestPayload} from "../utils/prismaValidation.js";
import {handleErrors} from "../utils/errorHandler.js";

const router = new Router();

router.get("/characters", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = (req.query.limit !== undefined) ? parseInt(req.query.limit) : 10; // Default limit to 10 if not provided

    const offset = (page - 1) * limit;

    // Get total number of resources
    const totalResources = await prisma.character.count();
    const totalPages = Math.ceil(totalResources / limit);

    // Check if the requested page is out of range
    if (offset >= totalResources) {
      return res.status(400).json({
        error: `Page number cannot be greater than ${totalPages}`
      });
    }

    // Check if the requested limit is out of range
    if (limit > 100 || limit <= 0) {
      return res.status(400).json({
        error: `Limit cannot be greater than 100 or less than 1`
      });
    }

    // Get resources
    const resources = await prisma.character.findMany({
      skip: offset,
      take: limit,
    });

    // Deserialize
    deserializeFields(resources, 'powers', 'array');

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
      characters: resources,
      pagination: pagination,
    });
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
});

router.post("/characters", async (req, res) => {
  try {
    // Serialize
    serializeFields(req.body, 'powers', 'array')

    // Validate request body
    const validatedPayload = await validateRequestPayload('Character', req.body);

    const newResource = await prisma.character.create({
      data: validatedPayload,
    });

    // Deserialize
    deserializeField(newResource, 'powers','array');

    res.json(newResource);
  } catch (error) {
    // Handle errors generic
    handleErrors(res, error);
  }
});

router.get("/characters/:id", async (req, res) => {
  try {
    const resource = await prisma.character.findFirst({
      where: {
        id: +req.params.id,
      }
    });

    if (!resource) return res.status(404).json({error: "Resource not found"});

    // Deserialize
    deserializeField(resource, 'powers', 'array');

    res.json(resource);
  } catch (error) {
    // Handle errors generic
    handleErrors(res, error);
  }
});


router.put("/characters/:id", async (req, res) => {
  try {
    const resourceId = +req.params.id;

    // Serialize
    serializeFields(req.body, 'powers', 'array')

    // Validate request body
    const validatedPayload = await validateRequestPayload('Character', req.body);

    const updatedResource = await prisma.character.update({
      where: {
        id: resourceId,
      },
      data: validatedPayload,
    });

    // Deserialize
    deserializeField(updatedResource, 'powers', 'array');

    res.json(updatedResource);
  } catch (error) {
    // Handle errors generic
    handleErrors(res, error);
  }
})

router.delete("/characters/:id", async (req, res) => {
  try {
    const resource = await prisma.character.delete({
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
