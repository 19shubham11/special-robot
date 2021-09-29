interface GiphyData {
    type: string
    id: string
    image_original_url: string
    title: string
}

export interface GiphyResponse {
    data: GiphyData
}
