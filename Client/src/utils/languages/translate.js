const translateInTooltips = (lang) => {
  const arr = [
    {
      price: 'Цена', pop: 'Популярность', cost: 'Стоимость', cooldown: 'Восстановление',
    },
    {
      price: 'Price', pop: 'Popularity', cost: 'Cost', cooldown: 'Cooldown',
    },
  ];

  if (lang === 'ru') return arr[0];
  if (lang === 'en') return arr[1];
};

export default translateInTooltips;
