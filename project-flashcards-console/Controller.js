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
    run();
  }

  run() {
    
    // Просим экземпляр класса модели прочитать папку со всеми темами и составить меню.
    // Попутно передаем метод контроллера this.printTopicsController,
    // так как нам нужно отправить сформинованное меню на вывод в экземпляр класса view
    // после того, как завершится асинхронная операция чтения папки
    // Здесь this.printTopicsController — является callback'ом
    this.model.getMenu(this.printTopicsController);
  }
}

module.exports = Controller;
