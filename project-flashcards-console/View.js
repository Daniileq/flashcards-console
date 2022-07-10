const { rejects } = require("assert");

const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

class View {
  constructor() {}

  showMenu(menu) {
    return new Promise((res, rej) => {
      rl.question(`Выберите тему:\n${menu.join("\n")}\n`, (answer) =>
        res(answer)
      );
    });
  }

  showQuest(quest) {
    return new Promise((res, rej) => {
      rl.question(`${quest}\nВведите ответ :`, (answer) => res(answer));
    });
  }

  showResult(result) {
    if (result) return console.log("!!!Верно!!!");
    return console.log("!!!Неверно!!!");
  }
}

module.exports = View;
