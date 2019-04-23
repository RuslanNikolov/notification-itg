import { IMessage } from '../Notification/Message/Message'
// @ts-ignore
import { loremIpsum } from 'lorem-ipsum'

export const getSimpleMessages = () => {
    const date = Date.now();

    return [{
        text: 'test ' + date,
        timestamp: date
    },
    {
        text: 'test ' + date,
        timestamp: date
    },
    ]
}

export const getMockMessages = (): IMessage[] => {
    const randomMessagesCount: number = Math.floor(Math.random() * 10) + 1

    const mockMessages: IMessage[] = Array(randomMessagesCount).fill('memes').map((str, idx) => ({
        text:  loremIpsum({count: idx, units: 'words'}),
        timestamp: Date.now() + idx
    }))

    // Sort by most recent
    mockMessages.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0))

    return mockMessages;
}

