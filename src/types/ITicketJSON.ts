type Ticket = {
    ticketId: string;
    asker: string;
    duration: number;
    parameters: { [label: string]: string };
    participants: { [userId: string]: Participant };
    timeline: TimelineEvent[];
    conversation: Message[];
};

type Participant = {
    name: string;
    avatarUrl: string;
};

type TimelineEvent = {
    label: string;
    timestamp: string;
    userId?: string;
};

type Message = {
    senderId: string;
    timestamp: string;
    content: TextContent | ImageContent | FileContent;
};

type TextContent = {
    type: 'text';
    text: string;
};

type ImageContent = {
    type: 'image';
    url: string;
};

type FileContent = {
    type: 'file';
    "url": string,
    "name": string,
    "file_type": string
    "size": number
};

export type {Ticket, Participant, TimelineEvent, Message, TextContent, ImageContent, FileContent}
