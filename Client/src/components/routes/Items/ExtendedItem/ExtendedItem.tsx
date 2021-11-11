import React from 'react';
import { useTranslation } from 'react-i18next';

import { modifyItemTags } from '../../../../utils/actionsWithStr/modifyTags';
import itemsStore from '../../../../stores/itemsStore';
import cl from './ExtendedItem.module.sass';

const ExtendedItem: React.FC<ExtendedItemProps> = ({
  activeItem,
}) => {
  const [t] = useTranslation();
  const { allItems } = itemsStore;
  const itemID = Object.keys(allItems).filter((id) => allItems[id].name === activeItem)[0];
  const {
    name, description, image, gold,
  } = allItems[itemID];
  const modifiedDescr = modifyItemTags(description);

  return (
    <div className={`${cl.extended} col-5 col-md-4`}>
      <div className={cl.wrapper}>
        <div className={cl.title}>
          <div className={cl.icon}>
            <img src={`http://ddragon.leagueoflegends.com/cdn/11.21.1/img/item/${image.full}`} alt={name} />
          </div>

          <div className={cl.name_and_cost}>
            <span className={cl.name}>
              {name}
            </span>

            <span className={cl.cost}>
              {t('cost')}:

              <span className={cl.value}>
                {gold.total}
              </span>
            </span>
          </div>
        </div>

        <div className={cl.descr} dangerouslySetInnerHTML={{ __html: modifiedDescr }} />
      </div>
    </div>
  );
};

type ExtendedItemProps = {
  activeItem: string;
};

export default ExtendedItem;
