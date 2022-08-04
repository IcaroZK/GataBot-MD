import fetch from 'node-fetch'
import { lyrics, lyricsv2 } from '@bochilteam/scraper'
import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
if (!teks) throw `${mg}COLOQUE O NOME DE UMA MÚSICA\nEXEMPLO\n*${usedPrefix + command} Runaway*\n\nENTER THE NAME OF A SONG TO GET THE LYRICS\nEXAMPLE\n*${usedPrefix + command} Billie Eilish bored*`
const result = await lyricsv2(teks).catch(async _ => await lyrics(teks))
let res = await fetch(global.API('https://some-random-api.ml', '/lyrics', {
title: result.author + result.title}))
if (!res.ok) throw await res.text()
let json = await res.json()
if (!json.thumbnail.genius) throw json


let letratexto =`
TÍTULO | TITLE
💚 *${result.title}*

AUTOR(A) | AUTHOR
💜 *${result.author}*


${result.lyrics}


LINK | URL
🧡 *${result.link}*
`.trim()
conn.sendHydrated(m.chat, letratexto, wm, json.thumbnail.genius, null, null, null, null, [
['Baixar | Download 🚀', `/play ${text}`],
['Menu Pesquisas | Searches 🔎', '#buscarmenu'],
['Voltar ao Menu | Back to Menu ☘️', '/menu']
], m)
}
handler.help = ['lirik','letra'].map(v => v + ' <Apa>')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics|lyric|letra)$/i
handler.limit = 1
handler.level = 3
handler.exp = 55
export default handler 
