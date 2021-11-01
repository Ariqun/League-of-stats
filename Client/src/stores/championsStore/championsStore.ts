import React from "react";
import { makeAutoObservable, runInAction } from "mobx";

import championsService, { ChampionTypes } from "./championStore.service";

class ChampionsStore {
	champions: any;

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

	getChampNames = (champions: ChampionTypes): string[] => {
		const champNames = [...Object.keys({...champions})];
		return champNames;
	}
}

export default new ChampionsStore();