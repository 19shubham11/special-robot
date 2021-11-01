import { config } from './config'
import * as gif from './giphy/api'

const giphyAPI = gif.api(config, gif.ContentRating.PG)

async function test() {
    try {
        const gif = await giphyAPI.getRandomGIF('funny')
        console.log('gif', gif)
    } catch (err) {
        console.log('err')
    }
}

async function main() {
    await test()
}

main()
