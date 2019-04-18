export const getTime = (timestamp: number): string => new Date(timestamp).toString().split('GMT')[0]

export const getTimeZone = (timestamp: number): string => new Date(timestamp).toString().split('GMT')[1]

export const getText = (text: string): string => text.length > 40 ? `${text.slice(0, 40)}...` : text