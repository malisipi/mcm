# mcm - malisipi's Classifier Model

> mcm is a classifier based on my language hypothesis. Except conjunction, preposition, stop words the language will be affected by the topic. And it can be used to detect the topic. It will work more accurately as the similarities of the topics decrease. Also it could be used to make a assistan or chat-bot that does pre-selected works. And mcm was developed to test the idea!

## What is mcm not?

* A better classifier than any ai
* A spyware like a lot of ai
* A classifier require nasa-computer and heavy resources

## What is mcm?

* A basic, fast and portable classifier
* It's embeddable and it works without internet and calling home
* It can be trained without any CPU and GPU requirenment
* Mini sized models (The example model is about 50KB)

# TO-DO

- [x] Make NodeJS/JavaScript version
- [x] Make Browser/JavaScript version
- [ ] Make Python version
- [ ] Make V version

## Usage

> You can train mcm models with only NodeJS now. You can use `./model_helper.js` file to train it.

```
📂️ source
\ 📂️ category-1
  \ 📜️ source-1.txt
  \ 📜️ source-2.txt
  . 📜️ 
  . 📜️ 
  \ 📜️ source-n.txt
. 📁️
. 📁️
\ 📁️ category-n
```

## Used Softwares

* Stemmer library (patched for compability) https://www.npmjs.com/package/stemmer - MIT License
* LZUTF-8 library https://github.com/rotemdan/lzutf8.js/ - MIT License

## Articles & Model

> Wikipedia articles (`./source`) licensed by CC-BY-SA 3.0. Also the model (`./model.mcm`) trained with those articles is licensed CC-BY-SA 3.0.

* https://en.wikipedia.org/wiki/Linus_Torvalds
* https://en.wikipedia.org/wiki/Linux_kernel
* https://en.wikipedia.org/wiki/Linux
* https://en.wikipedia.org/wiki/Ubuntu_Touch
* https://en.wikipedia.org/wiki/Ubuntu
* https://en.wikipedia.org/wiki/Bill_Gates
* https://en.wikipedia.org/wiki/Microsoft_Windows
* https://en.wikipedia.org/wiki/Windows_7
* https://en.wikipedia.org/wiki/Windows_11
* https://en.wikipedia.org/wiki/Windows_Mobile

## License

> mcm licensed with Apache 2.0 License

## Disclaimer

> mcm is unstable software. It can predict very wrong the class. And updates can break the backward compability. Before using this software, you should aware that.