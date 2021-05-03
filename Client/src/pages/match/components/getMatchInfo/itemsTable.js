const itemsTable = (player, version) => {
	let items = [];
	
	for(let key in player) {
		if (key.match(/item[\d]/)) {
			items.push(player[key]);
		}
	}
	
	return(
		<div className="items_block">
			{items.map((item, i) => {
				if (item === 0) return <div className="item" key={`${item}_${i}`}/>;

				return(
					<div className="item" key={`${item}_${i}`}>
						<img src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`} alt={`${item}_icon`}/>
					</div>
				);
			})}
		</div>
	)
}

export default itemsTable;