import { Handler } from '@netlify/functions'
import crypto from 'crypto'

const handler: Handler = async (_) => {
    const str = crypto.randomBytes(4).toString('hex')

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: str }),
    }
}

export { handler }
