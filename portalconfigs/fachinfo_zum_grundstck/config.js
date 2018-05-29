define(function () {

    var config = {
        ignoredKeys: ["BOUNDEDBY", "SHAPE", "SHAPE_LENGTH", "SHAPE_AREA", "OBJECTID", "GLOBALID", "GEOMETRY", "SHP", "SHP_AREA", "SHP_LENGTH","GEOM"],
       wfsImgPath: "..node_modules/lgv-config/img",
       allowParametricURL: true,
       view: {},

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
       layerConf: "../node_modules/lgv-config/services-internet.json",
       restConf: "../node_modules/lgv-config/rest-services-internet.json",
       styleConf: "../node_modules/lgv-config/style.json",
       print: {
           printID: "99999",
           title: "Grundstücksbezogene Fachinformationen",
           gfi: false
       },
       proxyURL: "/cgi-bin/proxy.cgi",
       mouseHover: true,
       scaleLine: true,
       gemarkungen: "../node_modules/lgv-config/gemarkung.json"
   };

   return config;
});
