const DB_NAME = "indexedDB";
const DB_VERSION = 2;
const DB_STORE_NAME_1 = "my_story_1";
const DB_STORE_NAME_2 = "my_story_2";

// let database: IDBDatabase;

// const request = indexedDB.open(DB_NAME, DB_VERSION);

// request.onupgradeneeded = function () {
//   let db = request.result;

//   if (!db.objectStoreNames.contains(DB_STORE_NAME_1)) {
//     db.createObjectStore(DB_STORE_NAME_1, { keyPath: "id" });
//   }

//   if (!db.objectStoreNames.contains(DB_STORE_NAME_2)) {
//     db.createObjectStore(DB_STORE_NAME_2, { autoIncrement: true });
//   }

//   switch (db.version) {
//     case 0: {
//       console.log("DB version 0");
//       break;
//     }
//     case 1: {
//       console.log("DB version 1");
//       break;
//     }
//   }
// };

// request.onerror = function () {
//   console.error("Error", request.error);
// };

// request.onsuccess = function () {
//   let db = request.result;
//   db.onversionchange = function () {
//     db.close();
//     alert("База данных устарела, пожалуста, перезагрузите страницу.");
//   };
//   database = db;
// };

// async function getItem(name: string) {
//   return new Promise((resolve, rejects) => {
//     const transaction = database.transaction(DB_STORE_NAME_1, "readwrite");
//     if (!transaction) throw "Transaction not found";
//     const store = transaction.objectStore(DB_STORE_NAME_1);
//     const req = store.get(name);
//     req.onsuccess = function () {
//       resolve(req.result.value);
//     };
//     req.onerror = function () {
//       console.log("Ошибка", req.error);
//       rejects(`Not found key: ${name}`);
//     };
//     transaction.oncomplete = function (event) {
//       console.log("Транзакция выполнена", { event });
//     };
//   });
// }

// async function setItem(name: string, value: any) {
//   return new Promise((resolve, rejects) => {
//     const transaction = database.transaction(DB_STORE_NAME_1, "readwrite");
//     if (!transaction) throw "Transaction not found";
//     const store = transaction.objectStore(DB_STORE_NAME_1);
//     const req = store.put({ id: name, value: value });
//     req.onsuccess = function () {
//       console.log(req.result);
//       resolve("Success");
//     };
//     req.onerror = function () {
//       console.log("Ошибка", req.error);
//       rejects(req.error);
//     };
//     transaction.oncomplete = function (event) {
//       console.log("Транзакция выполнена", { event });
//     };
//   });
// }

// export const storages = {
//   getItem,
//   setItem,
// };

async function deleteDB(name: string) {
  const request = indexedDB.deleteDatabase(name);
  request.onerror = (event: any) => {
    console.log("[indexDB/deleteDB] onerror", event);
  };
  request.onsuccess = (event: any) => {
    console.log("[indexDB/deleteDB] onsuccess", event);
  };
}

class Storage {
  database: IDBDatabase | undefined;
  constructor() {
    this.init();
  }

  static create() {
    return new Storage();
  }

  private async init() {
    console.log("[IndexedDB] inited");
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = function () {
      const db = request.result;
      if (!db.objectStoreNames.contains(DB_STORE_NAME_1)) {
        db.createObjectStore(DB_STORE_NAME_1, { keyPath: "id" });
      }

      if (!db.objectStoreNames.contains(DB_STORE_NAME_2)) {
        db.createObjectStore(DB_STORE_NAME_2, { autoIncrement: true });
      }

      switch (db.version) {
        case 0: {
          console.log("DB version 0");
          break;
        }
        case 1: {
          console.log("DB version 1");
          break;
        }
      }
    };

    request.onerror = function () {
      console.error("Error", request.error);
    };

    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = function () {
        db.close();
        alert("База данных устарела, пожалуста, перезагрузите страницу.");
      };
      this.database = db;
    };
  }

  async setItem(key: string, value: any) {
    return new Promise((resolve, rejects) => {
      if (!this.database) throw "Database not found";
      const transaction = this.database.transaction(
        DB_STORE_NAME_1,
        "readwrite"
      );
      if (!transaction) throw "Transaction not found";
      const store = transaction.objectStore(DB_STORE_NAME_1);
      const req = store.put({ id: key, value: value });
      req.onsuccess = function () {
        console.log(req.result);
        resolve("Success");
      };
      req.onerror = function () {
        console.log("Ошибка", req.error);
        rejects(req.error);
      };
      transaction.oncomplete = function (event) {
        console.log("Транзакция выполнена", { event });
      };
    });
  }

  async getItem(key: string) {
    return new Promise((resolve, rejects) => {
      if (!this.database) throw "Database not found";
      const transaction = this.database.transaction(
        DB_STORE_NAME_1,
        "readwrite"
      );
      if (!transaction) throw "Transaction not found";
      const store = transaction.objectStore(DB_STORE_NAME_1);
      const req = store.get(key);
      req.onsuccess = function () {
        resolve(req.result.value);
      };
      req.onerror = function () {
        console.log("Ошибка", req.error);
        rejects(`Not found key: ${key}`);
      };
      transaction.oncomplete = function (event) {
        console.log("Транзакция выполнена", { event });
      };
    });
  }
}

export const indexedDb = Storage.create()
