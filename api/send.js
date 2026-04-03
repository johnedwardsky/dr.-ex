export default async function handler(req, res) {
  // Только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const TOKEN = process.env.TELEGRAM_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TOKEN || !CHAT_ID) {
    return res.status(500).json({ error: 'Bot not configured' });
  }

  try {
    const { name, contact, topic, message, type } = req.body;

    let text = '';
    if (type === 'review') {
      text = `📝 *Новый отзыв*\n\n👤 *Имя:* ${name}\n⭐ *Оценка:* ${contact}\n📋 *Направление:* ${topic}\n\n💬 ${message}`;
    } else {
      text = `📩 *Новая заявка с сайта*\n\n👤 *Имя:* ${name}\n📱 *Контакт:* ${contact}\n📋 *Тема:* ${topic}\n\n💬 *Сообщение:*\n${message}`;
    }

    const response = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: 'Markdown'
        })
      }
    );

    if (response.ok) {
      return res.status(200).json({ ok: true });
    } else {
      const err = await response.json();
      return res.status(500).json({ error: err });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
