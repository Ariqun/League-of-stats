import React from 'react';
import { useTranslation } from 'react-i18next';

const Tabs = ({ changeTab, currentTab }) => {
  const tabs = ['total', 'solo', 'flex', 'normal', 'clash'];
  const [t] = useTranslation();

  const result = tabs.map((tab) => {
    const className = currentTab === tab ? 'tab active' : 'tab';

    return (
      <div onClick={() => changeTab(`${tab}`)} className={className} key={tab}>
        {t(tab)}
      </div>
    );
  });

  return (
    <div className="tabs">
      {result}
    </div>
  );
};

export default Tabs;
