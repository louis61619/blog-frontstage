const devBaseURL = "http://localhost:7001"
const proBaseURL = process.env.NEXT_PUBLIC_URL
// export const BASE_URL = process.env.NODE_ENV === "development" ? devBaseURL: proBaseURL
export const BASE_URL = proBaseURL

export const TIMEOUT = 5000