import { $authHost } from './axios'

function getTIMESTAMP(timestamp) {
    let date = new Date(timestamp)
    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]
    let year = date.getFullYear()
    let month = ('0' + (date.getMonth() + 1)).substr(-2)
    let day = ('0' + date.getDate()).substr(-2)
    let hour = ('0' + date.getHours()).substr(-2)
    let minutes = ('0' + date.getMinutes()).substr(-2)
    let seconds = ('0' + date.getSeconds()).substr(-2)
    let dayOfWeek = days[date.getDay()]

    return (
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
        seconds
    )
}
