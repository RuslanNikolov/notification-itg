import { IMessage} from './Notification/Message/Message'
//@ts-ignore
import { loremIpsum } from 'lorem-ipsum'

export const getMockMessages = (): IMessage[] => {
    const randomMessagesCount: number = Math.floor(Math.random() * 300) + 100

    const mockMessages: IMessage[] = Array(randomMessagesCount).fill('memes').map((str, idx) => ({
        text:  loremIpsum({count: idx, units: 'words'}),
        timestamp: Date.now() + idx
    }))

    // Sort by most recent
    mockMessages.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0))

    return mockMessages;
}

export const removeDuplicatesFromTwoArrays = (prevArray: any[], newArray: any[]): any[] => {
    const uniqueArray = []
    let isDuplicate = false;

    for (const newValue of newArray) {
        for (const prevValue of prevArray) {
            if (JSON.stringify(newValue) === JSON.stringify(prevValue)) {
                isDuplicate = true
                break;
            }
        }
        if (!isDuplicate) {
            uniqueArray.push(newValue)
        }
        isDuplicate = false
    }
    return uniqueArray;
}


