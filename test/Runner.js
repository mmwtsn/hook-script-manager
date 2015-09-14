/* global describe, it */

import assert from 'assert'
import child_process from 'child_process'
import sinon from 'sinon'
import Runner from '../src/Runner'

const configPath = './test/fixtures/config.json'

describe('Runner', () => {
  it('is a class', done => {
    const runner = new Runner('update', configPath)

    assert.strictEqual(typeof Runner, 'function')
    assert.strictEqual(runner.constructor, Runner)

    done()
  })

  it('requires a hook', done => {
    assert.throws(() => {
      return new Runner()
    }, /Missing required/)

    done()
  })

  it('validates its hook', done => {
    ['precommit', 'pre_commit', 'Commit'].map(hook => {
      assert.throws(() => {
        return new Runner(hook, configPath)
      }, /not valid hook name/)
    })

    done()
  })

  it('validates its config when provided', done => {
    assert.throws(() => {
      return new Runner('pre-commit', 'does-not-exist.json')
    }, /no such file/)

    assert.throws(() => {
      return new Runner('pre-commit', './test/Runner.js')
    }, SyntaxError)

    done()
  })

  describe('#hook', () => {
    it('holds the target hook script name', done => {
      const runner = new Runner('commit-msg', configPath)

      assert.strictEqual(runner.hook, 'commit-msg')

      done()
    })
  })

  describe('#run', () => {
    it('calls child_process.spawn once', done => {
      const stub = sinon.stub(child_process, 'spawn')
      const runner = new Runner('update', configPath)

      runner.run()
      assert(stub.calledOnce)

      done()
    })
  })
})
