// const base = ""; // No trailing slash

const dateOffset = 1; // 1 = yesterday

// statuses that need to pulled using daily.js
const requiredStatuses = ["Issued", "Complete"];

// permit types
const requiredSecondaryData = [
  "Residential New Construction and Additions",
  "Residential Building Alterations (Renovations)",
  "Commercial New Construction and Additions",
];

//status that need be updated
const updateStatuses = ["Issued","Awaiting Client Reply", "In Process","Complete"];

// exports
module.exports = {
  dateOffset,
  requiredStatuses,
  requiredSecondaryData,
  updateStatuses,
};
