import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'
export function before(m, { conn }) {
//if (!db.data.chats[m.chat].autonivel && m.isGroup) throw 
	
let user = global.db.data.users[m.sender]
 if (!user.autolevelup) //throw `${ag}O ALTONIVEL ESTÁ DESATIVADO USE *#on autonivel* PARA DESATIVAR\n\nTHE AUTONIVEL THIS DISABLED USE *#on autonivel* TO ENABLE`
  return !0
	
let before = user.level * 1
while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
 if (before !== user.level) {
	  
m.reply(`
*╭━━━[ 𝙉𝙄𝙑𝙀𝙇 | 𝙇𝙀𝙑𝙀𝙇 ]━━━━⬣*
*┃ NIVEL ANTERIOR: ${before}*
*┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈*
*┃ NIVEL ATUAL: ${user.level}*
*┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈*
*┃ DATA: ${new Date().toLocaleString('id-ID')}*
*╰━━━〔 𓃠 ${vs} 〕━━━━━⬣*

*_Quanto mais interações com Bot, maior sera seu nivel!!_*
`.trim())
    }
}		
export const disabled = false
