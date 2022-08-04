import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path'
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text }) => {
try {
let vn = './media/menu.mp3'
let pp = './media/menus/Menuvid1.mp4'
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
let { exp, limit, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let name = await conn.getName(m.sender)
let d = new Date(new Date + 3600000)
let locale = 'es'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
day: 'numeric',
month: 'long',
year: 'numeric'
}).format(d)
let time = d.toLocaleTimeString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let { money } = global.db.data.users[m.sender]
let user = global.db.data.users[m.sender]
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
//let user = global.db.data.users[m.sender]
//user.registered = false
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let username = conn.getName(who) 


let str = 
`*╭━━━〔 MENU COMPLETO 〕━━━⬣*
*┆⦒ VERSÃO » ${vs}*
*┆⦒ DATA » ${week}, ${date}*
*┆⦒ TEMPO ATIVO » ${uptime}*
*╰*┅┅┅┅┅┅┅┅┅┅┅┅┅ *✧* 

*╭━〔* ${username} *〕━━⬣*
*┆🧰 EXPERIÊNCIA ➟ ${exp}*
*┆🎖️ NIVEL ➟ ${level} || ${user.exp - min}/${xp}*
*┆⚓ LIGA ➟* ${role}
*┆💎 DIAMANTES ➟ ${limit}*
*┆💲 MOEDAS ➟ ${money}*
*┆🎟️ PREMIUM ➟* ${global.prem ? '✅' : '❌'}
*╰*┅┅┅┅┅┅┅┅┅┅┅┅┅ *✧*
${readMore}
*╭━〔 INFORMAÇÕES 〕━⬣*
┃💫➺ _${usedPrefix}cuentasgatabot | cuentasgb_
┃💫➺ _${usedPrefix}gruposgb | grupos | groupgb_
┃💫➺ _${usedPrefix}donar | donate_
┃💫➺ _${usedPrefix}listagrupos | grouplist_
┃💫➺ _${usedPrefix}estado | heygata | status_
┃💫➺ _${usedPrefix}infogata | infobot_
┃💫➺ _${usedPrefix}creadora | owner_
┃💫➺ _${usedPrefix}velocidad | ping_
*╰━━━━━━━━━━━━⬣*

*╭━〔 REPORTAR COMANDO 〕━⬣*
┃ *Reporta con este comando de haber*
┃ *Fallas para poder Solucionar!!*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ 💌 _${usedPrefix}reporte *texto*_
┃ 💌 _${usedPrefix}report *texto*_
*╰━━━━━━━━━━━━⬣*

*╭━〔 ENTRAR 〕━⬣*
┃ *me adicionar em seu grupo*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃🪅 _${usedPrefix}join *link*_
┃🪅 _${usedPrefix}unete *link*_
*╰━━━━━━━━━━━━⬣*

*╭━〔 JOGOS - MULTI JOGOS 〕━⬣*
┃🎡➺ _${usedPrefix}mates | matemáticas | math_
┃🎡➺ _${usedPrefix}ppt *piedra : papel : tijera*_
┃🎡➺ _${usedPrefix}topgays_
┃🎡➺ _${usedPrefix}topotakus_
┃🎡➺ _${usedPrefix}topintegrantes | topintegrante_
┃🎡➺ _${usedPrefix}toplagrasa | topgrasa_
┃🎡➺ _${usedPrefix}toppanafrescos | toppanafresco_
┃🎡➺ _${usedPrefix}topshiposters | topshipost_
┃🎡➺ _${usedPrefix}toppajeros | toppajer@s_
┃🎡➺ _${usedPrefix}toplindos | toplind@s_
┃🎡➺ _${usedPrefix}topputos | topput@s_
┃🎡➺ _${usedPrefix}topfamosos | topfamos@s_
┃🎡➺ _${usedPrefix}topparejas | top5parejas_
┃🎡➺ _${usedPrefix}gay | gay *@tag*_
┃🎡➺ _${usedPrefix}gay2 *nome : @tag*_
┃🎡➺ _${usedPrefix}lesbiana *nome : @tag*_
┃🎡➺ _${usedPrefix}manca *nome : @tag*_
┃🎡➺ _${usedPrefix}manco *nome : @tag*_
┃🎡➺ _${usedPrefix}pajero *nome : @tag*_
┃🎡➺ _${usedPrefix}pajera *nome : @tag*_
┃🎡➺ _${usedPrefix}puto *nome : @tag*_
┃🎡➺ _${usedPrefix}puta *nome : @tag*_
┃🎡➺ _${usedPrefix}rata *nome : @tag*_
┃🎡➺ _${usedPrefix}love *nome : @tag*_
┃🎡➺ _${usedPrefix}doxear *nome : @tag*_
┃🎡➺ _${usedPrefix}doxxeame_
┃🎡➺ _${usedPrefix}pregunta *texto*_
┃🎡➺ _${usedPrefix}apostar | slot *quantidade*_
┃🎡➺ _${usedPrefix}formarpareja_
┃🎡➺ _${usedPrefix}dado_
┃🎡➺ _${usedPrefix}verdad_
┃🎡➺ _${usedPrefix}reto_
┃🎡➺ _${usedPrefix}multijuegos_
┃🎡➺ _${usedPrefix}juegos_
*╰━━━━━━━━━━━━⬣*

*╭━〔 IA 〕━⬣*
┃ *converse com o bot*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃🪄➺ _${usedPrefix}simi | *texto*_
┃🪄➺ _${usedPrefix}alexa | *texto*_
*╰━━━━━━━━━━━━⬣*

*╭━━━[ AJUSTES - CHATS ]━━━⬣*
┃ *Admin!!*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃⚙️ _${usedPrefix}on *:* off *welcome*_
┃⚙️ _${usedPrefix}on *:* off *public*_
┃⚙️ _${usedPrefix}on *:* off *modohorny*_
┃⚙️ _${usedPrefix}on *:* off *antilink*_
┃⚙️ _${usedPrefix}on *:* off *antilink2*_
┃⚙️ _${usedPrefix}on *:* off *detect*_
┃⚙️ _${usedPrefix}on *:* off *restrict*_
┃⚙️ _${usedPrefix}on *:* off *pconly*_
┃⚙️ _${usedPrefix}on *:* off *gconly*_
┃⚙️ _${usedPrefix}on *:* off *autoread*_
┃⚙️ _${usedPrefix}on *:* off *audios*_
┃⚙️ _${usedPrefix}on *:* off *autosticker*_
*╰━━━━━━━━━━━━⬣*

*╭━[ BAIXAR | DOWNLOADS ]━⬣*
┃🚀➺ _${usedPrefix}imagen | *texto*_
┃🚀➺ _${usedPrefix}pinterest | *texto*_
┃🚀➺ _${usedPrefix}wallpaper| *texto*_
┃🚀➺ _${usedPrefix}play | *texto*_
┃🚀➺ _${usedPrefix}play.1 *texto*_
┃🚀➺ _${usedPrefix}play.2 *texto*_ 
┃🚀➺ _${usedPrefix}ytmp3 | *link*_
┃🚀➺ _${usedPrefix}ytmp4 | *link*_
┃🚀➺ _${usedPrefix}facebook | *link*_
┃🚀➺ _${usedPrefix}instagram *link video ou imagem*_
┃🚀➺ _${usedPrefix}verig | *usuario(a)*_
┃🚀➺ _${usedPrefix}ighistoria | *usuario(a)*_
┃🚀➺ _${usedPrefix}tiktok *link*_
┃🚀➺ _${usedPrefix}tiktokfoto | *usuario(a)*_
┃🚀➺ _${usedPrefix}vertiktok | *usuario(a)*_
┃🚀➺ _${usedPrefix}mediafire | *link*_
*╰━━━━━━━━━━━━⬣*

*╭━[ CONFIGURAÇÕES - GRUPOS ]━⬣*
┃ *o bot tem que ser admin!!*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃🌐➺ _${usedPrefix}add *numero*_
┃🌐➺ _${usedPrefix}ban | *@tag*_
┃🌐➺ _${usedPrefix}grupo *abrir : cerrar*_
┃🌐➺ _${usedPrefix}group *open : close*_
┃🌐➺ _${usedPrefix}daradmin | promote *@tag*_
┃🌐➺ _${usedPrefix}quitar | demote *@tag*_
┃🌐➺ _${usedPrefix}banchat_
┃🌐➺ _${usedPrefix}unbanchat_
┃🌐➺ _${usedPrefix}banuser *@tag*_
┃🌐➺ _${usedPrefix}unbanuser *@tag*_
┃🌐➺ _${usedPrefix}admins *texto*_
┃🌐➺ _${usedPrefix}invocar *texto*_
┃🌐➺ _${usedPrefix}tagall *texto*_
┃🌐➺ _${usedPrefix}hidetag *texto*_
┃🌐➺ _${usedPrefix}infogrupo_
┃🌐➺ _${usedPrefix}link_
┃🌐➺ _${usedPrefix}newnombre *texto*_
┃🌐➺ _${usedPrefix}newdesc *texto*_
┃🌐➺ _${usedPrefix}setwelcome *texto*_
┃🌐➺ _${usedPrefix}setbye *texto*_
┃🌐➺ _${usedPrefix}on_
┃🌐➺ _${usedPrefix}off_
*╰━━━━━━━━━━━━⬣*

*╭━━━[ CONTEÚDO 🔞 ]━━⬣*
┃ *Para Adultos!!*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃🔞➺ _${usedPrefix}hornymenu_
*╰━━━━━━━━━━━━⬣*

*╭━[ CONVERTIDORES 🛰️ ]━⬣*
┃ *Converte imagem em figurinha!!*
┃ *Cria link de arquivos!!*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃🛰️➺ _${usedPrefix}toimg | img | jpg *sticker*_
┃🛰️➺ _${usedPrefix}tomp3 | mp3 *video o nota de voz*_
┃🛰️➺ _${usedPrefix}tovn | vn *video o audio*_
┃🛰️➺ _${usedPrefix}tovideo *audio*_
┃🛰️➺ _${usedPrefix}tourl *video, imagen*_
┃🛰️➺ _${usedPrefix}toenlace  *video, imagen o audio*_
┃🛰️➺ _${usedPrefix}tts es *texto*_
*╰━━━━━━━━━━━━⬣*

*╭━━━[ LOGOS 🔆 ]━━⬣*
┃ *Cria logos personalizados*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃🔆 _${usedPrefix}logos *efeito texto*_
*╰━━━━━━━━━━━━⬣*

*╭━━━[ EFECTOS ⛺ ]━━⬣*
┃⛺ _${usedPrefix}simpcard *@tag*_
┃⛺ _${usedPrefix}hornycard *@tag*_
┃⛺ _${usedPrefix}lolice *@tag*_
┃⛺ _${usedPrefix}ytcomment *texto*_
┃⛺ _${usedPrefix}itssostupid_
┃⛺ _${usedPrefix}pixelar_
┃⛺ _${usedPrefix}blur_
*╰━━━━━━━━━━━━⬣*

*╭━[ RANDOM | ANIME 🧩 ]━⬣*
┃🧩 _${usedPrefix}cristianoronaldo_
┃🧩 _${usedPrefix}messi_
┃🧩 _${usedPrefix}meme_
┃🧩 _${usedPrefix}itzy_
┃🧩 _${usedPrefix}blackpink_
┃🧩 _${usedPrefix}kpop *blackpink : exo : bts*_
┃🧩 _${usedPrefix}lolivid_
┃🧩 _${usedPrefix}loli_
┃🧩 _${usedPrefix}navidad_
┃🧩 _${usedPrefix}ppcouple_
┃🧩 _${usedPrefix}neko_
┃🧩 _${usedPrefix}waifu_
┃🧩 _${usedPrefix}akira_
┃🧩 _${usedPrefix}akiyama_
┃🧩 _${usedPrefix}anna_
┃🧩 _${usedPrefix}asuna_
┃🧩 _${usedPrefix}ayuzawa_
┃🧩 _${usedPrefix}boruto_
┃🧩 _${usedPrefix}chiho_
┃🧩 _${usedPrefix}chitoge_
┃🧩 _${usedPrefix}deidara_
┃🧩 _${usedPrefix}erza_
┃🧩 _${usedPrefix}elaina_
┃🧩 _${usedPrefix}eba_
┃🧩 _${usedPrefix}emilia_
┃🧩 _${usedPrefix}hestia_
┃🧩 _${usedPrefix}hinata_
┃🧩 _${usedPrefix}inori_
┃🧩 _${usedPrefix}isuzu_
┃🧩 _${usedPrefix}itachi_
┃🧩 _${usedPrefix}itori_
┃🧩 _${usedPrefix}kaga_
┃🧩 _${usedPrefix}kagura_
┃🧩 _${usedPrefix}kaori_
┃🧩 _${usedPrefix}keneki_
┃🧩 _${usedPrefix}kotori_
┃🧩 _${usedPrefix}kurumi_
┃🧩 _${usedPrefix}madara_
┃🧩 _${usedPrefix}mikasa_
┃🧩 _${usedPrefix}miku_
┃🧩 _${usedPrefix}minato_
┃🧩 _${usedPrefix}naruto_
┃🧩 _${usedPrefix}nezuko_
┃🧩 _${usedPrefix}sagiri_
┃🧩 _${usedPrefix}sasuke_
┃🧩 _${usedPrefix}sakura_
┃🧩 _${usedPrefix}cosplay_
*╰━━━━━━━━━━━━⬣*

*╭━[ MODIFICAR ÁUDIO 🧰 ]━⬣*
┃🧰 _${usedPrefix}bass_
┃🧰 _${usedPrefix}blown_
┃🧰 _${usedPrefix}deep_
┃🧰 _${usedPrefix}earrape_
┃🧰 _${usedPrefix}fast_
┃🧰 _${usedPrefix}fat_
┃🧰 _${usedPrefix}nightcore_
┃🧰 _${usedPrefix}reverse_
┃🧰 _${usedPrefix}robot_
┃🧰 _${usedPrefix}slow_
┃🧰 _${usedPrefix}smooth_
┃🧰 _${usedPrefix}tupai_
*╰━━━━━━━━━━━━⬣*

*<ℂℍ𝔸𝕋 𝔸ℕ𝕆ℕ𝕀𝕄𝕆/>*

° ඬ⃟📳 _${usedPrefix}start_
° ඬ⃟📳 _${usedPrefix}next_
° ඬ⃟📳 _${usedPrefix}leave_

*╭━━[ PESQUISAS 🔍 ]━━⬣*
┃ *Pesquise com o Bot!!*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃🔍➺ _${usedPrefix}animeinfo *texto*_
┃🔍➺ _${usedPrefix}mangainfo *texto*_
┃🔍➺ _${usedPrefix}google *texto*_
┃🔍➺ _${usedPrefix}letra *texto*_
┃🔍➺ _${usedPrefix}ytsearch *texto*_
┃🔍➺ _${usedPrefix}wiki *texto*_
*╰━━━━━━━━━━━━⬣*

*╭━━━[ AUDIOS 🔊 ]━━⬣*
┃ *Visita o menu de áudios!!*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃➫🔊 _${usedPrefix}audios_
*╰━━━━━━━━━━━━⬣*

*╭━━[ FERRAMENTAS 🛠️ ]━━⬣*
┃🛠️ _${usedPrefix}afk *motivo*_
┃🛠️ _${usedPrefix}acortar *url*_
┃🛠️ _${usedPrefix}calc *calculadora*_
┃🛠️ _${usedPrefix}del *respondre a mensaje del Bot*_
┃🛠️ _${usedPrefix}qrcode *texto*_
┃🛠️ _${usedPrefix}readmore *texto1|texto2*_
┃🛠️ _${usedPrefix}spamwa *numero|texto|cantidad*_
┃🛠️ _${usedPrefix}styletext *texto*_
┃🛠️ _${usedPrefix}traducir *texto*_
*╰━━━━━━━━━━━━⬣*

*╭━━━[ FUNÇÕES RPG ]━━⬣*
┃ *Compra, Adquire Recursos*
┃ *Melhora seu Nível!!*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃⚗️➺ _${usedPrefix}transfer *quantidade @tag*_
┃⚗️➺ _${usedPrefix}dar *quantidade @tag*_
┃⚗️➺ _${usedPrefix}enviar *quantidade @tag*_
┃⚗️➺ _${usedPrefix}transfer *quantidade @user*_
┃⚗️➺ _${usedPrefix}balance_
┃⚗️➺ _${usedPrefix}experiencia_
┃⚗️➺ _${usedPrefix}nivel_
┃⚗️➺ _${usedPrefix}rol_
┃⚗️➺ _${usedPrefix}minardiamantes
┃⚗️➺ _${usedPrefix}minarcoins_
┃⚗️➺ _${usedPrefix}minarexp_
┃⚗️➺ _${usedPrefix}minar *:* minar2 *:* minar3_
┃⚗️➺ _${usedPrefix}buy *quantidade*_
┃⚗️➺ _${usedPrefix}buyall_
┃⚗️➺ _${usedPrefix}buy2 *quantidade*__
┃⚗️➺ _${usedPrefix}buyall2_
┃⚗️➺ _${usedPrefix}registrar_
┃⚗️➺ _${usedPrefix}perfil
┃⚗️➺ _${usedPrefix}myns_
┃⚗️➺ _${usedPrefix}unreg *número de serie*_
┃⚗️➺ _${usedPrefix}claim_
┃⚗️➺ _${usedPrefix}trabajar_
*╰━━━━━━━━━━━━⬣*

*╭━[ STICKERS Y FILTROS ]━⬣*
┃ *criar figurinha*
┃ *figurinhas com filtro!!*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃🎐 _${usedPrefix}sticker | s *imagem ou video*_
┃🎐 _${usedPrefix}sticker | s *url jpg*_
┃🎐 _${usedPrefix}emojimix *😺+😆*_
┃🎐 _${usedPrefix}scircle *imagem*_
┃🎐 _${usedPrefix}semoji *emoji*_
┃🎐 _${usedPrefix}attp *texto*_
┃🎐 _${usedPrefix}attp2 *texto*_
┃🎐 _${usedPrefix}ttp *texto*_
┃🎐 _${usedPrefix}ttp2 *texto*_
┃🎐 _${usedPrefix}ttp3 *texto*_
┃🎐 _${usedPrefix}ttp4 *texto*_
┃🎐 _${usedPrefix}ttp5 *texto*_
┃🎐 _${usedPrefix}ttp6 *texto*_
┃🎐 _${usedPrefix}dado_
┃🎐 _${usedPrefix}stickermarker *efeito : responder a imagem*_
┃🎐 _${usedPrefix}stickerfilter *efeito : responder a imagem*_
┃🎐 _${usedPrefix}cs *:* cs2
*╰━━━━━━━━━━━━⬣*

*╭━[ MODIFICAR STICKERS ]━⬣*
┃ *altera nome da figurinha!!*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃💡 _${usedPrefix}wm *pack|autor*_
┃💡 _${usedPrefix}wm *texto1|texto2*_
*╰━━━━━━━━━━━━⬣*

*╭━[ STICKERS DIVERTIDOS ]━⬣*
┃ *Realiza ações com figura*
┃ *Marcando alguém!!*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃⛱️ _${usedPrefix}palmaditas | *@tag*_
┃⛱️ _${usedPrefix}bofetada | *@tag*_
┃⛱️ _${usedPrefix}golpear *@tag*_
┃⛱️ _${usedPrefix}kiss | *@tag*_
┃⛱️ _${usedPrefix}alimentar | *@tag*_
*╰━━━━━━━━━━━━⬣*

*╭━[ MENU PARA PROPRIETÁRIO ]━⬣*
┃ *Comandos apenas para o dono!!*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃💎➺ _${usedPrefix}dardiamantes *quantidade*_
┃💎➺ _${usedPrefix}darxp *quantidade*_
┃💎➺ _${usedPrefix}dargatacoins *quantidade*_
┃💎➺ _${usedPrefix}cajafuerte_
┃💎➺ _${usedPrefix}comunicar | *texto*_
┃💎➺ _${usedPrefix}broadcastchats | bcc *texto*_
┃💎➺ _${usedPrefix}comunicarpv *texto*_
┃💎➺ _${usedPrefix}broadcastgc *texto*_
┃💎➺ _${usedPrefix}comunicargrupos *texto*_
┃💎➺ _${usedPrefix}borrartmp | cleartmp_
┃💎➺ _${usedPrefix}delexp *@tag*_
┃💎➺ _${usedPrefix}delgatacoins *@tag*_
┃💎➺ _${usedPrefix}deldiamantes *@tag*_
┃💎➺ _${usedPrefix}reiniciar | restart_
┃💎➺ _${usedPrefix}ctualizar | update_
┃💎➺ _${usedPrefix}addprem | +prem *@tag*_
┃💎➺ _${usedPrefix}delprem | -prem *@tag*_
┃💎➺ _${usedPrefix}listapremium | listprem_
┃💎➺ _${usedPrefix}añadirdiamantes *@tag quantidade*_
┃💎➺ _${usedPrefix}añadirxp *@tag quantidade*_
┃💎➺ _${usedPrefix}añadirgatacoins *@tag quantidade*_
*╰━━━━━━━━━━━━⬣*
`.trim()
await conn.sendHydrated2(m.chat, str, wm, pp, 'XD', 'XD', ig, '𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢', [
['💖 Menu Jogos | Games', '#juegos'],
['💗 Menu Aventura | RPG 💗', '.rpgmenu'],
['💝 Música | Play 💝', '#play']

], m,)
await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true})
} catch (e) {
conn.reply(m.chat, `${fg}ERRO NO MENU, REPORTE COM *#reporte*\n\nERROR IN THE MENU, REPORT THIS WITH THE COMMAND *#report*`, m)
throw e
}}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menucompleto|allmenu|allm\?)$/i
//handler.register = true
handler.exp = 50
handler.fail = null
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
