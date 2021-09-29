import assert from 'assert'
import nock from 'nock'

import * as api from './api'
import { config } from '../config'
import { GiphyResponse } from './models'

describe('getRandomGIF', () => {
    afterEach(nock.cleanAll)

    it('should return a url if giphy returns 200', async () => {
        const mockURL = 'https://mocked-gif-url'
        const mockResp: GiphyResponse = {
            data: {
                type: 'gif',
                image_original_url: mockURL,
                id: 'fdfdd',
                title: 'Mock Gif!',
            },
        }

        nock(config.giphy.baseURL).persist().get(config.giphy.randomGIFPath).query(true).reply(200, mockResp)

        const url = await api.getRandomGIF('fun')
        assert.strictEqual(url, mockURL)
    })

    it('should throw if giphy returns 40x', async () => {
        nock(config.giphy.baseURL).persist().get(config.giphy.randomGIFPath).query(true).reply(400)

        await assert.rejects(api.getRandomGIF('fun'), (err: Error) => {
            assert.match(err.message, /giphy error/)
            return true
        })
    })
})
