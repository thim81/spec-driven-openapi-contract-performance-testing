// Helper function to stringify a field if needed
export const stringifyField = (data, fieldName) => {
  if (data && data[fieldName] && typeof data[fieldName] === 'object') {
    data[fieldName] = JSON.stringify(data[fieldName]);
  }
};

// Helper function to parse a field if needed
export const deserializeField = (record, fieldName, type) => {
  if (record && record[fieldName]) {
    if (type === 'array') {
      record[fieldName] = JSON.parse(record[fieldName]);
    }
    if (type === "dateTime") {
      record[fieldName] = dateTimeToString(record[fieldName]);
    }
  }
};

// Middleware for handling serialization before create/update
export const serializeFields = (data, fieldName, type) => {
  // Get an array of keys from the object
  const keys = Object.keys(data);

  // Iterate over keys and apply stringifyField to each field
  keys.forEach(key => {
    if (key === fieldName) {
      if (type === 'array') {
        stringifyField(data, fieldName);
      }
      if (type === 'dateTime') {
        stringToDateTime(data, fieldName);
      }
    }
  });
};

// Middleware for handling deserialization after findMany
export const deserializeFields = (records, fieldName, type) => {
  records.forEach(record => {
    deserializeField(record, fieldName, type);
  });
};

// Function to convert string to DateTime
export const stringToDateTime = (data, fieldName) => {
  if (data && data[fieldName] && typeof data[fieldName] === 'string') {
    data[fieldName] = new Date(data[fieldName]);
  }
};

// Function to convert DateTime to string
export const dateTimeToString = (dateTime) => {
  // Format DateTime to "YYYY-MM-DD" string
  const year = dateTime.getUTCFullYear();
  const month = (dateTime.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = dateTime.getUTCDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};