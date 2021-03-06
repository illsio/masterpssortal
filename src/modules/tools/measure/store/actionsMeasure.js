import source from "../utils/measureSource";
import makeDraw2d from "../utils/measureDraw";
import makeDraw3d from "../utils/measureDraw3d";

export default {
    /**
     * Deletes all geometries from the measure layer,
     * and removes belonging UI/state.
     * @return {void}
     */
    deleteFeatures ({state, commit}) {
        const {unlisteners, interaction} = state;

        if (interaction) {
            interaction.abortDrawing();
        }
        unlisteners.forEach(unlistener => unlistener());
        source.clear();

        commit("setLines", {});
        commit("setPolygons", {});
        commit("setUnlisteners", []);
    },
    /**
     * Creates a new draw interaction depending on state to either draw
     * lines or polygons. The method will first remove any prior draw
     * interaction created by this tool.
     * @returns {void}
     */
    createDrawInteraction ({state, dispatch, commit, rootGetters, rootState, getters}) {
        dispatch("removeDrawInteraction");

        let interaction = null;

        if (rootGetters["Map/is3d"]) {
            dispatch("deleteFeatures");
            interaction = makeDraw3d(
                rootGetters["Map/map3d"],
                rootGetters["Map/projectionCode"],
                unlistener => commit("addUnlistener", unlistener),
                rootState._store
            );
        }
        else {
            if (getters.unlisteners.length) {
                // if unlisteners are registered, this indicates 3D mode was active immediately before
                dispatch("deleteFeatures");
            }
            const map = rootGetters["Map/map"],
                {selectedGeometry} = state;

            interaction = makeDraw2d(
                selectedGeometry,
                feature => commit("addFeature", feature),
                flag => commit("setIsDrawing", flag),
                featureId => commit("setFeatureId", featureId),
                tooltipCoord => commit("setTooltipCoord", tooltipCoord)
            );
            map.addInteraction(interaction);
        }

        commit("setInteraction", interaction);
    },
    /**
     * Removes the draw interaction. This includes aborting any current
     * unfinished drawing, removing the interaction from the map, and
     * removing the interaction from the store.
     * @returns {void}
     */
    removeDrawInteraction ({state, commit, rootGetters}) {
        const {interaction} = state;

        if (interaction) {
            const map = rootGetters["Map/map"];

            interaction.abortDrawing();

            if (interaction.interaction3d) {
                // 3d interaction is not directly added to map, but provides it's own method
                interaction.stopInteraction();
            }
            else {
                map.removeInteraction(interaction);
            }

            commit("setInteraction", null);
        }
    }
};
