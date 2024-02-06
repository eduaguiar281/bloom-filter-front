import axios from 'axios';
import { localStorageManager } from './LocalStorageManager';

class BloomFilterContainer {
  constructor() {
    if (!BloomFilterContainer.instance) {
      this._bits = null;
      BloomFilterContainer.instance = this;
      this.keyName = "bloomFilterName";
    }
    return BloomFilterContainer.instance;
  }

  async getBits() {
    
    const haskey = await localStorageManager.hasKey(this.keyName);
    if (! await localStorageManager.hasKey(this.keyName)) {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/users/emails-bloomfilter`)
        .then(async response => { 
          await this._setBits(response.data.bitArray);
        })
        .catch(error => console.error('Error fetching users:', error));
    }
    else{
      this._bits = await localStorageManager.getWithExpiration(this.keyName)
    }

    return this._bits;
  }

  async _setBits(arrayBits) {
    this._bits = arrayBits;
    localStorageManager.setWithExpiration(this.keyName, this._bits, 60000);
  }
}

export default new BloomFilterContainer();
