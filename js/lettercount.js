var Rx = require('rxjs')

(function () {
  const $toCount = document.querySelector('#toCount')
  const $result = document.querySelector('#result')

  const source = Rx.Observable.fromEvent($toCount, 'keyup')
    .map((e) => `length: ${e.target.value.length}`)
    .distinctUntilChanged()

  const setHtml = (text) => {
    console.log(text)
    this.innerHtml = text
  }

  source.subscribe(setHtml.bind($result))
}())
