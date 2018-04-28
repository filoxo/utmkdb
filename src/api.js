import Airtable from 'airtable'

const api = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY
}).base('apptyRpS79WAEfYmy')

export default api
