const buildBasicPayload = require("../payload_processors/payload.js");
const inspectionPayloadBuilder = require("./inspection_payload.js");
const postToServer = require("../utils/post.js");
const parseInspectionsData = require("./inspection_parser.js");
const nextInspectionPayloadBuilder = require("./next_inspection_payload.js");
const fs = require("fs");

const MAX_PAGINATION = 10;

async function getInspection(url, html, cookies) {
  const inspectionDataArray = [];

  const basePayload = buildBasicPayload(html);
  const payload = inspectionPayloadBuilder(basePayload);
  const inspectionHTML = await postToServer(url, payload, cookies);
  // fs.writeFileSync("inspecton.html", inspectionHTML); !debugging purposes
  let inspectionData = parseInspectionsData(inspectionHTML);
  const summary = inspectionData.summary;
  inspectionDataArray.push(...inspectionData.inspections);
  let page = 0;
  if (inspectionData.hasNextPage) {
    while (inspectionData.hasNextPage && page < MAX_PAGINATION) {
      let nextpayload = nextInspectionPayloadBuilder(
        inspectionData.nextPayload,
      );
      const html = await postToServer(url, nextpayload, cookies);
      // fs.writeFileSync("next.html", html); !debugging purposes
      inspectionData = parseInspectionsData(html);
      inspectionDataArray.push(...inspectionData.inspections);
      page++;
      console.log("ON page", page);
    }
  }

  //remove later
  // fs.writeFileSync(
  //   "test.inspection.data.array.json",
  //   JSON.stringify(inspectionDataArray, null, 2), !debugging purposes
  // );
  // return inspectionDataArray;
  return {
    summary: summary,
    inspections: inspectionDataArray,
  };
}

module.exports = getInspection;
