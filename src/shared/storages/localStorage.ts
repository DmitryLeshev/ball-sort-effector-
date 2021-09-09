class Storage {
  store: globalThis.Storage | undefined;
  constructor() {
    this.init();
  }

  static create() {
    return new Storage();
  }

  private init() {
    console.log("[LocalStorage] inited");
    this.store = window.localStorage;
  }

  async setItem(key: string, value: any) {
    if (!this.store) throw "localStorage not found";
    let result: string;
    try {
      result = JSON.stringify(value) ?? "";
    } catch (error) {
      throw "[LocalStorage] stringify error";
    }
    this.store.setItem(key, result);
    return "Success";
  }

  async getItem(key: string) {
    if (!this.store) throw "localStorage not found";
    const string = this.store.getItem(key) ?? "";
    let result;
    try {
      result = await JSON.parse(string);
    } catch (error) {
      throw "[LocalStorage] can't stringify";
    }
    if (!result) throw `Not found key: ${key}`;
    return result;
  }
}

export const localStorage = Storage.create()
