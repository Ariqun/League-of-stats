import { makeAutoObservable, runInAction } from 'mobx';

import itemsService, { AllItemsTypes } from './itemsStore.service';

class ItemsStore {
  items!: AllItemsTypes;

  isLoading = true;

  isError = false;

  constructor() {
    makeAutoObservable(this);

    itemsService()
      .then((items) => {
        runInAction(() => {
          this.items = items.data;
          this.isLoading = false;
        });
      })
      .catch(() => {
        this.isError = true;
      });
  }
}

export default new ItemsStore();
