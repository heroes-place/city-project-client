export default class MapCache {
  constructor() {
    this.cache = [
      [],
      [],
      []
    ]
  }

  getCache() {
    return this.cache
  }

  clearCache() {
    delete this.cache

    this.cache = [
      [],
      [],
      []
    ]
  }
}
