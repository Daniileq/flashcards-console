const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let arrRes = [];
let i = 0;

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
          return el.match(/.+/gi);
        })
      )
      .then((arr) =>
        arr.flat(1).forEach((el, i, arr) => {
          if (i % 2 === 0) arrRes.push(new Questansw(arr[i], arr[i + 1]));
        })
      )
      .then((e) => run(arrRes));
  }
}

const runner = new Model();
runner.getData();

const run = (arrRes) => {
  if (i < arrRes.length - 1) {
    console.log(`\n${arrRes[i].question}\n`);
    readline.question(`Напишите ответ - `, (userCount) => {
      if (userCount.toLowerCase() === arrRes[i].answer.toLowerCase()) {
        console.log("\n!!!Верно!!!");
        i++;
        run(arrRes);
      } else if (userCount.toLowerCase() !== arrRes[i].answer.toLowerCase()) {
        console.log("\nНеверно(((");
        i++;
        run(arrRes);
      }
    });
  } else {
    console.log("\n!!!Игра завершена!!!");
    readline.close;
  }
};

module.exports = Model;
