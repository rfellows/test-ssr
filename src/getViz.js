import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Viz from './viz'
import fs from 'fs'
import puppeteer from 'puppeteer'
import path from 'path'
import devices from 'puppeteer/DeviceDescriptors'
import minimist from 'minimist'
import _ from 'lodash'

const argv = minimist(process.argv.slice(2), {
  default: {
    baseUrl: 'http://localhost:9000',
    devMode: false,
    device: 'iPad landscape'
  }
})
console.dir(argv);

const baseUrl = argv.baseUrl
const vizId = argv.vizId
const user = argv.user
const password = argv.password

const vizUrl = baseUrl + '/open/' + vizId
const loginUrl = baseUrl + '/login'

const renderImage = async () => {
  const browser = await puppeteer.launch({devtools: argv.devMode})
  const page = await browser.newPage()

  // Object.keys(devices).forEach(key => console.log(key))
  const device = devices[argv.device]
  await page.emulate(device)

  console.log('Logging in to ' + baseUrl)

  await page.goto(loginUrl)
  // enter the email address
  await page.click('#formEmail')
  await page.keyboard.type(user)

  // enter the password
  await page.click('#formPass')
  await page.keyboard.type(password)

  // click the login button
  await page.click('button.btn-primary')

  // wait for a DOM element we know about to be available before going to the viz
  console.log('Waiting for #contentDiv')
  await page.waitForSelector('#contentDiv')

  console.log('Opening URL ' + vizUrl)
  await page.goto(vizUrl)

  const svgSelector = 'svg.viz-chart'
  console.log('Waiting for svg.viz-chart to become available')
  await page.waitForSelector(svgSelector)

  console.log('Found the selector, now grab the element...');
  const svgElement = await page.$(svgSelector)

  console.log('Got the element, now take the screenshot...');
  const outputFile = './' + vizId + '.png'
  
  await svgElement.screenshot({path: outputFile})
  console.log('Saved thumbnail to ' + path.resolve(outputFile));

  await browser.close()
}

renderImage()
