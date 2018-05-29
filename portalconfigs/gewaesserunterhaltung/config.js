define(function () {

    var config = {

        ignoredKeys: ["BOUNDEDBY", "SHAPE", "SHAPE_LENGTH", "SHAPE_AREA", "OBJECTID", "GLOBALID", "GEOMETRY", "SHP", "SHP_AREA", "SHP_LENGTH","GEOM"],
        gfiWindow: "attached",
        simpleMap: false,
        wfsImgPath: "../node_modules/lgv-config/img/",
        allowParametricURL: true,

        namedProjections: [
            // ETRS89 UTM
            ["EPSG:25832", "+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"]
        ],
        footer: {
            visibility: true,
            urls: [
                {
                    "bezeichnung": "Kartographie und Gestaltung: ",
                    "url": "http://www.geoinfo.hamburg.de/",
                    "alias": "Landesbetrieb Geoinformation und Vermessung",
                    "alias_mobil": "LGV"
                }
            ]
        },
        quickHelp: true,
        portalConf: "../../portal/master/",
        layerConf: "../node_modules/lgv-config/services-fhhnet-All.json",
        restConf: "../node_modules/lgv-config/rest-services-fhhnet.json",
        styleConf: "../node_modules/lgv-config/style_v2.json",
        proxyURL: "/cgi-bin/proxy.cgi",
        attributions: true,
        scaleLine: true,
        mouseHover: {
            numFeaturesToShow: 2,
            infoText: "(weitere Objekte. Bitte zoomen.)"
        },
        isMenubarVisible: true,
        geoAPI: false,
        clickCounter: {}
   };

   return config;
});
