import {expect} from "chai";
import Preparser from "@modules/core/configLoader/preparser.js";
import RawLayerList from "@modules/core/rawLayerList.js";
import RestReaderList from "@modules/restReader/collection";

describe("core/configLoader/preparser", function () {
    var preparser;

    before(function () {
        new RestReaderList(null, {url: "resources/testRestServices.json"});
        new RawLayerList(null, {url: "lgv-config/services-fhhnet-ALL.json"});
        preparser = new Preparser(null, {url: Config.portalConf});
    });

    describe("global isFolderSelectable", function () {
        it("should be true if set to true in config", function () {
            expect(preparser.parseIsFolderSelectable(true)).to.be.true;
        });
        it("should be false if set to false in config", function () {
            expect(preparser.parseIsFolderSelectable(false)).to.be.false;
        });
        it("should be true if not set in config (default value)", function () {
            expect(preparser.parseIsFolderSelectable(undefined)).to.be.true;
        });
    });
});
