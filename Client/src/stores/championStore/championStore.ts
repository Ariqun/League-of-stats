import { makeAutoObservable, runInAction } from 'mobx';

import championService from './championStore.service';
import { ChampionStatsTypes, ChampionInfoTypes } from '.';

class ChampionStore {
  championInfo!: ChampionInfoTypes;

  championStats!: ChampionStatsTypes;

  isLoading = true;

  isError = false;

  constructor() {
    makeAutoObservable(this);
  }

  getChampionInfo = (name: string | undefined) => {
    if (!name) return this.isError = true;

    championService(name)
      .then((array) => {
        runInAction(() => {
          const [info, stats] = array;

          this.championInfo = info.data[name];
          this.championStats = stats;
          this.isLoading = false;
        });
      })
      .catch(() => {
        this.isError = true;
      });
  };

  clearStore = () => {
    this.isLoading = true;
    this.isError = false;
  };
}

export default new ChampionStore();
