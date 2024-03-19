import {
  Ticket,
  Message,
  Participant,
  TextContent,
  ImageContent,
  FileContent,
} from '~/types/ITicketJSON'
import { createEffect, createSignal, For, Match, Switch } from 'solid-js'

function TextMessage({ content }: { content: TextContent }) {
  return <>{content.text}</>
}

function ImageMessage({ content }: { content: ImageContent }) {
  return <img width='256' alt='图片' src={content.url} />
}

function FileMessage({ content }: { content: FileContent }) {
  return (
    <a href={content.url} class='block'>
      <div class='cursor-pointer flex items-center justify-between p-4 rounded-box'>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
          >
            <path
              d='M30 25l-1.414-1.414L26 26.172V18h-2v8.172l-2.586-2.586L20 25l5 5l5-5z'
              fill='currentColor'
            ></path>
            <path
              d='M18 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6v3h2v-5a.91.91 0 0 0-.3-.7l-7-7A.909.909 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h10zm0-23.6l5.6 5.6H18z'
              fill='currentColor'
            ></path>
          </svg>
        </div>
        <div class='flex-grow'>
          <p class='text-sm font-bold'>{content.name}</p>
          <p class='text-xs opacity-50'>
            {content.file_type} - {content.size}
          </p>
        </div>
      </div>
    </a>
  )
}

export function MessageBubble({
  content,
  userInfo,
}: {
  content: Message
  userInfo: Participant
}) {
  // @ts-ignore
  return (
    <div class='chat chat-start'>
      <div class='chat-image avatar'>
        <div class='w-10 rounded-full'>
          <img alt='头像' src={userInfo.avatarUrl} />
        </div>
      </div>
      <div class='chat-header'>
        {userInfo.name}
        <time class='text-xs opacity-50'>
          {new Date(content.timestamp).toLocaleTimeString()}
        </time>
      </div>
      <div class='chat-bubble'>
        <Switch fallback={<p>{JSON.stringify(content)} 无法被正确渲染。</p>}>
          <Match when={content.content.type === 'text'}>
            {/*@ts-ignore */}
            <TextMessage content={content.content} />
          </Match>
          <Match when={content.content.type === 'image'}>
            {/*@ts-ignore */}
            <ImageMessage content={content.content} />
          </Match>
          <Match when={content.content.type === 'file'}>
            {/*@ts-ignore */}
            <FileMessage content={content.content} />
          </Match>
        </Switch>
      </div>
    </div>
  )
}

export function ChatComponent(
  props: Pick<Ticket, 'participants' | 'conversation'>,
) {
  const [conversation, participants] = [
    () => props.conversation,
    () => props.participants,
  ]

  return (
    <div class='flex flex-col gap-4 p-4'>
      <For each={conversation()}>
        {(item, index) => (
          <MessageBubble
            content={item}
            userInfo={participants()[item.senderId]}
          />
        )}
      </For>
    </div>
  )
}
