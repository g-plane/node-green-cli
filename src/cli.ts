#!/usr/bin/env node
import run from '.'

void (async () => {
  process.exitCode = await run(process.argv.slice(2))
})()
