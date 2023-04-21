import snowballstemmer;
import json;

unrequired_symbols = "\n\r\t\"1234567890*-é!'^+%&/()=?_|\\}][{¾½$#£><`~¨´@âÉÂ€.:,;öçÖÇşıŞİĞÜğü";
stop_words = [ "this","there","the","those","less","you","she","aint","was","were","not","more","got","take","get","they","far","able","so","also","come","have","has","each","do","done","did","still","who","how","what","which","hey","then","later","before","by","with","it","is","we","he","go","i","s","an","a","when","would","had","me","my","our","it","on","its","in","to","for","that"];

def init():
    global stemmer;
    stemmer = snowballstemmer.stemmer('english').stemWord;

def load_model_uncompressed(model):
    model_file = open(model, "r");
    model_json = json.loads(model_file.read());
    model_file.close();
    return (model_json[0], model_json[1]);

def remove_unrequired_things(data):
    data = data.lower();
    for unrequired_symbol in [*unrequired_symbols]:
        data = data.replace(unrequired_symbol, " ");
    for stop_word in stop_words:
        data = data.replace(" "+stop_word+" ", " ");
    return data;

def make_predict(model, categories, text):
    data = remove_unrequired_things(" "+text+" ");
    res = [];
    for i in range(len(categories)): res.append(0);

    for param in data.split(" "):
        parameter = stemmer(param);
        try:
            for i in range(len(categories)):
                res[i] += model[parameter][i];
        except:
            continue;
    
    return res;

def analyse_prediction(prediction, categories):
    res = [];
    total = 0;
    the_prediction = "";
    the_prediction_accuracy = 0;
    for i in range(len(categories)): total += prediction[i];

    if(total!=0):
        for i in range(len(categories)):
            the_accuracy = prediction[i]/total*100;
            
            if(the_accuracy > the_prediction_accuracy):
                the_prediction = categories[i];
                the_prediction_accuracy = the_accuracy;

            res.append({
                "category":categories[i],
                "accuracy":the_accuracy
            });

    else:
        for i in range(len(categories)):
            res.append({
                "category":categories[i],
                "accuracy":100/len(categories)
            });

    return {
            "prediction": {
                "category": the_prediction,
                "accuracy": the_prediction_accuracy,
            },
            "results":res
        };