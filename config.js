// const base = ""; // No trailing slash

const dateOffset = 1; // 1 = yesterday

// statuses that need to pulled using daily.js
const requiredStatuses = ["Issued", "Final"];

// permit types
const requiredSecondaryData = [
  "Residential New Construction and Additions",
  "Residential Building Alterations (Renovations)",
  "Commercial New Construction and Additions",
];

//status that need be updated
const updateStatuses = ["Awaiting Client Reply", "In Process"];

// exports
module.exports = {
  dateOffset,
  requiredStatuses,
  requiredSecondaryData,
  updateStatuses,
};
