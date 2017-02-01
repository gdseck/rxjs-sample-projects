(function () {
  var Rx = require('rxjs')
  const $toCount = document.querySelector('#toCount')
  const $result = document.querySelector('#result')

  const source = Rx.Observable
    .fromEvent($toCount, 'keyup')
    .map(e => `length: ${e.target.value.length}`)
    .distinctUntilChanged()

  const setHtml = text => {
    console.log(text)
    $result.innerHTML = text
  }

  source.subscribe(setHtml.bind($result))
}())
