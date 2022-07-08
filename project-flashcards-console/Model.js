// const { rejects } = require("assert");
const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");
// const { resolve } = require("path");

class Model {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
  }
  getData() {
    function readDir() {
      return new Promise((resolve, rejects) => {
        fs.readdir("./topics/", (err, data) => {
          if (err) return rejects(err);
          return resolve(data);
        });
      });
    }

    function readFile(path, code) {
      return new Promise((resolve, rejects) => {
        fs.readFile(`./topics/${path}`, code, (err, file) => {
          if (err) return rejects(err);
          return resolve(file);
        });
      });
    }

    readDir()
      .then((fileNames) => fileNames.map((file) => readFile(file, "utf-8")))
      .then((promises) => Promise.all(promises))
      .then((er) => er.map(el=>{
        return el.match(/.+\n/gi)
      }))
      .then(arr =>arr.flat(1).filter(el=> el !== '---\n'))
      .then(arr => arr.map((el,i)=>);
  }
}


const r = new Model();
r.getData();

module.exports = Model;
