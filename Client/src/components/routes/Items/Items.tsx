import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Container from '../../layouts/Container';
import Main from '../../layouts/Main';
import Filter from '../../ui/Filter';
import ItemsBlock from './ItemsBlock';
import ExtendedItem from './ExtendedItem';
import useInput from '../../../hooks/useInput';
import cl from './Items.module.sass';

const Items: React.FC = () => {
  const [t] = useTranslation();
  const [activeItem, setActiveItem] = useState<string>(t('Health Potion'));
  const [inputValue, setInputValue] = useInput('');

  const blocks = ['consumable', 'boots', 'items'];

  return (
    <Main>
      <Container>
        <div className={`${cl.filter_items} col-12`}>
          <Filter
            value={inputValue}
            onChange={setInputValue}
            placeholder={t('startWriteItemName')}
          />
        </div>

        <div className={cl.items}>
          <div className="col-7 col-md-8">
            {blocks.map((type) => (
              <ItemsBlock
                type={type}
                inputValue={inputValue}
                setActiveItem={setActiveItem}
              />
            ))}
          </div>

          <ExtendedItem activeItem={activeItem} />
        </div>
      </Container>
    </Main>
  );
};

export default Items;
