import React, {useState} from 'react';

import ItemBlock from './components/itemBlock';
import ShowItem from './components/showItem';
import Search from '../../components/app/inputs/search';

const Items = () => {
	const [currentItem, setCurrentItem] = useState('Зелье здоровья');
	const [inputValue, setInputValue] = useState('');

	const showItem = (e) => {
		setInputValue(e.target.value);
	}

	return(
		<div className="items_page">
			<div className="container">

				<div className="choice_item col-12">
					<Search func={showItem} placeholder="Начните вводить название предмета..." />
				</div>

				<div className="items">
					<div className="items_wrapper col-8">
						<ItemBlock setCurrentItem={setCurrentItem} inputValue={inputValue} type="Consumable" title={'Расходники'}/>
						<ItemBlock setCurrentItem={setCurrentItem} inputValue={inputValue} type="Boots" title={'Обувь'}/>
						<ItemBlock setCurrentItem={setCurrentItem} inputValue={inputValue} type="All" title={'Предметы'}/>
					</div>
					
					<ShowItem currentItem={currentItem}/>
				</div>
			</div>
		</div>
	)
}

export default Items;