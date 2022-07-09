const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let arrRes;

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
        arr.flat(1).map((el, i, arr) => {
          if (i % 2 != 0) i++;
          return new Questansw(arr[i], arr[i + 1]);
        })
      )
      .then((e) => run(e));
  }
}

const r = new Model();
arrRes = r.getData();
let i = 0;

const run = (arrRes) => {
  console.log(`\n${arrRes[i].question}\n`);
  readline.question(`Напишите ответ - `, (userCount) => {
    if (arrRes.length - 1 === i) {
      readline.close;
      console.log("игра завершена!!!");
    }
    if (userCount.toLowerCase() === arrRes[i].answer.toLowerCase()) {
      console.log("\n!!!Верно!!!");
      i++;
      run(arrRes);
    } else {
      console.log("\nНеверно(((");
      i++;
      run(arrRes);
    }
  });
};

module.exports = Model;
