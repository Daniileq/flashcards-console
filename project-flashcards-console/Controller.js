const Model = require("./Model");

class Controller {
  constructor(model, view, topics) {
    this.model = model;
    this.view = view;
    this.topics = topics;
  }

  async init() {
    const topics = await this.model.getMenu();
    this.topics = topics;
    this.run();
  }

  async run() {
    const menuNum = await this.view.showMenu();
    const topic = this.topics[menuNum - 1];
    const questList = await this.model.getQwest(topic);
    for (let i = 0; i < questList; i++) {
      const answer = await this.view.showQuest(questList[i].question);
      const resultUser =
        questList[i].answer.toLowerCase() === answer.toLowerCase();
      await this.view.showResult(resultUser);
    }
    this.run();

    // Просим экземпляр класса модели прочитать папку со всеми темами и составить меню.
    // Попутно передаем метод контроллера this.printTopicsController,
    // так как нам нужно отправить сформинованное меню на вывод в экземпляр класса view
    // после того, как завершится асинхронная операция чтения папки
    // Здесь this.printTopicsController — является callback'ом
    // this.model.getMenu(this.printTopicsController);
  }
}

module.exports = Controller;
