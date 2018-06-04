define(function (require) {
    var template = require("text!modules/tools/schulwegRouting_hh/template.html"),
        templateHitlist = require("text!modules/tools/schulwegRouting_hh/templateHitlist.html"),
        Model = require("modules/tools/schulwegRouting_hh/model"),
        SchulwegRoutingView;

    require("bootstrap-toggle");
    require("bootstrap-select");

    SchulwegRoutingView = Backbone.View.extend({
        model: new Model(),
        className: "schulweg-routing",
        template: _.template(template),
        templateHitlist: _.template(templateHitlist),
        events: {
            "keyup .address-search": "searchAddress",
            "click li.street": function (evt) {
                this.setAddressSearchValue(evt);
                this.$el.find(".address-search").focus();
                evt.stopPropagation();
            },
            "click li.address": "setAddressSearchValue",
            "click .address-search": function (evt) {
                // stop event bubbling
                evt.stopPropagation();
            },
            "click": "hideHitlist",
            "focusin .address-search": "showHitlist",
            // Fires after the select's value (schoolNames) has been changed
            "changed.bs.select": "updateSelectedValues"
        },
        initialize: function (attr) {
            this.listenTo(this.model, {
                "change:schoolNames": this.render,
                "change:streetNameList": this.renderHitlist,
                "change:addressListFiltered": this.renderHitlist
            });
            // Target wird in der app.js übergeben
            this.domTarget = attr.domTarget;

            var layerModel = Radio.request("ModelList", "getModelByAttributes", {id: "8712"}),
                features = layerModel.get("layer").getSource().getFeatures();

            this.model.setLayer(Radio.request("Map", "createLayerIfNotExists", "school_route_layer"));
            this.model.addRouteFeatures(this.model.get("layer").getSource());
            this.model.get("layer").setStyle(this.model.routeStyle);
            this.model.setSchoolNames(this.model.sortSchoolsByName(features));
        },
        render: function () {
            var attr = this.model.toJSON();

            this.$el.html(this.template(attr));
            this.initToogle();
            this.initSelectpicker();
            this.domTarget.append(this.$el);
        },

        initToogle: function () {
            this.$el.find("#regional-school").bootstrapToggle({
                on: "Ja",
                off: "Nein",
                size: "small"
            });
        },

        initSelectpicker: function () {
            this.$el.find(".selectpicker").selectpicker({
                width: "100%",
                selectedTextFormat: "value",
                size: 6
            });
        },

        renderHitlist: function () {
            var attr = this.model.toJSON();

            this.$el.find(".hit-list").html(this.templateHitlist(attr));
        },

        hideHitlist: function () {
            this.$el.find(".hit-list").hide();
        },

        showHitlist: function () {
            this.$el.find(".hit-list").show();
        },

        searchAddress: function (evt) {
            if (evt.target.value.length > 2) {
                this.model.searchAddress(evt.target.value);
            }
        },

        setAddressSearchValue: function (evt) {
            this.$el.find(".address-search").val(evt.target.textContent);
            this.model.searchAddress(evt.target.textContent);
        },

        updateSelectedValues: function () {
            console.log(54);
        }
    });

    return SchulwegRoutingView;
});
