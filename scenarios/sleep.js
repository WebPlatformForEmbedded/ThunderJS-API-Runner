import WebKitBrowser from '../calls/WebKitBrowser'
import sleep from '../helpers/sleep'

export default [
  WebKitBrowser.activate,
  sleep(4000),
  WebKitBrowser.seturl('https://metrological.com'),
  sleep(5000),
  WebKitBrowser.seturl('https://google.com'),
  sleep(5000),
  WebKitBrowser.seturl('https://metrological.com'),
]
