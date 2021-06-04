import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import ItemBlock from './components/itemBlock';
import ShowItem from './components/showItem';
import Search from '../../components/app/inputs/search';

const Items = () => {
	const [t] = useTranslation();
	const [currentItem, setCurrentItem] = useState(t("Health Potion"));
	const [inputValue, setInputValue] = useState('');
	
	const showItem = (e) => {
		setInputValue(e.target.value);
	}

	return(
		<div className="items_page">
			<div className="container">

				<div className="choice_item col-12">
					<Search func={showItem} placeholder={t('startWriteItemName')} />
				</div>

				<div className="items">
					<div className="items_wrapper col-8">
						<ItemBlock setCurrentItem={setCurrentItem} inputValue={inputValue} type="consumable" />
						<ItemBlock setCurrentItem={setCurrentItem} inputValue={inputValue} type="boots" />
						<ItemBlock setCurrentItem={setCurrentItem} inputValue={inputValue} type="items" />
					</div>
					
					<ShowItem currentItem={currentItem}/>
				</div>
			</div>
		</div>
	)
}

export default Items;