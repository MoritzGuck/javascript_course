

export async function fetchWikipediaSummary(title) {
    try {
        let response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`) //only gets headers for now
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Fragment not found in Wikipedia archives (404).")
            }
            else {
                throw new Error(`Archive transmission failed: ${response.statusText} (${response.status})`);
            }
        } else {
            let data = await response.json() // gets the remaining stream from network - takes time, thus second await
            return {
                title: data.title, 
                extract: data.extract,
                thumbnail: data.thumbnail?.source
            }
        }
    } catch (error) {
        throw error
    }
}

