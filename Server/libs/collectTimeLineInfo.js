module.exports = (obj) => {
	if (!obj) return null;

	try {
		const frames = obj.info.frames;
		let participant = {};

		for (let i = 1; i <= 10; i++) {
			const lvlUp = [], itemPurchase = [];

			for (let frame of frames) {
				for (let event of frame.events) {
					if (event.participantId === i && event.type === "SKILL_LEVEL_UP") {
						lvlUp.push({skill: event.skillSlot, time: event.timestamp});
					}

					if (event.participantId === i && event.type === "ITEM_PURCHASED") {
						itemPurchase.push({item: event.itemId, time: event.timestamp});
					}

					participant[i] = {lvlUp, itemPurchase};
				}
			}
		}

		return participant;
	} catch {}
}