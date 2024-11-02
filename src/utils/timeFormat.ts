import dayjs from 'dayjs';

function timeFormat(date: dayjs.ConfigType, format: string) {
    return dayjs(date).format(format)
}

export default timeFormat