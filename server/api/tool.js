const request = require('request')

function getRandom(start, end, size) {
  let allRandms = []
  size = size ? (size > end - start ? end - start : size) : 1
  for (let i = start; i <= end; i++) {
    allRandms.push(i)
  }
  allRandms.sort(() => {
    return 0.5 - Math.random()
  })
  return size == 1 ? allRandms[0] : allRandms.slice(0, size)
}

module.exports = {
  getRandom,
}