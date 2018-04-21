import chalk from 'chalk'
import logSymbols = require('log-symbols')
import run from '../src'

test('run cli', async () => {
  const origin = process.stdout.write
  const mock = jest.fn()
  process.stdout.write = mock

  await expect(run([
    'Function.prototype.toString',
    'revision'
  ])).resolves.toBe(0)

  const table: string = mock.mock.calls[0][0]
  expect(table).toEqual(expect.stringContaining(chalk.cyan('ES Version')))
  expect(table).toEqual(expect.stringContaining(chalk.cyan('Feature Type')))
  expect(table).toEqual(expect.stringContaining(chalk.cyan('Category')))
  expect(table).toEqual(expect.stringContaining(chalk.cyan('Feature')))
  expect(table).toEqual(expect.stringContaining(chalk.cyan('Availability')))
  expect(table).toEqual(expect.stringContaining(
    `${logSymbols.success} ${chalk.green('Yes')}`
  ))
  expect(table).toEqual(expect.stringContaining(
    `${logSymbols.error} ${chalk.red('No')}`
  ))
  expect(mock.mock.calls[1][0]).toEqual(
    expect.stringContaining('(Node.js: 8.11.1, V8: 6.2.414.50)')
  )

  process.stdout.write = origin
})
