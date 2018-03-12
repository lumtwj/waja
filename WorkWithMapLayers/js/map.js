var mapMain;

// @formatter:off
require([
        "esri/map",
        "esri/geometry/Extent",
        "esri/layers/ArcGISDynamicMapServiceLayer",
        "esri/layers/FeatureLayer",
        "esri/dijit/BasemapToggle",
        "esri/dijit/Legend",
        "dojo/ready",
        "dojo/parser",
        "dojo/on",
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane"],
    function (Map, Extent, ArcGISDynamicMapServiceLayer, FeatureLayer, BasemapToggle, Legend,
              ready, parser, on,
              BorderContainer, ContentPane) {
// @formatter:on

        // Wait until DOM is ready *and* all outstanding require() calls have been resolved
        ready(function () {

            // Parse DOM nodes decorated with the data-dojo-type attribute
            parser.parse();

            /*
             * Step: Specify the initial extent
             * Note: Exact coordinates may vary slightly from snippet/solution
             * Reference: https://developers.arcgis.com/javascript/jssamples/fl_any_projection.html
             */
            var extentInitial = new Extent({
                "xmin" : -14374651.058794111,
                "ymin" : 3597572.9883619756,
                "xmax" : -12408079.19507362,
                "ymax" : 5441845.606826218,
                "spatialReference" : {
                    "wkid" : 102100
                }
            });

            // Create the map
            mapMain = new Map("cpCenter", {
                basemap: "satellite",
                center: [-122.45, 37.75],
                zoom: 12,
                extent: extentInitial
            });

            /*
             * Step: Add the USA map service to the map
             */
            var lyrUSA = new ArcGISDynamicMapServiceLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer", {
                opacity : 0.5
            });
            // mapMain.addLayer(lyrUSA);

            /*
             * Step: Add the earthquakes layer to the map
             */
            var lyrQuakes = new FeatureLayer("http://services.arcgis.com/ue9rwulIoeLEI9bj/arcgis/rest/services/Earthquakes/FeatureServer/0");
            lyrQuakes.setDefinitionExpression("MAGNITUDE >= 2.0");
            // mapMain.addLayer(lyrQuakes);

            /*
            * Step: Revise code to use the addLayers() method
            */
            mapMain.addLayers([lyrUSA, lyrQuakes]);

            /*
             * Step: Add the BaseMapToggle widget to the map
             */
            var toggle = new BasemapToggle({
                map: mapMain,
                basemap: "topo"
            }, "BasemapToggle");
            toggle.startup();

            /*
             * Step: Add a legend once all layers have been added to the map
             */
            //mapMain.on(); // stub
            mapMain.on("layers-add-result", function() {
                var dijitLegend = new Legend({
                    map : mapMain,
                    arrangement : Legend.ALIGN_RIGHT
                }, "divLegend");
                dijitLegend.startup();
            }); // stub)


        });
    });
