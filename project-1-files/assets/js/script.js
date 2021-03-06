// Main Javascript File

const totPop = document.getElementById("totPopVal");
const totMales = document.getElementById("totMalesVal");
const totFemales = document.getElementById("totFemalesVal");
const totHH = document.getElementById("totHHVal");
const medHinc = document.getElementById("medHincVal");
const pci = document.getElementById("pciVal");
const divIndx = document.getElementById("divIndxVal");



function showTable() {
  document.getElementsByClassName("demographics-table").css("display", "block");
};

document.getElementById("demoBtn").on("click", function (event) {

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementsByClassName("demographics-table").innerHTML = this.responseText;
    }
  };

  xhttp.open("POST", `https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/GeoEnrichment/enrich?studyAreas=[
    {
      \"geometry\":{
        \"x\":-75.165222,
        \"y\":39.952583
      }
    }
  ]&studyAreasOptions={
    \"areaType\":\"RingBuffer\",
    \"bufferUnits\":\"esriMiles\",
    \"bufferRadii\":[1]
  }&dataCollections=[\"KeyGlobalFacts\", \"KeyUSFacts\"]",
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    }`, true);
  xhttp.send();
  showTable();
  document.getElementById("demoBtn").css("display", "none");
});

//because we're limiting the MVP version to just Philly, we are hard coding Philly's latitude and longitude in the "geometry" in the URL below
// const settings = {
//   "url": `https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/GeoEnrichment/enrich?studyAreas=[
//     {
//       \"geometry\":{
//         \"x\":-75.165222,
//         \"y\":39.952583
//       }
//     }
//   ]&studyAreasOptions={
//     \"areaType\":\"RingBuffer\",
//     \"bufferUnits\":\"esriMiles\",
//     \"bufferRadii\":[1]
//   }&dataCollections=[\"KeyGlobalFacts\", \"KeyUSFacts\"]",
//     "method": "POST",
//     "timeout": 0,
//     "headers": {
//       "Content-Type": "application/x-www-form-urlencoded"
//     }`,
//   "data": {
//     "f": "json",
//     "token": "PTBqpIfvU64VAWbjQO-ihRwr1G1RvevTEIe5o_KemfJJAc-gtLZOTGecAMYzXnzsyuV_DuidjHlNXZ6ZHhXXVR0Uki0ne2YopdmfrlkSuNDapvNtH_wy0blmIFdDDhQ0sneyfgg2zwYRysEZSUdAvg..",
//     "inSR": "4326",
//     "outSR": "4326",
//     "returnGeometry": "true"
//   }
// };

// $.ajax(settings).done(function (response) {
//   console.log(JSON.parse(response));

totPop.prepend(JSON.parse(response).results[0].value.FeatureSet[0].features[0].attributes.TOTPOP_CY);
totMales.prepend(JSON.parse(response).results[0].value.FeatureSet[0].features[0].attributes.TOTMALES);
totFemales.prepend(JSON.parse(response).results[0].value.FeatureSet[0].features[0].attributes.TOTFEMALES);
totHH.prepend(JSON.parse(response).results[0].value.FeatureSet[0].features[0].attributes.TOTHH_CY);
medHinc.prepend(JSON.parse(response).results[0].value.FeatureSet[0].features[0].attributes.MEDHINC_CY);
pci.prepend(JSON.parse(response).results[0].value.FeatureSet[0].features[0].attributes.PCI_CY);
divIndx.prepend(JSON.parse(response).results[0].value.FeatureSet[0].features[0].attributes.DIVINDX_CY);


// });




/*DEV NOTES====================================================

DATA POINTS PULLED FROM API:

  FIELD NAME AND ID:
  Total Population  id="totPop"
  Total Male Population  id="totMales"
  Total Female Population  id="totFemales"
  2019 Total Households  id="totHH"
  2019 Median Household Income  id="medHinc"
  2019 Per Capita Income  id="pci"
  2019 Diversity Index id="divIndx"

  DATA VALUE AND ID:
  Total Population  id="totPopVal"
  Total Male Population  id="totMalesVal"
  Total Female Population  id="totFemalesVal"
  2019 Total Households  id="totHHVal"
  2019 Median Household Income  id="medHincVal"
  2019 Per Capita Income  id="pciVal"
  2019 Diversity Index id="divIndxVal"


  NOTES FOR FUTURE DEV:
  - implement a demographics solution that doesn't require refreshing your token every 2 hours

==============================================================*/