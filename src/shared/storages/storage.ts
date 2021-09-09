let storage: any = null;

export async function setItem(name: string, value: any) {
  if (!storage) throw "Storage not found";
  if (typeof storage.setItem !== "function") {
    throw "Storage should implement setItem method";
  }
  return await storage.setItem(name, value);
}

export async function getItem(name: string) {
  if (!storage) throw "Storage not found";
  if (typeof storage.getItem !== "function") {
    throw "Storage should implement getItem method";
  }
  return await storage.getItem(name);
}

export const setStorage = (instanse: any) => {
  storage = instanse;
};
