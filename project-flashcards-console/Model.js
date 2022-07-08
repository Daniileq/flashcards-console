const fs = require("fs");


class Questansw {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
  }
}

class Model {
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
      .then((er) =>
        er.map((el) => {
          return el.match(/.+\n/gi);
        })
      )
      .then((arr) => arr.flat(1).filter((el) => el !== "---\n"))
      .then((arr) =>
        arr.map((el, i, arr) => {
          if (i % 2 != 0) i++;
          return new Questansw(arr[i], arr[i + 1]);
        })
      )
      .then(console.log);
  }
}

module.exports = Model;
