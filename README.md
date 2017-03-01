# Overwire

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][climate-image]][climate-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

> Library for loading scripts and dependencies over the wire (network)

## Getting Started

overwire is universal, so it can be used client-side or server-side.

1. Install through: `npm install --save overwire`

2. Include and use `overwire`:

    ```javascript
  import { load } from 'overwire';
  load([ 'some/script/path' ]) // load scripts over the wire
    .then(() => {
      console.log('scripts loaded successfully!')
    })
    .catch((err) => {
      console.error('error loading scripts:', err)
    })
    ```

## [Documentation](https://pyrolabs.github.com/overwire)

[npm-image]: https://img.shields.io/npm/v/overwire.svg?style=flat-square
[npm-url]: https://npmjs.org/package/overwire
[travis-image]: https://img.shields.io/travis/pyrolabs/overwire/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/pyrolabs/overwire
[daviddm-image]: https://img.shields.io/david/pyrolabs/overwire.svg?style=flat-square
[daviddm-url]: https://david-dm.org/pyrolabs/overwire
[climate-image]: https://img.shields.io/codeclimate/github/pyrolabs/overwire.svg?style=flat-square
[climate-url]: https://codeclimate.com/github/pyrolabs/overwire
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/pyrolabs/overwire.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/pyrolabs/overwire
[license-image]: https://img.shields.io/npm/l/overwire.svg?style=flat-square
[license-url]: https://github.com/pyrolabs/overwire/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
