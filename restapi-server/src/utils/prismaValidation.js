import path, {dirname} from "path";
import {fileURLToPath} from "url";
import prismaInternals from '@prisma/internals';

const {getDMMF} = prismaInternals;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const validateRequestPayload = async (modelName, requestBody) => {
  try {
    // Get Prisma DMMF
    const dmmf = await getDMMF({
      datamodelPath: path.join(__dirname, '../../prisma/schema.prisma'),
    });

    // Find the model schema by name
    const modelSchema = dmmf.datamodel.models.find((model) => model.name === modelName);

    if (!modelSchema) {
      throw new Error(`Model ${modelName} not found in the schema.`);
    }

    // Since SQLite does not have length constraints, we need to set it manually
    const minLength = {}, maxLength = {};

    // Set length constraints for the Character model
    if (modelName === 'Character') {
      minLength['name'] = 2;
      maxLength['name'] = 65;
    }

    // Array to store validation errors
    const validationErrors = [];

    // Filter out fields not present in the model schema
    const validFields = Object.keys(requestBody).filter((fieldName) =>
      modelSchema.fields.some((field) => field.name === fieldName)
    );

    // Check for unexpected fields in the request body
    const unexpectedFields = Object.keys(requestBody).filter((fieldName) => !validFields.includes(fieldName));

    // If there are unexpected fields, throw an error
    unexpectedFields.forEach(fieldName => {
      validationErrors.push({
        field: fieldName,
        message: `Field '${fieldName}' is not expected in the request body.`
      });
    });

    // Validate request payload with Prisma Schema fields
    for (const field of modelSchema.fields) {
      const fieldName = field.name;
      const fieldType = field.type;

      // Check if the field is required but missing in the request body
      if (field.isRequired && !field.hasDefaultValue && !(fieldName in requestBody)) {
        validationErrors.push({field: fieldName, message: `Field '${fieldName}' is required.`});
      }

      // Check if the field has a minimum length
      if (field.isRequired && !field.hasDefaultValue && minLength[fieldName] && requestBody?.[fieldName] && requestBody?.[fieldName].length <= minLength[fieldName]) {
        validationErrors.push({
          field: fieldName,
          message: `Field '${fieldName}' needs to be at least ${minLength[fieldName]} characters long.`
        });
      }

      // Check if the field has a maximum length
      if (field.isRequired && !field.hasDefaultValue && minLength[fieldName] && requestBody?.[fieldName] && requestBody[fieldName].length > maxLength[fieldName]) {
        validationErrors.push({
          field: fieldName,
          message: `Field '${fieldName}' can be at maximum ${maxLength[fieldName]} characters long.`
        });
      }

      // Check if the field type matches the expected type
      if (fieldName in requestBody && !typeValidation(requestBody[fieldName], fieldType)) {
        validationErrors.push({field: fieldName, message: `Field '${fieldName}' must be of type '${fieldType}'.`});
      }

      // Check if the field is a list but not provided as an array
      if (field.isList && !(fieldName in requestBody) && !Array.isArray(requestBody[fieldName])) {
        validationErrors.push({field: fieldName, message: `Field '${fieldName}' must be an array.`});
      }

      // Check if the field is generated and provided in the request body
      if (field.isGenerated && fieldName in requestBody) {
        validationErrors.push({
          field: fieldName,
          message: `Field '${fieldName}' is generated and cannot be provided in the request.`
        });
      }

      // Check if the field is automatically updated and provided in the request body
      if (field.isUpdatedAt && fieldName in requestBody) {
        validationErrors.push({
          field: fieldName,
          message: `Field '${fieldName}' is automatically updated and cannot be provided in the request.`
        });
      }

      // Check for schema fields, that are not in the request body
      // if (!(fieldName in requestBody)) {
      //   validationErrors.push({ field: fieldName, message: `Field '${fieldName}' is not provided in the request.` });
      // }
    }

    // If there are validation errors, throw an error with the details
    if (validationErrors.length > 0) {
      const validationError = new Error('Validation Failed');
      validationError.code = 'VALIDATION_ERROR';
      validationError.details = validationErrors;
      throw validationError;
    }

    // Filter the request body to include only valid fields
    const validatedRequestBody = requestBody
    // const validatedRequestBody = validFields.reduce((acc, fieldName) => {
    //   acc[fieldName] = requestBody[fieldName];
    //   return acc;
    // }, {});

    return validatedRequestBody;
  } catch (error) {
    throw error;
  }
}

export const typeValidation = (data, fieldType) => {
  const type = fieldType.toLowerCase()
  if (fieldType === 'DateTime') {
    return data instanceof Date
  }
  return typeof data === type
}
