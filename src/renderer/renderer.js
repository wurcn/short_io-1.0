document.addEventListener('DOMContentLoaded', () => {
  const inputUrl = document.getElementById('inputUrl')
  const generateBtn = document.getElementById('generateBtn')
  const resultArea = document.querySelector('.result-area')
  const resultLink = document.getElementById('resultLink')
  const copyBtn = document.getElementById('copyBtn')
  const historyList = document.getElementById('historyList')

  // 生成短链接
  generateBtn.addEventListener('click', async () => {
    const url = inputUrl.value.trim()
    
    if (!url) {
      alert('请输入有效的URL')
      return
    }

    try {
      const shortUrl = await window.api.generate(url)
      resultLink.href = shortUrl
      resultLink.textContent = shortUrl
      resultArea.hidden = false
      
      // 更新历史记录
      updateHistory()
    } catch (error) {
      alert(error.message)
    }
  })

  // 复制短链接
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(resultLink.href)
      .then(() => alert('已复制到剪贴板'))
      .catch(err => console.error('复制失败:', err))
  })

  // 更新历史记录列表
  async function updateHistory() {
    const history = await window.api.getHistory()
    historyList.innerHTML = history.map(item => 
      `<li>
        <div><strong>原链接:</strong> ${item.longUrl}</div>
        <div><strong>短链接:</strong> <a href="${item.shortUrl}" target="_blank">${item.shortUrl}</a></div>
        <div><small>${new Date(item.createdAt).toLocaleString()}</small></div>
      </li>`
    ).join('')
  }

  // 初始化时加载历史记录
  updateHistory()
})