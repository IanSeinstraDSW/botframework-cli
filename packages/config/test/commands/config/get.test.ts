import {expect, test} from '@oclif/test'
import {initTestConfigFile, deleteTestConfigFile, getConfigFile} from '../../configfilehelper'
const fs = require('fs-extra')

describe('config:get', () => {
  before(async function() {
    await initTestConfigFile()
  });

  after(async function() {
    await deleteTestConfigFile()
  });

  test
    .stdout()
    .command(['config:get'])
    .it('Displays config file data', ctx => {
      expect(ctx.stdout).to.contain('"subscriptionKey": "222222cccccctttttth223kk3k33"')
    })
})