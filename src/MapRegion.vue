<script>
import Alerting from "./modules/alerting/components/Alerting.vue";
import ConfirmAction from "./modules/confirmAction/components/ConfirmAction.vue";
import ControlBar from "./modules/controls/ControlBar.vue";
import Footer from "./modules/footer/components/Footer.vue";
import LegendWindow from "./modules/legend/components/LegendWindow.vue";
import MapMarker from "./modules/mapMarker/components/MapMarker.vue";
import ToolManager from "./modules/tools/ToolManager.vue";
import {mapState} from "vuex";

export default {
    name: "MapRegion",
    components: {
        ConfirmAction,
        ControlBar,
        ToolManager,
        Alerting,
        LegendWindow,
        MapMarker,
        Footer
    },
    computed: {
        ...mapState([
            // listen to configJson changes for mounting the tools
            "configJson",
            "i18NextInitialized"
        ])
    }
};
</script>

<template>
    <div class="anchor">
        <!-- OpenLayers node; control map itself via vuex map module -->
        <div class="menu">
            <LegendWindow />
        </div>
        <div id="map-wrapper">
            <div
                id="map"
            />
            <div class="elements-positioned-over-map">
                <ControlBar class="controls" />
                <Footer />
                <MapMarker />
            </div>
            <ToolManager
                v-if="configJson"
                :showInSidebar="false"
            />
        </div>

        <div id="sidebar">
            <!-- Alternatively to adding the configJson lifecycle hook to every component, the Main component can wait mounting its children until the config is parsed -->
            <ToolManager
                v-if="configJson"
                :showInSidebar="true"
            />
        </div>

        <!-- elements that are somewhere above the map, but don't have a fixed position or are not always present -->
        <ConfirmAction />
        <Alerting />

        <template v-if="i18NextInitialized">
            <component
                :is="$options.components[addonKey]"
                v-for="addonKey in $toolAddons"
                :key="addonKey"
            />
        </template>
    </div>
</template>

<style lang="less" scoped>
    #sidebar, .sidebar{
        position: relative;
    }
    #sidebar .tool-manager{
        height:100%;
    }

    .anchor {
        position: relative;

        #map-wrapper {
            position:relative;
            flex-grow:1;
            order:1;
        }
        #sidebar {
            order:2;
            flex-grow:0;
            height:100%;
        }

        /* map itself should fill the whole region as "background" */
        #map {
            position: absolute;
            height: 100%;
            width: 100%;
        }

        .elements-positioned-over-map {
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            height:100%;
            width: 100%;

            .controls {
                flex-grow: 1;
            }
        }

        .menu {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            width: 100%;
        }
    }
</style>
