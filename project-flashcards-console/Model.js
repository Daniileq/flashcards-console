const fs = require("fs");

class Questansw {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
  }
}

class Model {
  getMenu() {
    return new Promise((resolve, rejects) => {
      fs.readdir("./topics/", (err, data) => {
        if (err) return rejects(err);
        return resolve(data);
      });
    });
  }
  getQwest(path) {
    let obj = {};
    return new Promise((resolve, rejects) => {
      fs.readFile(`./topics/${path}`, "utf8", (err, file) => {
        if (err) return rejects(err);
        file
          .split("\n")
          .filter((el) => el != "")
          .forEach((el, i, arr) => {
            if (i % 2 === 0) obj[arr[i]] = arr[i + 1];
          });
        return resolve(arrRes);
      });
    });
  }
}

module.exports = Model;
