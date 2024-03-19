import { ThemeSelector } from '~/components/ThemeSelect'
import Home from '~/routes'
import { render } from 'solid-js/web'

const root = document.getElementById('root')

render(
  () => <Router root={App}>{/*<Route path='/' component={Home} />*/}</Router>,
  root!,
)

import { onMount } from 'solid-js'
import { themeChange } from 'theme-change'
import { Route, Router } from '@solidjs/router'

onMount(async () => {
  themeChange(false)
})

export default function App() {
  return (
    <>
      <div class='navbar bg-base-100'>
        <div class='navbar-start'>
          <a class='btn btn-ghost text-xl'>工单导出查看器</a>
        </div>
        <div class='navbar-center hidden lg:flex'>
          <ul class='menu menu-horizontal px-1'>
            <li>
              <a href='https://github.com/Kokoro-js/ticket-bot-viewer'>
                GitHUB
              </a>
            </li>
            <li>
              <a href='https://kook.top/lZcnhU'>Kook</a>
            </li>
          </ul>
        </div>
        <div class='navbar-end'>
          <ThemeSelector />
        </div>
      </div>
      <div id='sidebar' class='sidebar bg-base-100'>
        <ul class='menu p-4 pl-0.5 overflow-y-auto w-80 bg-base-100 text-base-content'>
          <li class='pl-0.5'>
            <a href='#app'>页首</a>
          </li>
          <li class='pl-0.5'>
            <a href='#info'>工单信息</a>
          </li>
          <li class='pl-0.5'>
            <a href='#content'>聊天记录</a>
          </li>
        </ul>
      </div>
      <Home />
    </>
  )
}
