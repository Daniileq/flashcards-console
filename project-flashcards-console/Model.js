// const { rejects } = require("assert");
const fs = require("fs");
// const { resolve } = require("path");

class Model {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
  }
  getData() {
    const readDir = new Promise((resolve, rejects) => {
      fs.readdir("./topics", (err, data) => {
        if (err) return rejects(err);
        return resolve(data);
      });
    });
    

    readDir.then((data) => console.log(data));
  }
}
const r = new Model();
r.getData();

module.exports = Model;
