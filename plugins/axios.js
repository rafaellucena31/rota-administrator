export default function ({ $axios }, inject) {
    const apiAuth = $axios.create({
      headers: {
        common: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    })
    apiAuth.setBaseURL(process.env.URL_BASE_AUTH)
    inject('apiAuth', apiAuth)

    const apiRota = $axios.create({
        headers: {
          common: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      })
      apiRota.setBaseURL(process.env.URL_BASE_ROTA)
      inject('apiRota', apiRota)
  }