import { loadData } from "./summary";
import * as jsonschema from "jsonschema";
import { addressSchema } from "./schemas/day-summary";
loadData("data/day.json")
    .then((data) => {
        return data;//[Object.keys(data)[0]];
    })
    .then((data) => {
        const val: jsonschema.Validator = new jsonschema.Validator();
        val.addSchema(addressSchema);
        const result: jsonschema.ValidatorResult = val.validate(data, addressSchema);
        console.log("Schema is valid: ", result.valid, result.errors);
        if (result.valid) {
            return data[Object.keys(data)[0]].activityGraphData.heartRateTimelineSamples;
        } else {
            throw result.errors[0];
        }
    })
    .then((data) => {
        console.log(data.length);
    })
    .catch((err) => {
        console.error(err);
    })