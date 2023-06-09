mcm = {
    is_browser: (new Function("try {return this===window;}catch(e){ return false;}"))(),
    fs: undefined,
    stemmer: (a)=>{
        return a;
    },
    lzutf8:undefined,
    init: async ()=>{
        if(mcm.is_browser){
            try {
                mcm.stemmer = stemmer;
            } catch {
                console.warn("import stemmer.js for best results");
            }
            try {
                mcm.lzutf8 = LZUTF8;
            } catch {
                console.error("import lzutf8.js for loading model");
            }
            mcm.fs = {
                readFileSync:async (file)=>{
                    return (await fetch(file)).text();
                }
            };
        } else {
            mcm.fs = require('fs');
            stemmer = require("./thirdparty/stemmer");
            mcm.stemmer = stemmer.stemmer;
            mcm.lzutf8 = require("./thirdparty/lzutf8");
        }
    },
    unrequired_symbols: "\n\r\t\"1234567890*-é!'^+%&/()=?_|\\}][{¾½$#£><`~¨´@âÉÂ€.:,;öçÖÇşıŞİĞÜğü",
    stop_words: [ "this","there","the","those","less","you","she","aint","was","were","not","more","got","take","get","they","far","able","so","also","come","have","has","each","do","done","did","still","who","how","what","which","hey","then","later","before","by","with","it","is","we","he","go","i","s","an","a","when","would","had","me","my","our","it","on","its","in","to","for","that"],
    replace_all: replaceAll = (a,b,c) => {
        return a.split(b).join(c);
    },
    create_weights: (tr, c) => {
        let model = {};
        for(param of [...new Set(tr.join(" ").split(" "))]){
            parameter = mcm.stemmer(param);
            for(i=0;i<c.length;i++){
                if(parameter=="") continue;
                if(model[parameter]==null) model[parameter]=[];
                model[parameter] = model[parameter].concat([...tr[i].matchAll(" "+parameter+" ")].length)
            }
        }
        return model;
    },
    remove_unrequired_things: (data) => {
        data = data.toLowerCase();
        for(const unrequired_symbol of mcm.unrequired_symbols.split("")){
            data = replaceAll(data, unrequired_symbol, " ");
        }
        for(const stop_word of mcm.stop_words){
            data = replaceAll(data, " "+stop_word+" ", " ");
        }
        return data;
    },
    make_predict: (m, c, s) => {
        let data = mcm.remove_unrequired_things(" "+s+" ");
        res = [];
        for(let i=0;i<c.length;i++) res[i]=0;

        for(param of data.split(" ")){
            parameter = mcm.stemmer(param);
            if(m[parameter] != null){
                for(let i=0;i<c.length;i++){
                    res[i] += m[parameter][i];
                }
            }
        }
        return res;
    },
    create_resources_from_files: async (source) => {
        var training_resources = [];
        var parameters = [];

        const categories = await mcm.fs.readdirSync(source);
        let category_index = -1;
        for (const category of categories){
            category_index++;
            let source_ws = source + "/";
            let resources = await mcm.fs.readdirSync(source_ws+category);
            training_resources[category_index] = "";
            for (const resource of resources){
                let source = await mcm.fs.readFileSync(source_ws+category+"/"+resource, "utf-8");
                training_resources[category_index] = training_resources[category_index] + " " + source + " ";
            };
            training_resources[category_index] = mcm.remove_unrequired_things(training_resources[category_index]);
        };
        return [training_resources, categories];
    },
    write_model: async (model, categories, file) => {
        await mcm.fs.writeFileSync(file, mcm.lzutf8.encodeBinaryString(mcm.lzutf8.compress(JSON.stringify([model, categories]))));
    },
    load_model: async (file) => {
        return JSON.parse(mcm.lzutf8.decompress(mcm.lzutf8.decodeBinaryString(await mcm.fs.readFileSync(file, "utf-8"))));
    },
    write_model_uncompressed: async (model, categories, file) => {
        await mcm.fs.writeFileSync(file, JSON.stringify([model, categories]));
    },
    load_model_uncompressed: async (file) => {
        return JSON.parse(await mcm.fs.readFileSync(file, "utf-8"));
    }
}

try {
    module.exports = mcm;
} catch {}