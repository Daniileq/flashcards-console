const fs = require("fs");
// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

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
    let arrRes = [];
    return new Promise((resolve, rejects) => {
      fs.readFile(`./topics/${path}`, "utf8", (err, file) => {
        if (err) return rejects(err);
        file
          .split("\n")
          .filter((el) => el != "")
          .forEach((el, i, arr) => {
            if (i % 2 === 0) arrRes.push(new Questansw(arr[i], arr[i + 1]));
          });
        return resolve(arrRes);
      });
    });
  }

  // readDir()
  //   .then((fileNames) => fileNames.map((file) => readFile(file, "utf-8")))
  //   .then((promises) => Promise.all(promises))
  //   .then((er) =>
  //     er.map((el) => {
  //       return el.match(/.+/gi);
  //     })
  //   )
  //   .then((arr) =>
  //     arr.flat(1).forEach((el, i, arr) => {
  //       if (i % 2 === 0) arrRes.push(new Questansw(arr[i], arr[i + 1]));
  //     })
  //   )
  //   .then((e) => run(arrRes));
}

// const runner = new Model();
// runner.getQwest("1.Bird.txt").then(console.log);

// const run = (arrRes) => {
//   if (i < arrRes.length - 1) {
//     console.log(`\n${arrRes[i].question}\n`);
//     readline.question(`Напишите ответ - `, (userCount) => {
//       if (userCount.toLowerCase() === arrRes[i].answer.toLowerCase()) {
//         console.log("\n!!!Верно!!!");
//         i++;
//         run(arrRes);
//       } else if (userCount.toLowerCase() !== arrRes[i].answer.toLowerCase()) {
//         console.log("\nНеверно(((");
//         i++;
//         run(arrRes);
//       }
//     });
//   } else {
//     console.log("\n!!!Игра завершена!!!");
//     readline.close;
//   }
// };

module.exports = Model;
