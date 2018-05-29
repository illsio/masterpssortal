define(function () {

    var config = {
            ignoredKeys: ["BOUNDEDBY", "SHAPE", "SHAPE_LENGTH", "SHAPE_AREA", "OBJECTID", "GLOBALID", "GEOMETRY", "SHP", "SHP_AREA", "SHP_LENGTH", "GEOM"],
            wfsImgPath: "../node_modules/lgv-config/img/",
            simpleMap: false,
            gfiWindow: "detached",
            allowParametricURL: true,

        view: {
                center: [565874, 5934140] // Rathausmarkt
            },
            namedProjections: [
            // ETRS89 UTM
                ["EPSG:25832", "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"]
            ],

            quickHelp: true,
            layerConf: "../node_modules/lgv-config/services-fhhnet-ALL.json",
            restConf: "../node_modules/lgv-config/rest-services-fhhnet.json",
            styleConf: "../node_modules/lgv-config/style.json",

            proxyURL: "/cgi-bin/proxy.cgi",
            mouseHover: true,
            scaleLine: true,
            gemarkungen: "../node_modules/lgv-config/gemarkung.json"
        };

    return config;
});
