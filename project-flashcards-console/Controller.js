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
    for (let key in questList) {
      const answer = await this.view.showQuest(key);
      const resultUser = questList[key].toLowerCase() === answer.toLowerCase();
      await this.view.showResult(resultUser);
    }
    this.run();
  }
}

module.exports = Controller;