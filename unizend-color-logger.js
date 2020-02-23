// Copyright (c) 2019 Santiago Rincón

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

"use strict"

const originalLogger = console.log,
    fs = require('fs'), // Only for debugging purposes
    writeStream = fs.createWriteStream('logs.txt') // Only for debugging purposes

/**
 * unizend-color-logger Object object
 * 
 * @since  0.2.0
 */
const uzl = {}

/**
 * Text colors
 * 
 * @since  0.2.0
 */
uzl.fgColors = {
  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39]
}

/**
 * Bright colors
 * 
 * TODO make it work
 * 
 * @since  0.2.0
 */
uzl.bright = {
  colors: {
    red: [91, 39],
    green: [92, 39],
    yellow: [93, 39],
    blue: [94, 39],
    magenta: [95, 39],
    cyan: [96, 39],
    white: [97, 39]
  },
  bgColors: {
    black: [100, 49],
    red: [101, 49],
    green: [102, 49],
    yellow: [103, 49],
    blue: [104, 49],
    magenta: [105, 49],
    cyan: [106, 49],
    white: [107, 49]
  }
}

/**
 * Background colors
 * 
 * @since  0.2.0
 */
uzl.bgColors = {
  black: [40, 49],
  red: [41, 49],
  green: [42, 49],
  yellow: [43, 49],
  blue: [44, 49],
  magenta: [45, 49],
  cyan: [46, 49],
  white: [47, 49]
}

/**
 * Styles
 * 
 * @since  0.2.0
 */
uzl.styles = {
  reset: [0, 0],
  bold: [1, 22],
  dim: [2, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29]
}

/**
 * Style actions
 * 
 * // Deprecated
 * 
 * @since 0.1.0
 * @deprecated 0.2.0
 */
uzl.actions = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m"
}

/**
 * Text colors
 * 
 * // Deprecated
 * 
 * @since 0.1.0
 * @deprecated 0.2.0
 */
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

/**
 * Style actions
 * 
 * // Deprecated
 * 
 * @since 0.1.0
 * @deprecated 0.2.0
 */
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
  
  return (style) ? console.log(style, msg + ' uzl.log is deprecated and will be removed in future versions') & console.log(uzl.actions.reset) : console.log(msg + ' uzl.log is deprecated and will be removed in future versions')
}

/**
 * Change console.log behavior
 * 
 * @since 0.2.0
 */
console.log = function () {

  if (arguments.length > 1) {
    let options = arguments[0].split('.')

    for (let i = 0; i < options.length; i++) {
      if (uzl.colors[options[i]]) {
        arguments[0] = '\x1b[' + uzl.colors[options[i]][0] + 'm' + options[i] + '\x1b[' + uzl.colors[options[i]][1] + 'm'
        writeStream.write(arguments[0])
        break
      } else if (options[i].substr(0, 3) === 'bg-' && uzl.bgColors[options[i].substr(options[i].indexOf('-') + 1)]) {
        arguments[0] = '\x1b[' + uzl.bgColors[options[i].substr(options[i].indexOf('-') + 1)][0] + 'm' + options[i].substr(options[i].indexOf('-') + 1) + '\x1b[' + uzl.bgColors[options[i].substr(options[i].indexOf('-') + 1)][1] + 'm'
        writeStream.write(arguments[0])
        break
      } else if (uzl.styles[options[i]]) {
        arguments[0] = '\x1b[' + uzl.styles[options[i]][0] + 'm' + options[i] + '\x1b[' + uzl.styles[options[i]][1] + 'm'
        writeStream.write(arguments[0])
        break
      }
    }
  }

  // You can still call the original `console.log`, with all the `arguments`
  originalLogger.apply(this, arguments);
}

module.exports = uzl