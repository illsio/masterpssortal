define([
    "backbone",
    "backbone.radio",
    "openlayers",
    "config"
], function (Backbone, Radio, ol, Config) {

    var CoordPopup = Backbone.Model.extend({
         defaults: {
            selectPointerMove: null,
            namedProjections: null,
            mapProjection: null,
            positionMapProjection: [],
            updatePosition: true
        },
        initialize: function () {
            this.listenTo(Radio.channel("Window"), {
                "winParams": this.setStatus
            });

            this.setNamedProjections(Radio.request("CRS", "getNamedProjections"));
            this.setMapProjection(Radio.request("MapView", "getProjection"));
        },

        setStatus: function (args) { // Fenstermanagement
            if (args[2].getId() === "coord") {
                this.set("isCollapsed", args[1]);
                this.set("isCurrentWin", args[0]);
            }
            else {
                this.set("isCurrentWin", false);
                this.data = {};
                this.formats = {};
            }
        },

        createInteraction: function () {
            this.setSelectPointerMove(new ol.interaction.Pointer({
                handleMoveEvent: function (evt) {
                    console.log(evt);
                    this.checkPosition(evt.coordinate);
                }.bind(this),
                handleDownEvent: function (evt) {
                    this.positionClicked(evt.coordinate);
                }.bind(this)
            }, this));

            Radio.trigger("Map", "addInteraction", this.getSelectPointerMove());
        },

        removeInteraction: function () {
            Radio.trigger("Map", "removeInteraction", this.getSelectPointerMove());
            this.set("selectPointerMove", null);
        },

        checkPosition: function (position) {
            if (this.getUpdatePosition() === true) {
                this.setPositionMapProjection(position);
            }
        },

        positionClicked: function (position) {
            this.setUpdatePosition(!this.getUpdatePosition());
        },

        transformPosition: function (targetProjection) {
            var positionMapProjection = this.getPositionMapProjection(),
                positionTargetProjection = Radio.request("CRS", "transformFromMapProjection", targetProjection, positionMapProjection);

            return positionTargetProjection;
        },

        // getter for selectPointerMove
        getSelectPointerMove: function () {
            return this.get("selectPointerMove");
        },
        // setter for selectPointerMove
        setSelectPointerMove: function (value) {
            this.set("selectPointerMove", value);
        },

        // getter for mapProjection
        getMapProjection: function () {
            return this.get("mapProjection");
        },
        // setter for mapProjection
        setMapProjection: function (value) {
            this.set("mapProjection", value);
        },

        // getter for namedProjections
        getNamedProjections: function () {
            return this.get("namedProjections");
        },
        // setter for namedProjections
        setNamedProjections: function (value) {
            this.set("namedProjections", value);
        },

        // getter for positionMapProjection
        getPositionMapProjection: function () {
            return this.get("positionMapProjection");
        },
        // setter for positionMapProjection
        setPositionMapProjection: function (value) {
            this.set("positionMapProjection", value);
        },

        // getter for updatePosition
        getUpdatePosition: function () {
            return this.get("updatePosition");
        },
        // setter for updatePosition
        setUpdatePosition: function (value) {
            this.set("updatePosition", value);
        }
    });

    return CoordPopup;
});
