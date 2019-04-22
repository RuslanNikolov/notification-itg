export const getTime = (timestamp: number): string => new Date(timestamp).toString().split('GMT')[0]

export const getTimeZone = (timestamp: number): string => new Date(timestamp).toString().split('GMT')[1]

export const getText = (text: string, maxLength: number = 50): string => text.length > maxLength ? `${text.slice(0, maxLength)}...` : text