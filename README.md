# :calendar: League of Stats #

![demo](https://raw.githubusercontent.com/Ariqun/Ariqun/main/assets/los_main.png)

## :pencil: Описание ##

Приложение для игроков League of Legends, которое отображает информацию о чемпионах, предметах, рунах и игроках. 

- Разработано на стеке MERN с помощью [RIOT API](https://developer.riotgames.com/).
- На русском и английском языках.
- Адаптивная верстка под мобильные устройства.
- Видео-демонстрация [Яндекс.Диск](https://disk.yandex.ru/i/A53pekNoFWUA_Q)

![demo](https://raw.githubusercontent.com/Ariqun/Ariqun/main/assets/los.png)
Главная страница профиля игрока.

## :no_entry: Известные проблемы ##

- Роли в компоненте liveMatch определяются исходя из информации о том, на какой роли данный чампион чаще всего играет. Поэтому, если информации мало или игрок выбрал чемпиона на нестандартную роль, определение роли будет, мягко говоря, неточным.
- Если открыть страницу Матча в отдельной вкладке и перезагрузить ее, то вылезет ошибка.
- В графиках урона\хила на странице матча столбцы урона\хила могут иногда уезжать за пределы канваса.
- Если зайти на страницу игрока, то запустится алгоритм сбора информации. Если перезагрузить страницу, параллельно запустится еще один и еще.
- При первом рендере страницы Матча, тултип скиллов не показывается (если выбрать другого игрока, то показывается).
- Работа с БД явно не оптимизирована.
- В проекте используется Riot Api Match.v5, который на 21.07.2021 находится на стадии тестирования, потому имеет множество багов.

## :warning: Алгоритм сбора информации ##

Для работы с Riot API нужно [зарегистрироваться](https://developer.riotgames.com/) и получить API Key.

Обычный api ключ разработки позволяет совершать около 50 запросов в минуту.
При регистрации продукта это значение можно увеличить до 15к в минуту и выше.

<br>
За сутки в мире проходит около 8кк игр, информация о 10кк игр весит ~20гб, поэтому для основных способов сбора информации, которые указаны ниже, нужны слишком большие объемы дискового пространства.

В [данной таблице](https://docs.google.com/spreadsheets/d/1IXmXN1yNWAO35k4I7sLrpdprK6Ionu-o2VFi_7cQlt0/edit#gid=0) (не моя) есть детальные расчеты.

<br>

Существует два основных способа сбора информации, они описаны [здесь](https://github.com/CommunityDragon/HexDocs/blob/master/lol/riotapi/Crawling%20matches%20using%20the%20Riot%20Games%20API.md).

Но в данном проекте, учитывая малое количество доступных запросов и скромные объемы пространства для данных, реализован следующий алгоритм сбора информации:
- При открытии профиля игрока от Riot Api приходит массив ids всех его матчей.
- Из коллекций БД checkedMatchIds и invalidcheckedMatchIds приходят списки id уже обработанных матчей.
- Сравниваются значения и оставляются только те id матчей, которые еще не были обработаны.
- С интервалом в 3.5сек перебирается каждый матч:
- - Обрабатываются только игровые режимы: ранговые матчи, обычные и clash-турниры. Матчи всех остальных режимов не учитываются в статистике, а их id попадают в коллекцию invalidcheckedMatchIds.
- - Происходит два запроса к api, один для общей информации по матчу, второй для полной timeline-информации всего матча.
- - Из всего этого великолепия отбирается только нужная информация и записывается в БД.
- Также из БД удаляются данные о матчах, которым больше месяца. Их id остаются в коллекциях checkedMatchIds и invalidcheckedMatchIds.

Отсюда возникает главная проблема: при первом визите на страницу профиля игрока нужно подождать определенное время, прежде чем появится полная статистика этого игрока (зависит от кол-ва сыгранных им матчей).

## :wrench: Установка ##

Требования к среде разработки:
- [Node.js](https://nodejs.org/en/download/) >= 16.1.0
- [MongoDB](https://www.mongodb.com/try/download/community) >= 4.4.5

Настройка среды разработки на локальном компьютере:
```
> git clone https://github.com/Ariqun/League-of-stats.git

> cd leagueofstats/client
> npm install

> cd leagueofstats/server
> npm install

> Стандартная установка и запуск MongoDB
```

## :arrow_forward: Запуск и сборка ##
Riot API key:
```
> server/libs/getData.js
```

Запуск:
```
> cd server
> npm run dev

> cd client
> npm start
```

Сборка:
```
> cd client
> npm run build

> cd server
> npm run build
```

## :page_with_curl: License ##

[NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

### You are free to: ###
Share — copy and redistribute the material in any medium or format.

Adapt — remix, transform, and build upon the material.

### Under the following terms: ###
NonCommercial — You may not use the material for commercial purposes.

ShareAlike — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.