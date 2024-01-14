// errorHandler.js

import { Prisma } from "@prisma/client";

export const handleErrors = (res, error) => {

  if (error instanceof Prisma.PrismaClientValidationError) {
    console.log('404', error)
    return res.status(404).json({ error: "Resource not found" });
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    console.log('408', error.message)
    return res.status(408).json({ error: "Request Timeout" });
  }

  if (error.code === "VALIDATION_ERROR") {
    console.log('422', error.details)
    // Handle validation error
    return res.status(422).json({
      error: "Validation errors",
      details: error.details,
    });
  }

  if (error.code === "P2002") {
    console.log(error.code, error.message)
    // Prisma error code 'P2002' corresponds to unique constraint violation
    const fieldName = error.meta.target[0];
    return res.status(422).json({
      error: "Validation errors",
      details: [
        {
          field: fieldName,
          message: `Field '${fieldName}' must be unique.`
        },
      ],
    });
  }

  if (error.code === "P2016" || error.code === "P2025") {
    console.log(error.code, error.message)
    return res.status(404).json({ error: "Resource not found." });
  }

  // Fallback for unhandled errors
  console.error("Unhandled error:", error);
  return res.status(500).json({ error: "Internal Server Error" });
};
