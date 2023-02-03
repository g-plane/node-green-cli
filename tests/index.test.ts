import { expect, test, vi } from 'vitest'
import c from 'ansi-colors'
import run from '../src'

Object.defineProperty(process, 'version', { writable: true })

test('run cli', async () => {
  const mock = vi.fn()
  process.stdout.write = mock

  await expect(
    run(['--node-version=19.0.0', 'Function.prototype.toString', 'revision'])
  ).resolves.toBe(0)

  const [[table]]: string[][] = mock.mock.calls
  expect(table).toEqual(expect.stringContaining(c.cyan('ES Version')))
  expect(table).toEqual(expect.stringContaining(c.cyan('Feature Type')))
  expect(table).toEqual(expect.stringContaining(c.cyan('Category')))
  expect(table).toEqual(expect.stringContaining(c.cyan('Feature')))
  expect(table).toEqual(expect.stringContaining(c.cyan('Availability')))
})
