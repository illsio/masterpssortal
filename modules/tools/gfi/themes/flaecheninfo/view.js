import ThemeView from "../view";
import FlaecheninfoTemplate from "text-loader!./template.html";

const FlaecheninfoThemeView = ThemeView.extend({
    className: "flaecheninfo",
    template: _.template(FlaecheninfoTemplate),
    events: {
        "click button": "buttonClicked"
    },

    buttonnClicked: function () {
        this.model.createReport();
    }
});

export default FlaecheninfoThemeView;
