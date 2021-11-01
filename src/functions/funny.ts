import { Handler } from '@netlify/functions'
import { config } from '../config'
import * as gif from '../giphy/api'

const giphyAPI = gif.api(config, gif.ContentRating.PG)

const handler: Handler = async (event, _) => {
    try {
        const url = await giphyAPI.getRandomGIF('funny')
        return {
            statusCode: 200,
            body: `<html ><body><img src='${url}'/></body></html>`,
        }
    } catch (err) {
        return { statusCode: 500, body: 'Internal Error' }
    }
}

export { handler }
