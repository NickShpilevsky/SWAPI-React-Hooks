class LS {
  constructor(initialData) {
    if(initialData) {
      if(!this.isInstalled(initialData.key)) {
        this.set(initialData.key, initialData.data);
      }
    }
  }

  get(key) {
    const item = localStorage.getItem(key);
    return JSON.parse(item);
  }

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  isInstalled(key) {
    return localStorage.getItem(key) ? true : false;
  }

  delete(key) {
    localStorage.removeItem(key);
  }

  clearKey(key) {
    localStorage.setItem(key, '');
  }

  clearAll() {
    localStorage.clear();
  }
}

export default LS;