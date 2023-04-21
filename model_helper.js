var mtc = require("./JS/mtc.js");

(async () => {
    await mtc.init();
    let [training_resources, categories] = await mtc.create_resources_from_files("./source");
    let model = mtc.create_weights(training_resources, categories);

    await mtc.write_model(model, categories, "./model.mtc");
    //let [model, categories] = await mtc.load_model("./model.mtc");

    //let res = mtc.make_predict(model, categories, "it is licensed with gpl");
    //console.table([categories,[res[0]/(res[0]+res[1])*100+"%",res[1]/(res[0]+res[1])*100+"%"],res]);
})();