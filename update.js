const getDataByStatus = require("./db/getPreviousData.js");
const fetchPermitData = require("./permit_processors/permit.js");
const compareData = require("./utils/compare.js");
const uploadFolder = require("./db/upload.js");
const cleanupFolders = require("./utils/deleteFolders.js");
const { comparePermitHashes } = require("./utils/hashes/hash.compare.js");
const { updateStatuses } = require("./config.js"); // statuses here

const fs = require("fs");

async function process(status) {
  const file = await getDataByStatus(status); //return filename
  await fetchPermitData(file);
  await comparePermitHashes(file, "permits", "DIFF_FOLDER");
  await uploadFolder("DIFF_FOLDER");
  await cleanupFolders(["DIFF_FOLDER", "permits"]);
  fs.rmSync(file, { force: true }); // remove inspection phase.json
}

async function main() {
  for (const status of updateStatuses) {
    try {
      console.log(`\n--- Processing status: ${status} ---`);

      await process(status);

      console.log(`✅ Successfully finished processing: ${status}`);
    } catch (error) {
      console.error(`❌ Error processing status '${status}':`, error.message);
    }
  }

  console.log("\nAll statuses have been processed.");
}

// Execute the main function
main();
