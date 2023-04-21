var mcm = require("./JS/mcm.js");

(async () => {
    await mcm.init();
    let [training_resources, categories] = await mcm.create_resources_from_files("./source");
    let model = mcm.create_weights(training_resources, categories);

    await mcm.write_model(model, categories, "./model.mcm");
    //let [model, categories] = await mcm.load_model("./model.mcm");

    //let res = mcm.make_predict(model, categories, "it is licensed with gpl");
    //console.table([categories,[res[0]/(res[0]+res[1])*100+"%",res[1]/(res[0]+res[1])*100+"%"],res]);
})();