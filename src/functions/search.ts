import { Handler } from '@netlify/functions'
import { config } from '../config'
import * as gif from '../giphy/api'

const giphyAPI = gif.api(config, 'pg')

const handler: Handler = async (event, _) => {
    const q = event.queryStringParameters?.q

    if (!q) {
        return { statusCode: 400, body: 'query param "q" missing' }
    }

    try {
        const url = await giphyAPI.getRandomGIF(q)
        return {
            statusCode: 200,
            body: `<html><body><img src='${url}'/></body></html>`,
        }
    } catch (err) {
        return { statusCode: 500, body: 'Internal Error' }
    }
}

export { handler }
