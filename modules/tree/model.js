define([
    "backbone",
    "config",
    "eventbus"
], function (Backbone, Config, EventBus) {

        var Tree = Backbone.Model.extend({
            defaults: {
                topicList: ["Opendata", "Inspire"], // --> Config
                currentSelection: Config.tree.orderBy,
                type: Config.tree.type,
                quickHelp: false,
                defaultBackground: "" // wird beim Umschalten der Hintergrundfarbe gefüllt
            },
            initialize: function () {
                this.listenTo(EventBus, {
                    "mapView:sendCenterAndZoom": function (center, zoom) {
                        EventBus.trigger("layerselectionlist:createParamsForURL", center, zoom);
                    }
                });
                this.listenTo(this, "change:currentSelection", this.sendSelection);

                if (_.has(Config, "quickHelp") && Config.quickHelp === true) {
                    this.set("quickHelp", true);
                }
            },
            setSelection: function (value) {
                this.set("currentSelection", value.toLowerCase());
            },
            sendSelection: function () {
                Config.tree.orderBy = this.get("currentSelection");
                EventBus.trigger("layerlist:fetchLayer");
            }
        });

        return Tree;
    });
