export function before(m) {
    let user = global.db.data.users[m.sender]
    if (user.afk > -1) {
        m.reply(`
  *[❗𝐈𝐍𝐅𝐎❗] VOCÊ PAROU DE FICAR INATIVO (AFK)${user.afkReason ? ' DEPOIS DE FICAR INATIVO (AFK) PELO MOTIVO: ' + user.afkReason : ''}*
  
  *—◉ TEMPO DE INATIVIDADE (AFK): ${(new Date - user.afk).toTimeString()}*
  `.trim())
        user.afk = -1
        user.afkReason = ''
    }
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
        let user = global.db.data.users[jid]
        if (!user)
            continue
        let afkTime = user.afk
        if (!afkTime || afkTime < 0)
            continue
        let reason = user.afkReason || ''
        m.reply(`*[❗] NÃO ROTULE [❗]*

*—◉ O USUÁRIO QUE VOCÊ MARCA ESTÁ INATIVO (AFK)*      
*—◉ ${reason ? 'MOTIVO DE INATIVIDADE (AFK): ' + reason : 'MOTIVO DE INATIVIDADE (AFK): _O USUÁRIO NÃO ESPECIFICOU O MOTIVO._'}*
*—◉ TEMPO DE INATIVIDADE DECORRIDO (AFK): ${(new Date - afkTime).toTimeString()}*
  `.trim())
    }
    return true
}
