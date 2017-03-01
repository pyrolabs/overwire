import lib from '../../src'
console.log('lib', lib)

describe('Overwire Library', () => {
  describe('library', () => {
    it('exists', () => {
      expect(lib).to.exist
      expect(lib).to.have.keys('load')
    })
  })
  describe('load method', () => {
    it('has unit test scaffolding', () => {
      expect(lib.load).to.be.a.function
      lib.load([
        'some/script'
      ])
    })
  })
})
