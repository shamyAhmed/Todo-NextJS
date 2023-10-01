export const removeTimeISO = (date:Date) => {
    if (Object.prototype.toString.call(date) !== "[object Date]"){
        return undefined
    }
    if (typeof(date))
    date.setHours(0, 0, 0, 0)
    return date.toISOString()
}