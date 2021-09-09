class Storage {
  store: globalThis.Storage | undefined;
  constructor() {
    this.init();
  }

  static create() {
    return new Storage();
  }

  private init() {
    console.log("[SessionStorage] inited");
    this.store = window.sessionStorage;
  }

  async setItem(key: string, value: any) {
    if (!this.store) throw "SessionStorage not found";
    let result: string;
    try {
      result = JSON.stringify(value) ?? "";
    } catch (error) {
      throw "[SessionStorage] stringify error";
    }
    this.store.setItem(key, result);
    return "Success";
  }

  async getItem(key: string) {
    if (!this.store) throw "SessionStorage not found";
    const string = this.store.getItem(key) ?? "";
    let result;
    try {
      result = await JSON.parse(string);
    } catch (error) {
      throw "[SessionStorage] can't stringify";
    }
    if (!result) throw `Not found key: ${key}`;
    return result;
  }
}

export const sessionStorage = Storage.create()
