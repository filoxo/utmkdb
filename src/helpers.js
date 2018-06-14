export const partial = (f, a) => b => f(a, b)

export const copyObject = d => JSON.parse(JSON.stringify(d))
