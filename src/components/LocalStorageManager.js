import Dexie from 'dexie';

export class LocalStorageManager extends Dexie {
    constructor() {
        super('storageDatabase');
        this.created_date = new Date().getTime();
        this.version(1).stores({
          storage: 'key, value, expiration',
        });
    }
  
    async setWithExpiration(key, value, expirationInSeconds) {
      const now = new Date().getTime();
      const expirationTime = now + expirationInSeconds * 1000;
  
      await this.storage.add({ key, value, expirationTime })
    }
  
    async getWithExpiration(key) {
      const storedData = await this.storage.where('key').equalsIgnoreCase(key).first()
      if (storedData) {
//        const now = new Date().getTime();
        return storedData.value;
  
//        if (now < storedData.expiration) {
//          return storedData.value;
//        } else {
//          console.log('Excluindo....');
//          await this.storage.delete(storedData.key);
//          return storedData.value;
//        }
      }
  
      return null;
    }
    async hasKey(key) {
        const storedData = await this.storage.where('key').equalsIgnoreCase(key).first();
        return storedData != null;
    }    
}

export const localStorageManager = new LocalStorageManager();
