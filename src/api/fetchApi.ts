/**
 * Sends an HTTP GET request to the given URL.
 * The response is always in JSON format.
 * @param url The url to send the request to.
 * @returns The JSON response body of the request.
 */
const get = async <T>(url: string): Promise<T> => {
  const headers = {
    Accept: 'application/json',
  }
  const response = await fetch(`local-proxy/${url}`, {
    headers,
    method: 'Get',
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return await response.json()
}

export const fetchApi = { get }
