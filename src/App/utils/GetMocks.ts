import { IMessage } from '../Notification/Message/Message'

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
    const randomMessagesCount: number = Math.floor(Math.random() * 5) + 1

    const mockMessages: IMessage[] = Array(randomMessagesCount).fill('memes').map((str, idx) => ({
        text: str.repeat(idx) + Math.random() * 10000,
        timestamp: Date.now()
    }))

    // Sort by most recent
    mockMessages.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0))

    return mockMessages;
}

