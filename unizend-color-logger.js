const uzl = {}

uzl.actions = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m"
}

uzl.colors = {
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m"
}

uzl.log = (action, message) => {
  let style
  let msg
  
  switch (action) {
    case 'black':
      style = uzl.colors.black
      msg = (message) ? message : 'There is no message to log'
      break
    case 'red':
      style = uzl.colors.red
      msg = (message) ? message : 'There is no message to log'
      break
    case 'green':
      style = uzl.colors.green
      msg = (message) ? message : 'There is no message to log'
      break
    case 'yellow':
      style = uzl.colors.yellow
      msg = (message) ? message : 'There is no message to log'
      break
    case 'blue':
      style = uzl.colors.blue
      msg = (message) ? message : 'There is no message to log'
      break
    case 'magent':
      style = uzl.colors.magent
      msg = (message) ? message : 'There is no message to log'
      break
    case 'cyan':
      style = uzl.colors.cyan
      msg = (message) ? message : 'There is no message to log'
      break
    case 'white':
      style = uzl.colors.white
      msg = (message) ? message : 'There is no message to log'
      break
    default:
      style = uzl.actions.reset
      msg = action
  }
  
  return (style) ? console.log(style, msg) & console.log(uzl.actions.reset) : console.log(msg)
}

// uzl.log('Hello, World!')

// uzl.log('blue', 'Turning Blue!')

// uzl.log('blue')

// uzl.log('blue sea')

// uzl.log('Testing reset')

// uzl.log('cyan', 'Displaying the color you see!')

module.exports = uzl