export const getCountDisplay = (count: number): string => count < 1000 ? `${count}` : `${Math.floor(count / 1000)}K`