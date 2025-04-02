const history = []

module.exports = {
  addRecord: (longUrl, shortUrl) => {
    history.push({
      id: Date.now(),
      longUrl,
      shortUrl,
      createdAt: new Date().toISOString()
    })
  },
  
  getHistory: () => [...history].reverse(),
  
  clearHistory: () => {
    history.length = 0
  }
}