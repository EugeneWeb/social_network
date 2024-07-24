type ValidatorType = (value: string) => string | undefined 

export const required = (value: string) => {
    if(value) return null
    return "Поле является обязательным"
}

export const maxLength = (length: number) => ((value: string) => {
    if(!value) return null
    if(value.length < length) return null
    return `Поле может содержать максимум ${length} символов` 
})

