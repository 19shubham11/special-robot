interface GiphyData {
    type: string
    id: string
    title: string
    images: {
        original: {
            url: string
        }
    }
}

export interface GiphyResponse {
    data: GiphyData
}
