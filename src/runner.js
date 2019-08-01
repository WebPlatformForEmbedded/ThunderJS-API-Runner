import Chalk from 'chalk'
import Contra from 'contra'
import ThunderJS from 'thunderjs'

import config from '../config'
const thunderJS = ThunderJS(config)

const listen = (listeners, cb) => {
  Contra.each.series(
    listeners,
    (listener, next) => {
      console.log(Chalk.yellow('======================================================'))
      console.log(Chalk.yellow(listener.name))
      console.log(Chalk.yellow('======================================================'))

      thunderJS.on(listener.plugin, listener.event, listener.cb)
      next()
    },
    () => {
      console.log('done setting up listeners')
      if (cb && typeof cb === 'function') {
        setTimeout(() => {
          cb()
        }, 1000)
      }
    }
  )
}

const run = (calls, cb) => {
  Contra.each.series(
    calls,
    (call, next) => {
      if (typeof call === 'function') {
        call = call()
      }

      resolve(call).then(call => {
        if (call === false) {
          next()
        } else {
          console.log(Chalk.yellow('======================================================'))
          console.log(Chalk.yellow(call.name))
          console.log(Chalk.yellow('======================================================'))

          thunderJS[call.plugin]
            [call.method](call.params)
            .then(result => {
              console.log(Chalk.green(['✅', call.plugin, call.method].join(' ')))
              console.log(Chalk.green(JSON.stringify(result, null, 2)))
            })
            .catch(err => {
              console.log(Chalk.red(['❌', call.plugin, call.method].join(' ')))
              console.log(Chalk.red(JSON.stringify(err, null, 2)))
            })
            .finally(() => {
              console.log('\n\n')
              setTimeout(() => {
                next()
              }, call.timeout || 1500)
            })
        }
      })
    },
    () => {
      console.log(Chalk.yellow('======================== Done ========================'))
      console.log('\n\n')
      if (cb && typeof cb === 'function') {
        cb()
      } else {
        process.exit()
      }
    }
  )
}

const resolve = result => {
  // not a promise, so let's return one
  if (!(result && result.then && typeof result.then === 'function')) {
    return new Promise(resolve => {
      resolve(result)
    })
  }
  // return the existing promise
  else {
    return result
  }
}

export default {
  thunderJS,
  run,
  listen,
}
