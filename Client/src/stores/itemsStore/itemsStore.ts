import { makeAutoObservable, runInAction } from 'mobx';

import itemsService, { AllItemsTypes } from './itemsStore.service';

class ItemsStore {
  allItems!: AllItemsTypes;

  isLoading = true;

  isError = false;

  constructor() {
    makeAutoObservable(this);

    itemsService()
      .then((items) => {
        runInAction(() => {
          this.allItems = items.data;
          this.isLoading = false;
        });
      })
      .catch(() => {
        this.isError = true;
      });
  }
}

export default new ItemsStore();
