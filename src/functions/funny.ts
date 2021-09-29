import { Handler } from '@netlify/functions'
import * as giphyAPI from '../giphy/api'

const handler: Handler = async (event, _) => {
    try {
        const url = await giphyAPI.getRandomGIF('funny')
        return {
            statusCode: 200,
            body: `<html><body><img src='${url}'/></body></html>`,
        }
    } catch (err) {
        return { statusCode: 500 }
    }
}

export { handler }
