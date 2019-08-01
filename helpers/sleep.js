import Chalk from 'chalk'

export default ms => {
  return () => {
    console.log(Chalk.yellow('======================================================'))
    console.log(Chalk.yellow('Sleeping for ' + ms + ' milliseconds'))
    console.log(Chalk.yellow('======================================================'))

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(false)
      }, ms)
    })
  }
}
