const {
	Telegraf
} = require('telegraf')

const token = 'your bot token';

const bot = new Telegraf(token);

const conv1 = 111 // convID;
const conv2 = 222 // convID;
const convResult = 333 // convID;

bot.on('text', ctx => {

	// Для настройки других бесед.
	// console.log(ctx.message);

	const {
		id
	} = ctx.message.chat;

	if (id === conv1 || id === conv2) {
		const {
			text
		} = ctx.message;

		if (checkExtraWords(text)) {
			bot.telegram.sendMessage(convResult, removeExtraWords(text)).catch(e => console.error(e));
		}
	}
});

bot.on('photo', ctx => {

	const {
		id
	} = ctx.message.chat

	if (id === conv1 || id === conv2) {

		const {
			caption
		} = ctx.message;

		if (checkExtraWords(caption)) {
			bot.telegram.sendPhoto(convResult, ctx.message.photo[0].file_id, {
				// caption: removeExtraWords(caption)
			}).catch(e => e => console.error(e));
		}
	}
});

bot.on('document', ctx => {

	const {
		id
	} = ctx.message.chat;

	if (id === conv1 || id === conv2) {
		const {
			caption
		} = ctx.message;

		if (checkExtraWords(caption)) {
			bot.telegram.sendDocument(convResult, ctx.message.document.file_id, {
				// caption: removeExtraWords(caption)
			}).catch(e => console.error(e));
		}
	}
});

bot.launch();

function checkExtraWords(text) {
	if (text) {
		let count = 0;
		let pos = text.indexOf(3);

		while (pos !== -1) {
			count++;
			pos = text.indexOf(3, pos + 1);
		}

		if (count >= 2) {
			return true;
		}
	}
}

function removeExtraWords(text) {
	if (text) {
		if (text.search(/3+[\s\/\|.,;-\|из]+3+/i) !== -1) {
			return text.replace(/3+[\s\/\|.,;-\|из]+3+/i, '');
		} else {
			let count = 0;
			let result = '';

			for (let i = 0; i < text.length; i++) {
				if (text[i] === '3' && count < 3) {
					count++;
				} else {
					result += text[i];
				}
			}

			return result;
		}
	}
}