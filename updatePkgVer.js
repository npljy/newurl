const fs = require('fs')
const axios = require('axios')

fs.readFile('./publicPkg.json', 'utf8', async (err, data) => {
  if (err) throw err

  const res = await axios.get('https://registry.npmjs.org/url-new')
  let oldVer = res?.data['dist-tags']?.latest
  // console.log('current version: ', oldVer)

  if (!oldVer) {
    oldVer = '1.0.0'
  }

  const jsData = JSON.parse(data)
  const oldVers = oldVer.split('.')
  const oldVerArr = oldVers.map(e => e * 1)

  if (oldVerArr[2] < 999) {
    oldVerArr[2] = 1 + oldVerArr[2]
  } else {
    oldVerArr[2] = 1
    if (oldVerArr[1] < 99) {
      oldVerArr[1] = 1 + oldVerArr[1]
    } else {
      oldVerArr[1] = 1
      oldVerArr[0] = 1 + oldVerArr[0]
    }
  }

  const newVer = oldVerArr.join('.')
  jsData.version = newVer
  // console.log('new version: ', newVer)
  const strData = JSON.stringify(jsData)

  fs.writeFile('./publicPkg.json', strData, 'utf8', (err) => {
    if (err) throw err
  })

  fs.writeFile('./dist/package.json', strData, 'utf8', (err) => {
    if (err) throw err
  })

})