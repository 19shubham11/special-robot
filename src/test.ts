import * as giphyAPI from './giphy/api'

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
