import React from 'react';
import { makeAutoObservable, runInAction } from 'mobx';

import championsService, { AllChampionsTypes } from './championsStore.service';

class ChampionsStore {
  champions!: ChampionsTypes;

  championNames: string[] = [];

  isLoading = true;

  isError = false;

  constructor() {
    makeAutoObservable(this);

    championsService()
      .then((champions) => {
        runInAction(() => {
          this.champions = champions.data;
          this.championNames = this.getChampNames(champions.data);
          this.isLoading = false;
        });
      })
      .catch(() => {
        this.isError = true;
      });
  }

  getChampNames = (champions: ChampionsTypes): string[] => {
    const champNames = [...Object.keys({ ...champions })];
    return champNames;
  };
}

type ChampionsTypes = {
  [key: string]: AllChampionsTypes;
};

export default new ChampionsStore();
