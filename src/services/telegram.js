// src/services/telegram.js

const BOT_TOKEN = "8807636347:AAFDoCYE1ZcF8nkB9Xo3MS-gPpbFQy2aEv0"; 
const CHAT_ID = "5828223008";         

export const sendOrderToTelegram = async (orderData) => {
  const { name, phone, address, items, totalAmount, comment } = orderData;

  let message = `🚨 **Yangi buyurtma - SMAKebabs!** 🍔\n\n`;
  message += `👤 **Mijoz:** ${name || 'Nomaʼlum'}\n`;
  message += `📞 **Tel:** ${phone || 'Kiritilmagan'}\n`;
  message += `📍 **Manzil:** ${address || 'Koʻrsatilmagan'}\n`;
  if (comment) message += `💬 **Izoh:** ${comment}\n\n`;
  
  message += `🛒 **Buyurtmalar:**\n`;
  
  let calculatedTotal = 0;

  if (items && Array.isArray(items)) {
    items.forEach((item, index) => {
      const qty = Number(item.quantity || item.qty || item.count || item.soni || 1);
      const price = Number(item.price || item.narx || item.cost || 0);
      const itemTotal = price * qty;
      
      calculatedTotal += itemTotal;
      
      const itemName = item.name || item.title || item.nomi || 'Mahsulot';
      message += `${index + 1}. ${itemName} (${qty} dona) - ${itemTotal.toLocaleString()} so'm\n`;
    });
  }

  const finalTotal = Number(totalAmount || calculatedTotal || 0);
  message += `\n💰 **Umumiy summa:** ${finalTotal.toLocaleString()} so'm`;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });
    
    return await response.json();
  } catch (error) {
    console.error("Telegramga yuborishda xatolik:", error);
  }
};