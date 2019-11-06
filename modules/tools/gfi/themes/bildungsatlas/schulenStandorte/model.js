import Theme from "../../model";

const SchulenStandorteViewTheme = Theme.extend(/** @lends SchulenStandorteViewTheme.prototype */{
    /**
     * @class SchulenStandorteViewTheme
     * @extends Theme
     * @memberof Tools.GFI.Themes.Bildungsatlas
     * @constructs
     */
    initialize: function () {
        this.listenTo(this, {
            "change:isReady": function () {
                this.replaceValuesWithRealResults();
                this.setInfoHtml();
            }
        });
    },

    /**
     * here we need to parse the key and value, so that the real value could be shown in the gfi theme and all the keys will contain underline instead of white space
     * @returns {void}
     */
    replaceValuesWithRealResults: function () {
        const attr = this.get("gfiContent").allProperties,
            regex = /\B(?=(\d{3})+(?!\d))/g;

        this.set("schoolName", attr.C_S_Name);
        this.set("streetNo", attr.C_S_Str + " " + attr.C_S_HNr);
        this.set("postCity", attr.C_S_PLZ + " " + attr.C_S_Ort);

        if (attr.C_S_SI !== undefined) {
            this.set("socialIndex", attr.C_S_SI === -1 ? "nicht vergeben" : attr.C_S_SI);
        }
        else {
            this.set("socialIndex", "");
        }

        if (attr.SchPu_PrSt !== undefined) {
            this.set("hooverSchool", attr.SchPu_PrSt === 0 ? "nein" : "ja");
        }
        else {
            this.set("hooverSchool", "");
        }

        if (attr.C_S_Zweig !== undefined) {
            this.set("schoolWithBranch", attr.C_S_Zweig === 0 ? "nein" : "ja");
        }
        else {
            this.set("schoolWithBranch", "");
        }

        if (attr.C_S_SuS_ES !== undefined) {
            this.set("preSchool", attr.C_S_SuS_ES === 0 ? "nein" : "ja");
        }
        else {
            this.set("preSchool", "");
        }

        if (attr.C_S_GTA !== undefined) {
            this.set("allDaySchool", attr.C_S_GTA === 0 ? "nein" : "ja");
        }
        else {
            this.set("allDaySchool", "");
        }

        this.set("countStudentsAll", attr.C_S_SuS.toString().replace(regex, "."));
        this.set("countStudents", (attr.C_S_SuS - attr.C_S_SuS_ES).toString().replace(regex, "."));
        this.set("countStudentsPrimary", attr.C_S_SuS_PS.toString().replace(regex, "."));
        this.set("countStudentsSecondaryOne", attr.C_S_SuS_S1.toString().replace(regex, "."));
        this.set("countStudentsSecondaryTwo", attr.C_S_SuS_S2.toString().replace(regex, "."));
        this.set("countStudentsAllPlace", attr.Schule_SuS.toString().replace(regex, "."));
        this.set("countStudentsPrimaryAllPlace", attr.Schule_PS.toString().replace(regex, "."));
        this.set("countStudentsSecondary1AllPlace", attr.Schule_S1.toString().replace(regex, "."));
        this.set("countStudentsSecondary2AllPlace", attr.Schule_S2.toString().replace(regex, "."));
        this.set("schoolUrl", attr.C_S_HomP);
    },

    /**
     * here we need to get the format information to decide which info to show
     * @returns {void}
     */
    setInfoHtml: function () {
        const layerList = Radio.request("ModelList", "getModelsByAttributes", {isVisibleInMap: true, "gfiTheme": this.get("gfiTheme"), "id": this.get("themeId")});
        let level;

        if (layerList) {
            level = layerList[0].get("gfiFormat").gfiBildungsatlasFormat.themeType;
        }

        this.set("level", level);
    }
});

export default SchulenStandorteViewTheme;
