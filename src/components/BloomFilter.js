class BloomFilter {
    constructor(numElements, numHashFunctions) {
      this.numElements = numElements;
      this.numHashFunctions = numHashFunctions;
      this.bitArray = new Array(numElements).fill(false);
    }
  
    getHashValues(input) {
      const hashValues = new Array(this.numHashFunctions);
      const hash1 = this.hashCode(input);
      const hash2 = hash1;
  
      for (let i = 0; i < this.numHashFunctions; i++) {
        hashValues[i] = Math.abs((hash1 + i * hash2) % this.numElements);
      }
  
      return hashValues;
    }
  
    add(input) {
      const hashValues = this.getHashValues(input);
  
      for (const hash of hashValues) {
        this.bitArray[hash] = true;
      }
    }
  
    contains(input) {
      const hashValues = this.getHashValues(input);
  
      for (const hash of hashValues) {
        if (!this.bitArray[hash]) {
          return false;
        }
      }
      return true;
    }
  
    getBitArray() {
      return this.bitArray;
    }
  
    setBitArray(newBitArray) {
      this.bitArray = newBitArray;
    }
  
    hashCode(input) {
      let hash = 0;
      if (input.length === 0) return hash;
  
      for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash &= hash; // Converte para 32 bits inteiro
      }
  
      return hash;
    }
  }
  
export default BloomFilter;  
