import axios from "axios"
import fetch from "node-fetch"
import cheerio from "cheerio"
async function wikipedia(querry) {
try {
const link = await axios.get(`https://pt.wikipedia.org/wiki/${querry}`)
const $ = cheerio.load(link.data)
let judul = $('#firstHeading').text().trim()
let thumb = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src') || `//i.ibb.co/nzqPBpC/http-error-404-not-found.png`
let isi = []
$('#mw-content-text > div.mw-parser-output').each(function (rayy, Ra) {
let penjelasan = $(Ra).find('p').text().trim() 
isi.push(penjelasan)})
for (let i of isi) {
const data = {
status: link.status,
result: {
judul: judul,
thumb: 'https:' + thumb,
isi: i}}
return data}
} catch (err) {
var notFond = {
status: link.status,
Pesan: eror}
return notFond}}
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `${mg}ESCREVA PALAVRA-CHAVE PARA PESQUISAR\nEXEMPLO\n*${usedPrefix + command} Universo*\n\nTYPE THE KEYWORD TO SEARCH\nEXAMPLE\n*${usedPrefix + command} Universe*`
wikipedia(`${text}`).then(res => {
let info = `ENCONTREI ISSO | / FOUND THIS:\n\n` + res.result.isi
conn.sendHydrated(m.chat, info, wm, null, ig, 'XD', null, null, [
['MENU PESQUISAS | SEARCHES 🔎', '#buscarmenu'],
['MENU COMPLETO | FULL MENU ✨', '.allmenu'],
['VOLTAR AO MENU| BACK TO MENU ☘️', '/menu']
], m,)   
  
}).catch(() => { m.reply(`${fg}NÃO ENCONTREI OQUE BUSCA. TENTE USAR OUTRA PALAVRA-CHAVE\n\nNOT FOUND WHAT YOU ARE LOOKING FOR. TRY TO USE A KEYWORD`) })}
handler.help = ['wikipedia'].map(v => v + ' <apa>')
handler.tags = [ 'internet']
handler.command = /^(wiki|wikipedia)$/i 
handler.exp = 40
handler.level = 2
export default handler
