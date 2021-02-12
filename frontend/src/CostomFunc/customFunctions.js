export const getTimestamp = timestamp => {
    let date = new Date(timestamp)
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let year = date.getFullYear()
    let month = ('0' + (date.getMonth() + 1)).substr(-2)
    let day = ('0' + date.getDate()).substr(-2)
    let hour = ('0' + date.getHours()).substr(-2)
    let minutes = ('0' + date.getMinutes()).substr(-2)
    let seconds = ('0' + date.getSeconds()).substr(-2)
    let dayOfWeek = days[date.getDay()]

    return {
        fullDate:
            dayOfWeek +
            ' ' +
            day +
            '-' +
            month +
            '-' +
            year +
            ' ' +
            hour +
            ':' +
            minutes +
            ':' +
            seconds,
        day: day,
        month: month,
        hours: hour,
        minutes: minutes,
        dayOfWeek: dayOfWeek,
    }
}
