import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Viz from './viz'
import fs from 'fs'
import svg2png from 'svg2png'
import puppeteer from 'puppeteer'
import path from 'path'

const vizString = ReactDOMServer.renderToString(<Viz />)
console.log(vizString)
const outFile = './src/index.html'
console.log(path.resolve(outFile))
const content = fs.readFileSync(outFile, 'utf8')

const doc = content.replace(/<svg id="image"><\/svg>/, vizString)
fs.writeFile('./svg.html', new Buffer(doc, 'utf8'))

const renderImage = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const fullPath = path.resolve('./svg.html')
  console.log('Loading file ' + fullPath)
  await page.goto('file://' + fullPath)
  await page.screenshot({path: './headless_screenshot.png'})

  await browser.close()
}

renderImage()


// const svgBuffer = new Buffer(vizString, 'utf-8')
// svg2png(svgBuffer)
//   .then(buffer => fs.writeFile('svgAs.png', buffer))
//   .catch(e => console.error('ERR: ', e))
//   .then(err => console.log('Saved file as svgAs.png'))


// const d3n = new D3Node( {canvasModule} )
// const canvas = d3n.createCanvas(500, 500)
// const context = canvas.getContext('2d')
//
// const stream = canvas.pngStream().pipe(fs.createWriteStream('fromCanvas.png'))
