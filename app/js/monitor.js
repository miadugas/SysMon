const path = require('path')
const osu = require('node-os-utils')
const cpu = osu.cpu
const mem = osu.mem
const os = osu.os


let cpuOverload = 80

// Run check every 2 seconds
setInterval(() => {
// CPU Usage
    cpu.usage().then((info) => {
    document.getElementById('cpu-usage').innerText = info + '%'
  
    document.getElementById('cpu-progress').style.width = info + '%'
  
// Make progress bar red if overload
       if (info >= cpuOverload) {
        document.getElementById('cpu-progress').style.background = 'red'
       } else {
         document.getElementById('cpu-progress').style.background = '#30c88b'
       }
       
    })

//   CPU Free
  cpu.free().then((info) => {
    document.getElementById('cpu-free').innerText = info + '%'
  })

//   Uptime
  document.getElementById('sys-uptime').innerText = secondsToDhms(os.uptime())
}, 2000)

// Set CPU model
document.getElementById('cpu-model').innerText = cpu.model()

// Computer Name
document.getElementById('comp-name').innerText = os.hostname()

// OS Info
document.getElementById('os').innerText = `${os.type()} ${os.arch()}`

// Total Mem
mem.info().then((info) => {
    document.getElementById('mem-total').innerText = info.totalMemMb
  })

// Show days, hours, mins, sec
function secondsToDhms(seconds) {
    seconds = +seconds
    const d = Math.floor(seconds / (3600 * 24))
    const h = Math.floor((seconds % (3600 * 24)) / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    return `${d}d, ${h}h, ${m}m, ${s}s`
  }
