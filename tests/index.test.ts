import chalk from 'chalk'
import run from '../src'

Object.defineProperty(process, 'version', { writable: true })

test('run cli', async () => {
  const mock = jest.fn()
  process.stdout.write = mock

  await expect(run([
    'Function.prototype.toString',
    'revision',
  ])).resolves.toBe(0)

  const [[table]]: string[][] = mock.mock.calls
  expect(table).toEqual(expect.stringContaining(chalk.cyan('ES Version')))
  expect(table).toEqual(expect.stringContaining(chalk.cyan('Feature Type')))
  expect(table).toEqual(expect.stringContaining(chalk.cyan('Category')))
  expect(table).toEqual(expect.stringContaining(chalk.cyan('Feature')))
  expect(table).toEqual(expect.stringContaining(chalk.cyan('Availability')))
})
