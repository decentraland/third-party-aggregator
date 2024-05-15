export class SubgraphService {
  async fetch<T>(url: string, query: string): Promise<T | undefined> {
    try {
      const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify({
          query,
        }),
      }

      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error('Network response was not ok.')
      }

      const data = (await response.json()) as T
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default new SubgraphService()
