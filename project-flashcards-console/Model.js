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
        let arr = [];
        
        fs.readdir("./topics/", (err, data) => {
          if (err) return rejects(err);
          data.forEach(element => {
           arr.push()
          });
          return resolve(data);
        });
      });
    }
    function readFile(path, code) {
      return new Promise((resolve, rejects) => {
        
        fs.readFile(`./topics/${path}`, code, (err, file) => {
          if (err) {
            return rejects(err);
          }
          return resolve(file);
        });
      });
    }

    readDir()
      .then((data) => data)
      .then((e) => readFile())
      .then((r) => console.log(r));
  }
}
const r = new Model();
r.getData();

module.exports = Model;
