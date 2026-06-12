const parseCSVToJSON = require("./utils/CSVJSON.js");
const processRecords = require("./record_processors/process.js");
const fetchPermitData = require("./permit_processors/permit.js");
const cleanJSONinFolder = require("./utils/cleaner.js");
const uploadFolder = require("./db/upload.js");
const cleanupFolders = require("./utils/deleteFolders.js");

const fs = require("fs").promises;

const INPUT_FILE = "RecordList.csv";

async function main() {
  const input_data = await fs.readFile(INPUT_FILE, "utf-8");
  const dailyData = parseCSVToJSON(input_data); // 26 records , so 51 + 26 = 77 in the end .  no its 72 because a few of them were invalid ids
  await fs.writeFile("daily_permits.json", JSON.stringify(dailyData, null, 2));
  // need to get the ids
  await processRecords("daily_permits.json", "daily_permits_record_id.json");
  // once ids
  await fetchPermitData("daily_permits_record_id.json");
  await cleanJSONinFolder("permits", "cleaned_permits");
  await uploadFolder("cleaned_permits");
  await cleanupFolders(["cleaned_permits", "permits"]);

  await fs.rm("daily_permits_record_id.json", { force: true });
  await fs.rm("daily_permits.json", { force: true });
}

main();
