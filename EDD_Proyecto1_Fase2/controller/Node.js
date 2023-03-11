class Node {
  constructor() {
    this.model = new Model();
  }

  async getNodes() {
    const nodes = await this.model.getNodes();
    return nodes;
  }
}