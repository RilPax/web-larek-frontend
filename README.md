# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание
Этот проект представляет собой клиентскую часть интернет-магазина, реализованную с использованием TypeScript и принципов объектно-ориентированного программирования (ООП). В проекте предусмотрены классы для работы с корзиной, карточками товаров, модальными окнами, формами и отправкой данных на сервер.

## Используемые типы (types.ts)
Файл `types.ts` содержит интерфейсы и типы данных, используемые в проекте для обеспечения строгой типизации. Основные интерфейсы и их назначение:

### Интерфейсы
- `Icard` — Описывает структуру объекта товара:
  - `category: string` — Категория товара.
  - `description: string` — Описание товара.
  - `id: string` — Уникальный идентификатор товара.
  - `image: string` — Ссылка на изображение товара.
  - `price: number` — Цена товара.
  - `title: string` — Название товара.

- `IDataCard` — Описывает базовую структуру данных карточки товара:
  - `title: string` — Заголовок карточки товара.
  - `id: string` — Уникальный идентификатор.

- `Irequest<T>` — Обобщенный интерфейс для ответа с сервера, содержащего список элементов:
  - `total: number` — Общее количество элементов.
  - `items: T[]` — Массив элементов.

- `IpostData<T>` — Интерфейс для структуры данных заказа:
  - `payment: string` — Способ оплаты.
  - `email: string` — Email пользователя.
  - `phone: string` — Телефон пользователя.
  - `address: string` — Адрес доставки.
  - `total: number` — Итоговая сумма заказа.
  - `items: T[]` — Список товаров в заказе.

### Типы
- `CustomRequest` — Типизированный запрос с элементами типа `Icard` (`Irequest<Icard>`).
- `postData` — Тип для данных заказа, содержащий строки (`IpostData<string>`).

## Структура проекта
```
/src
├── components
│   ├── Basket.ts      # Класс для управления корзиной
│   ├── Cards.ts       # Класс для работы с карточками товаров
│   ├── Forms.ts       # Класс для работы с формами заказа и контактов
│   ├── Gallery.ts     # Класс для управления галереей изображений
│   ├── Modal.ts       # Класс для работы с модальными окнами
│   ├── PostData.ts    # Класс для отправки данных на сервер
│   ├── types.ts       # Интерфейсы и типы данных
│
├── styles
│   ├── styles.css     # Основные стили проекта
│
├── index.ts           # Главный файл проекта, инициализирует все компоненты
└── index.html         # Основная HTML-страница
```

## Класс Basket (Basket.ts)
Класс `Basket` отвечает за управление корзиной товаров, обработку взаимодействий с пользователем и передачу данных заказа.

### Свойства
- `basket: HTMLElement` — Корневой элемент корзины.
- `basketButton: HTMLButtonElement` — Кнопка открытия корзины.

### Методы
- `constructor(template: HTMLTemplateElement, button: HTMLButtonElement, modal: Modal, forms: Forms, postData: PostData, cards: Cards)` — Инициализирует корзину и настраивает обработчики событий.
- `renderBasket(modal: Modal)` — Открывает модальное окно корзины и проверяет её наполненность.
- `getIdList(cards: Cards): string[]` — Возвращает список идентификаторов товаров в корзине.
- `checkBasketFullness()` — Проверяет, пуста ли корзина, и отключает кнопку оформления заказа, если товаров нет.
- `addBasketButtonListener(modal: Modal)` — Добавляет обработчик события для кнопки открытия корзины.
- `addBasketContent(element: HTMLElement)` — Добавляет товар в корзину и обновляет её состояние.
- `removeBasketContent(element: HTMLElement)` — Удаляет товар из корзины и обновляет её состояние.
- `removeAllContent(cards: Cards)` — Полностью очищает корзину и возвращает состояние кнопок товаров.
- `changeBasketState()` — Обновляет индекс товаров, итоговую сумму и количество товаров в корзине.
- `setBasketElementIndex()` — Пронумеровывает элементы корзины.
- `get TotalPrice(): string` — Возвращает итоговую стоимость товаров в корзине.
- `get TotalItems(): string[]` — Возвращает список товаров в корзине.
- `setTotalPrice()` — Устанавливает итоговую стоимость в корзине.
- `setTotalElements()` — Обновляет счётчик товаров в корзине.

## Класс Cards (Cards.ts)
Класс `Cards` отвечает за создание и управление карточками товаров, а также за взаимодействие с корзиной и модальными окнами.

### Свойства
- `cards: Promise<Request[]>` — Промис с данными о товарах.
- `elements: HTMLElement[]` — Массив элементов карточек товаров.
- `galleryCardsElements: HTMLButtonElement[]` — Массив карточек, отображаемых в галерее.
- `modalCardsElements: HTMLElement[]` — Массив карточек, используемых в модальном окне.
- `softCardElements: HTMLElement[]` — Массив карточек, используемых в корзине.
- `cardsData: IDataCard[]` — Массив данных карточек товаров.

### Методы
- `constructor(cards: Promise<Request[]>)` — Инициализирует класс с данными о товарах.
- `setCardTitle(card: HTMLElement, title: string)` — Устанавливает заголовок карточки.
- `setCardText(card: HTMLElement, text: string)` — Устанавливает описание карточки.
- `setCardPrice(card: HTMLElement, price: number)` — Устанавливает цену товара.
- `setCategoryClass(category: HTMLElement, categoryClass: string, className: string)` — Добавляет CSS-класс категории товара.
- `setCardCategory(card: HTMLElement, category: string)` — Устанавливает категорию товара.
- `checkPrice(card: HTMLElement)` — Проверяет, есть ли у товара цена, и активирует или отключает кнопку.
- `setCardImage(card: HTMLElement, image: string)` — Устанавливает изображение карточки.
- `createGalleryCards(template: HTMLTemplateElement)` — Создаёт карточки товаров для галереи.
- `setModalCardListener(card: HTMLElement, basket: Basket, modal: Modal)` — Устанавливает обработчик добавления товара в корзину.
- `createModalCards(template: HTMLTemplateElement, basket: Basket, modal: Modal)` — Создаёт карточки для модального окна.
- `createSoftCards(template: HTMLTemplateElement, basket: Basket)` — Создаёт карточки для корзины.
- `createDataCards()` — Создаёт массив данных карточек.
- `createCards(basket: Basket, modal: Modal)` — Создаёт все типы карточек.
- `get cardsArray(): Promise<Request[]>` — Возвращает данные о товарах.
- `get GalleryCards(): HTMLButtonElement[]` — Возвращает массив карточек для галереи.

## Класс Forms (Forms.ts)
Класс `Forms` отвечает за создание, валидацию и обработку форм в интернет-магазине, а также за отправку данных на сервер.

### Свойства
- `forms: HTMLFormElement[]` — Массив форм, используемых в приложении.

### Методы
- `constructor(forms: HTMLTemplateElement[])` — Инициализирует формы на основе переданных шаблонов.
- `addErrorText(form: HTMLFormElement)` — Отображает сообщение об ошибке в форме.
- `hideErrorText(form: HTMLFormElement)` — Скрывает сообщение об ошибке.
- `enableFormButton(form: HTMLFormElement)` — Активирует кнопку отправки формы.
- `disableFormButton(form: HTMLFormElement)` — Деактивирует кнопку отправки формы.
- `validateForm(form: HTMLFormElement, isValid: boolean, buttonsArray?: HTMLButtonElement[])` — Проверяет валидность формы.
- `checkFormInputs(form: HTMLFormElement)` — Проверяет заполненность всех полей формы.
- `toggleFormButtonsState(form: HTMLFormElement)` — Переключает состояние кнопок выбора способа оплаты.
- `validateContacts()` — Запускает валидацию формы контактных данных.
- `validateOrder()` — Запускает валидацию формы оформления заказа.
- `initFormValidation()` — Инициализирует валидацию всех форм.
- `onForms(modal: Modal, postData: PostData, api: Api, uri: string, finishModal: HTMLElement, basket: Basket, cards: Cards)` — Запускает обработку всех форм.
- `setSubmitEvents(modal: Modal, postData: PostData, api: Api, uri: string, finishModal: HTMLElement, basket: Basket, cards: Cards)` — Устанавливает обработчики отправки форм.
- `get orderForm(): HTMLFormElement | null` — Возвращает форму заказа.
- `get concactsForm(): HTMLFormElement | null` — Возвращает форму контактных данных.

## Класс Gallery (Gallery.ts)
Класс `Gallery` отвечает за отображение каталога товаров и обработку кликов по карточкам товаров.

### Свойства
- `gallery: HTMLElement` — Основной контейнер галереи товаров.

### Методы
- `constructor(gallery: HTMLElement)` — Инициализирует галерею, принимая HTML-элемент.
- `pushCards(cards: Cards, modal: Modal)` — Добавляет карточки товаров в галерею и настраивает обработку кликов для открытия модального окна с подробной информацией о товаре.

## Класс Modal (Modal.ts)
Класс `Modal` отвечает за управление модальными окнами, их открытие, закрытие и очистку содержимого.

### Свойства
- `modal: HTMLElement` — Основной контейнер модального окна.

### Методы
- `constructor(modal: HTMLElement)` — Инициализирует модальное окно и устанавливает его стиль.
- `pushModalContent(element: HTMLElement)` — Добавляет содержимое в модальное окно.
- `clearModalContent()` — Очищает содержимое модального окна.
- `setCloseButtonListener()` — Устанавливает обработчик закрытия модального окна.
- `closeModal()` — Закрывает модальное окно и удаляет обработчик закрытия.
- `openModal(element: HTMLElement)` — Открывает модальное окно с переданным содержимым и добавляет обработчик закрытия.

## Класс PostData (PostData.ts)
Класс `PostData` управляет данными заказа, включая информацию о пользователе, способе оплаты и содержимом корзины.

### Свойства
- `postData: postData` — Объект, содержащий данные заказа.

### Методы
- `constructor()` — Инициализирует объект данных заказа с пустыми значениями.
- `setPayment(payment: string)` — Устанавливает способ оплаты.
- `setAdress(adress: string)` — Устанавливает адрес доставки.
- `setEmail(email: string)` — Устанавливает email пользователя.
- `setPhone(phone: string)` — Устанавливает номер телефона пользователя.
- `setItems(items: string[])` — Устанавливает массив товаров в заказе.
- `setTotal(total: string)` — Устанавливает итоговую сумму заказа.
- `clearData()` — Очищает данные заказа, сбрасывая их до значений по умолчанию.
- `get data(): postData` — Возвращает текущие данные заказа.

## Класс Api (api.ts)
Класс `Api` отвечает за взаимодействие с сервером, выполняя HTTP-запросы.

### Типы
- `ApiListResponse<Type>` — Описывает структуру ответа с массивом элементов и общим числом записей.
- `ApiPostMethods` — Перечисление методов `POST`, `PUT`, `DELETE`.

### Свойства
- `baseUrl: string` — Базовый URL API.
- `options: RequestInit` — Опции для fetch-запросов.

### Методы
- `constructor(baseUrl: string, options?: RequestInit)` — Инициализирует API-клиент.
- `handleResponse<T>(response: Response): Promise<T>` — Обрабатывает ответ сервера.
- `get<T>(uri: string): Promise<T>` — Выполняет GET-запрос.
- `post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>` — Выполняет POST, PUT или DELETE-запрос.

## Лицензия
Этот проект распространяется под MIT License.

