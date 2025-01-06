// Импортируем библиотеку Telegraf
const { Telegraf } = require('telegraf');

// Укажите ваш токен бота
const bot = new Telegraf('7736883201:AAGRReUAG-XmTqUBnMW445CP78agvsUj2lY');

// Хранение выбранного языка
const userLanguage = {};

// ID заблокированных пользователей
const blockedUsers = new Set();

// ID закэшированного видео
const cachedVideoFileId = 'BAACAgIAAxkDAAOdZ3tAj74IJpAL-AWjGSBatMDH0SMAAnZbAAKgQ-BLXCb6NEpxvAs2BA';

// Переводы для каждого языка
const translations = {
  en: {
    welcome: 'Welcome to ESTET Girls Private 💦',
    preview: 'Here is a sneak peek of what you’ll find in the private channel 🔞',
    choosePlan: 'Quickly select the desired subscription plan 🍌',
    tariffs: 'To view the subscription plan, press the corresponding button',
    payPrompt: '💁🏻‍♂️ Did you pay?\n\n👌🏻 Then send the payment receipt here as an image (not a document): screenshot or photo.\n\nThe receipt must clearly show: <b>date, time, and amount.</b>\n__________________________\n<i>You may be blocked for spamming!</i>',
    paymentConfirmed: 'Thank you! Your payment is being verified.',
    subscriptionChosen: 'You have chosen the subscription:',
    paymentDetails: 'Payment details:',
    cryptoPayment: 'Payment to cryptocurrency ❤️',
    disclaimer: 'You are paying to an individual. Funds will be transferred to the recipient\'s account.',
    plans: {
      '1_month': '1 month',
      '3_months': '3 months',
      '6_months': '6 months',
      '12_months': '12 months',
      lifetime: 'lifetime',
    },
    back: 'Back',
    paid: 'Paid 🎁',
  },
  ru: {
    welcome: 'Приветствуем в ESTET Girls Private 💦',
    preview: 'Твоему вниманию небольшое превью того, что найдется внутри приватного канала 🔞',
    choosePlan: 'Скорей выбирай нужный тариф 🍌',
    tariffs: 'Чтобы ознакомиться с тарифом, выберите необходимый, нажав на соответствующую кнопку',
    payPrompt: '💁🏻‍♂️ Оплатили?\n\n👌🏻 Тогда отправьте сюда картинкой (не документом!) квитанцию платежа: скриншот или фото.\n\nНа квитанции должны быть четко видны: <b>дата, время и сумма платежа.</b>\n__________________________\n<i>За спам вы можете быть заблокированы!</i>',
    paymentConfirmed: 'Спасибо! Ваш платеж проверяется.',
    subscriptionChosen: 'Вы выбрали подписку:',
    paymentDetails: 'Реквизиты:',
    cryptoPayment: 'Оплата на криптовалюту ❤️',
    disclaimer: 'Вы платите физическому лицу. деньги поступят на счёт получателя.',
    plans: {
      '1_month': '1 месяц',
      '3_months': '3 месяца',
      '6_months': '6 месяцев',
      '12_months': '12 месяцев',
      lifetime: 'навсегда',
    },
    back: 'Назад',
    paid: 'Оплатил 🎁',
  },
  es: {
    welcome: 'Bienvenido a ESTET Girls Private 💦',
    preview: 'Aquí tienes un adelanto de lo que encontrarás en el canal privado 🔞',
    choosePlan: '¡Elige rápidamente el plan de suscripción que deseas! 🍌',
    tariffs: 'Para consultar el plan de suscripción, presiona el botón correspondiente',
    payPrompt: '💁🏻‍♂️ ¿Has pagado?\n\n👌🏻 Entonces envía aquí la captura del recibo de pago como una imagen (no como un documento): captura de pantalla o foto.\n\nEl recibo debe mostrar claramente: <b>fecha, hora y monto.</b>\n__________________________\n<i>¡Podrías ser bloqueado por spam!</i>',
    paymentConfirmed: '¡Gracias! Su pago está siendo verificado.',
    subscriptionChosen: 'Has elegido la suscripción:',
    paymentDetails: 'Detalles de pago:',
    cryptoPayment: 'Pago a criptomoneda ❤️',
    disclaimer: 'Estás pagando a un individuo. Los fondos serán transferidos a la cuenta del destinatario.',
    plans: {
      '1_month': '1 mes',
      '3_months': '3 meses',
      '6_months': '6 meses',
      '12_months': '12 meses',
      lifetime: 'de por vida',
    },
    back: 'Atrás',
    paid: 'Pagado 🎁',
  },
  fr: {
    welcome: 'Bienvenue sur ESTET Girls Private 💦',
    preview: 'Voici un aperçu de ce que vous trouverez dans le canal privé 🔞',
    choosePlan: 'Choisissez rapidement l’abonnement souhaité 🍌',
    tariffs: 'Pour consulter le plan d’abonnement, appuyez sur le bouton correspondant',
    payPrompt: '💁🏻‍♂️ Avez-vous payé?\n\n👌🏻 Ensuite, envoyez ici une capture d’écran ou une photo du reçu de paiement.\n\nLe reçu doit montrer clairement : <b>date, heure et montant.</b>\n__________________________\n<i>Vous risquez d’être bloqué pour spam !</i>',
    paymentConfirmed: 'Merci! Votre paiement est en cours de vérification.',
    subscriptionChosen: 'Vous avez choisi l\'abonnement :',
    paymentDetails: 'Détails de paiement :',
    cryptoPayment: 'Paiement en cryptomonnaie ❤️',
    disclaimer: 'Vous payez à un particulier. Les fonds seront transférés sur le compte du destinataire.',
    plans: {
      '1_month': '1 mois',
      '3_months': '3 mois',
      '6_months': '6 mois',
      '12_months': '12 mois',
      lifetime: 'à vie',
    },
    back: 'Retour',
    paid: 'Payé 🎁',
  },
};

// Обработка команды /start
bot.start((ctx) => {
  ctx.reply('Выберите язык / Choose your language:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Русский 🇷🇺', callback_data: 'lang_ru' }],
        [{ text: 'English 🇺🇸', callback_data: 'lang_en' }],
        [{ text: 'Español 🇪🇸', callback_data: 'lang_es' }],
        [{ text: 'Français 🇫🇷', callback_data: 'lang_fr' }],
      ],
    },
  });
});

// Выбор языка
bot.on('callback_query', async (ctx) => {
  try {
    const data = ctx.callbackQuery.data;

    if (data.startsWith('lang_')) {
      const lang = data.split('_')[1];
      userLanguage[ctx.from.id] = lang;

      const t = translations[lang];
      await ctx.replyWithVideo(cachedVideoFileId);
      await ctx.reply(`${t.welcome}\n${t.preview}\n${t.choosePlan}`);

      await ctx.reply(t.tariffs, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: t.plans['1_month'], callback_data: '1_month' },
              { text: t.plans['3_months'], callback_data: '3_months' },
            ],
            [
              { text: t.plans['6_months'], callback_data: '6_months' },
              { text: t.plans['12_months'], callback_data: '12_months' },
            ],
            [{ text: t.plans['lifetime'], callback_data: 'lifetime' }],
          ],
        },
      });
    }

    const lang = userLanguage[ctx.from.id] || 'en';
    const t = translations[lang];

    if (['1_month', '3_months', '6_months', '12_months', 'lifetime'].includes(data)) {
      await ctx.editMessageText(
        `<b>${t.subscriptionChosen}</b> ${t.plans[data]}\n\n` +
          `<b>${t.paymentDetails}</b>\n\n<b>USDT TRC20:</b> <code>TGDWr5t78oChmoyTRk9PRNYzdGhVKNoHao</code>\n\n` +
          `<b>${t.cryptoPayment}</b>\n\n` +
          `__________________________\n` +
          `<i>${t.disclaimer}</i>`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                { text: t.paid, callback_data: 'paid' },
                { text: t.back, callback_data: `lang_${lang}` },
              ],
            ],
          },
        }
      );
    } else if (data === 'paid') {
      await ctx.reply(t.payPrompt, { parse_mode: 'HTML' });
    }
  } catch (err) {
    console.error('Error handling callback_query:', err);
    await ctx.reply('Произошла ошибка. Попробуйте ещё раз.');
  }
});

// Обработка фото
bot.on('photo', async (ctx) => {
  const userId = ctx.from.id.toString();
  const lang = userLanguage[ctx.from.id] || 'ru';
  const t = translations[lang];
  const adminId = '94694611';

  if (blockedUsers.has(userId)) {
    return ctx.reply('Вы не можете отправлять квитанции, так как были заблокированы.');
  }

  try {
    const username = ctx.from.username || 'Без имени';

    console.log(`User ID: ${userId}, Username: ${username}`);

    await ctx.telegram.sendMessage(
      adminId,
      `Пользователь ${username} (ID: ${userId}) отправил квитанцию.`
    );

    await ctx.telegram.forwardMessage(adminId, ctx.chat.id, ctx.message.message_id);

    await ctx.reply(t.paymentConfirmed);
  } catch (err) {
    console.error('Ошибка при обработке фото:', err);
    await ctx.reply('Не удалось отправить квитанцию. Попробуйте ещё раз.');
  }
});

// Команда для администратора для уведомления пользователя
bot.command('notify', async (ctx) => {
  const adminId = '94694611';
  if (ctx.from.id.toString() !== adminId) {
    return ctx.reply('Эта команда доступна только администратору.');
  }

  const args = ctx.message.text.split(' ').slice(1);
  if (args.length < 2) {
    return ctx.reply('Используйте команду в формате: /notify <user_id> <сообщение>');
  }

  const userId = args[0];
  const message = args.slice(1).join(' ');

  try {
    await bot.telegram.sendMessage(userId, `❗️ ${message}`);
    ctx.reply('Сообщение отправлено.');
  } catch (error) {
    console.error('Error sending message:', error);
    ctx.reply('Не удалось отправить сообщение. Проверьте правильность ID пользователя.');
  }
});

// Команда для блокировки пользователя
bot.command('block', async (ctx) => {
  const adminId = '94694611';
  if (ctx.from.id.toString() !== adminId) {
    return ctx.reply('Эта команда доступна только администратору.');
  }

  const args = ctx.message.text.split(' ').slice(1);
  if (args.length < 1) {
    return ctx.reply('Используйте команду в формате: /block <user_id>');
  }

  const userId = args[0];
  blockedUsers.add(userId);
  ctx.reply(`Пользователь с ID ${userId} был заблокирован.`);
});

// Команда для разблокировки пользователя
bot.command('unblock', async (ctx) => {
  const adminId = '94694611';
  if (ctx.from.id.toString() !== adminId) {
    return ctx.reply('Эта команда доступна только администратору.');
  }

  const args = ctx.message.text.split(' ').slice(1);
  if (args.length < 1) {
    return ctx.reply('Используйте команду в формате: /unblock <user_id>');
  }

  const userId = args[0];
  blockedUsers.delete(userId);
  ctx.reply(`Пользователь с ID ${userId} был разблокирован.`);
});

// Команда для проверки списка заблокированных пользователей (только для администратора)
bot.command('blocked', async (ctx) => {
    const adminId = '94694611'; // Замените на ваш Telegram ID
    if (ctx.from.id.toString() !== adminId) {
        return ctx.reply('Эта команда доступна только администратору.');
    }

    if (blockedUsers.size === 0) {
        return ctx.reply('Список заблокированных пользователей пуст.');
    }

    let blockedList = 'Заблокированные пользователи:\n';
    blockedUsers.forEach((userId) => {
        blockedList += `- ID: ${userId}\n`;
    });

    await ctx.reply(blockedList);
});

// Запуск бота
bot.launch();

console.log('Бот запущен...');

// Обработка завершения работы
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
