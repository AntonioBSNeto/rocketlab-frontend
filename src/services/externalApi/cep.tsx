export function cepSearch (cep: string) {
  return fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`, {
    method: 'get'
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 404) {
        throw new Error('CEP não encontrado')
      } else {
        throw new Error(
          'Problema ao pesquisar CEP, tente novamente mais tarde.'
        )
      }
    })
    .catch(res => {
      console.clear()
      console.log(res)
      throw new Error(
        'CEP não encontrado'
      )
    })
}