// Такая наркомания нужна для правильного формирования окончательной таблицы,
// Чтобы родственные статы отображались друг напротив друга в верстке (Здоровье - здоровье за уровень), т.к. изначально они приходят в хаотичном порядке.
// Чтобы лучше понять логику вещей, лучше посмотреть на отрисованный компонент в браузере.

import { StatTypes } from '../../stores/championsStore';

const sortStats = (stats: StatTypes): string[] => {
  const sortedStats: string[] = [];

  const sort = (arr: string[], bool: boolean) => {
    for (const key in stats) {
      if (arr.includes(key) === bool) {
        sortedStats.push(`${key}: ${stats[key]}`);
      }
    }
  };

  sort(['attackrange', 'movespeed', 'attackspeedperlevel'], false);
  sort(['attackspeedperlevel'], true);
  sort(['attackrange', 'movespeed'], true);

  return sortedStats;
};

export default sortStats;
