const priceFormat = (value: number) => Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL'}).format(value)

export default priceFormat;