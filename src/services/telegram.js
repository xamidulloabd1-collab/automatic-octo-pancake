// src/services/telegram.js

const BOT_TOKEN = "8807636347:AAFDoCYE1ZcF8nkB9Xo3MS-gPpbFQy2aEv0"; 
const CHAT_ID = "5828223008";         

export const sendOrderToTelegram = async (orderData) => {
  const { name, phone, address, items, totalAmount, comment } = orderData;

  let message = `🚨 **Yangi buyurtma - SMAKebabs!** 🍔\n\n`;
  message += `👤 **Mijoz:** ${name}\n`;
  message += `📞 **Tel:** ${phone}\n`;
  message += `📍 **Manzil:** ${address}\n`;
  if (comment) message += `💬 **Izoh:** ${comment}\n\n`;
  
  message += `🛒 **Buyurtmalar:**\n`;
  
  if (items && Array.isArray(items)) {
    items.forEach((item, index) => {
      // Mahsulot soni va narxini har xil nomlanishlardan qidirib topamiz (xatolik chiqmasligi uchun)
      const qty = item.quantity || item.qty || item.count || 1;
      const price = item.price || 0;
      const itemTotal = price * qty;
      
      message += `${index + 1}. ${item.name || 'Mahsulot'} (${qty} dona) - ${itemTotal.toLocaleString()} so'm\n`;
    });
  }

  const finalTotal = totalAmount || 0;
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