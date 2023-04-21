from PY import mcm;

mcm.init();
model, categories = mcm.load_model_uncompressed("model.umcm");
print("mcm.py\n Press !exit to exit");

while(True):
    text = input("Predict >>> ");
    if(text=="!exit"): exit(0);
    prediction = mcm.make_predict(model, categories, text);
    results = mcm.analyse_prediction(prediction, categories);
    print(results);