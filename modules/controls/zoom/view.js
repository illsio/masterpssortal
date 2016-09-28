define([
    "backbone",
    "backbone.radio",
    "text!modules/controls/zoom/template.html",
    "eventbus"
], function (Backbone, Radio, ZoomControlTemplate, EventBus) {

    var ZoomControlView = Backbone.View.extend({
        className: "row",
        template: _.template(ZoomControlTemplate),
        events: {
            "click .glyphicon-plus": "setZoomLevelUp",
            "click .glyphicon-minus": "setZoomLevelDown"
        },
        initialize: function () {
            this.render();
            EventBus.trigger("registerZoomButtonsInClickCounter", this.$el);
        },
        render: function () {
            this.$el.html(this.template);
        },
        setZoomLevelUp: function () {
            Radio.trigger("MapView", "setZoomLevelUp");
        },
        setZoomLevelDown: function () {
            Radio.trigger("MapView", "setZoomLevelDown");
        }
    });

    return ZoomControlView;
});
