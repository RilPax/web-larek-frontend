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
Это фронтенд-приложение интернет-магазина, построенное на архитектуре MVP (Model-View-Presenter). Приложение разделено на независимые модули, каждый из которых выполняет строго свою роль: отображение, хранение данных, обработка логики и событий.

---

## Архитектура (MVP)

- **Model** — `PostData.ts`, `BasketModel.ts`  
  Хранят и валидируют данные. Не зависят от UI.
- **View** — `Contacts.ts`, `Order.ts`, `Modal.ts`, `HeaderBasketButton.ts`, `Success.ts`, `Gallery.ts`, `CardView.ts`, `BasketView.ts`  
  Только отображают данные. Не слушают события и не хранят состояние.
- **Presenter** — `ContactsPresenter.ts`, `OrderPresenter.ts`, `BasketPresenter.ts`, `CardPresenter.ts`, `AppPresenter.ts`  
  Связывают модель и представление, обрабатывают бизнес-логику и события.

---

## Используемые типы (types.ts)
Файл `types.ts` содержит интерфейсы и типы данных, используемые в проекте для обеспечения строгой типизации. Основные интерфейсы и их назначение:

## Типы данных

```ts
// Интерфейс карточки товара
export default interface Icard {
  category: string;         // Категория товара
  description: string;      // Описание товара
  id: string;               // Уникальный идентификатор
  image: string;            // Ссылка на изображение
  price: number;            // Цена
  title: string;            // Название
}

// Общий интерфейс запроса (например, корзина или заказ)
interface Irequest<T> {
  total: number;            // Общая сумма
  items: T[];               // Список товаров или их ID
}

// Интерфейс для отправки данных на сервер с типизированным списком товаров
interface IpostData<T> {
  payment: string;          // Способ оплаты
  email: string;            // Email пользователя
  phone: string;            // Телефон
  address: string;          // Адрес доставки
  total: number;            // Общая сумма заказа
  items: T[];               // Список товаров или их ID
}

// Интерфейс данных, используемый внутри приложения
interface PostDataType {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];          // ID товаров
}

// Типы

// Запрос, содержащий список карточек
type CustomRequest = Irequest<Icard>;

// Данные заказа с ID товаров
type postData = IpostData<string>;
```

## Модели

Модели управляют данными приложения. Они не зависят от UI и не взаимодействуют напрямую с DOM. В рамках MVP, модели являются единственным источником истины для бизнес-логики.

### BasketModel

Модель для управления корзиной товаров.

**Свойства:**
- `basketList: Icard[]` — список добавленных карточек.
- `totalPrice: number` — сумма всех товаров (для совместимости, также используется `setTotal()`).
- `cardsId: string[]` — идентификаторы товаров.

**Методы:**
- `setElement(card: Icard)` — добавляет товар в корзину.
- `removeItem(card: Icard)` — удаляет товар из корзины.
- `productsCount` — возвращает количество товаров.
- `setTotal()` — рассчитывает общую стоимость.
- `clear()` — очищает корзину, сбрасывая все поля.

### PostData

Модель для хранения и подготовки данных заказа перед отправкой.

**Свойства:**
- `postData: postData` — объект с деталями заказа (оплата, адрес, email, товары).

**Методы:**
- `setPayment(payment: string)` — устанавливает способ оплаты.
- `setAddress(address: string)` — задаёт адрес доставки.
- `setEmail(email: string)` — сохраняет email.
- `setPhone(phone: string)` — сохраняет номер телефона.
- `setItems(cards: Icard[])` — сохраняет ID карточек в заказе.
- `setTotal(cards: Icard[])` — рассчитывает итоговую сумму заказа.
- `checkData(key: keyof PostDataType)` — проверяет заполненность определённого поля.
- `clearData()` — сбрасывает все поля заказа.
- `hideError(field: HTMLElement)` — удаляет сообщение об ошибке из поля.

---

## Представления (Views)

Отвечают исключительно за отображение интерфейса. Все изменения происходят только через публичные методы.

### BasketView
Отображает список товаров в корзине и кнопку оформления.
- `render(cards, createCard)` — обновляет DOM, перерисовывая карточки и пересчитывая итог.

### CardView
Создаёт карточки товара в разных форматах:
- `renderGalleryCard()` — карточка для галереи.
- `renderModalCard()` — карточка в модальном окне.
- `renderSoftCard()` — карточка в корзине.
- `renderGallery(cards)` — генерирует список карточек для галереи.

Дополнительные методы: `setCardTitle`, `setCardPrice`, `setCardCategory`, `setCardImage`, `setCardText` — заполняют данные карточки.

### Contacts
Форма с вводом email и телефона.
- `emailValue`, `PhoneValue` — получение данных из формы.
- `clearContacts()` — сбрасывает форму.
- `activeSbmtBtn()` — активирует кнопку отправки.

### Gallery
Работает с контейнером галереи товаров.
- `push(cards)` — добавляет карточки в DOM.

### HeaderBasketButton
Обновляет счётчик на кнопке корзины.
- `updateCounter(count)` — изменяет цифру на кнопке.

### Modal
Окно для отображения карточек и форм.
- `open(element)` — открывает модальное окно.
- `close(clearOrder, clearContacts)` — закрывает и сбрасывает.
- `clear()` — очищает содержимое.

### Order
Форма оформления заказа (адрес и способ оплаты).
- `clearOrder()` — сброс формы.
- `activeAltButton(name)` — активирует выбранный способ оплаты.
- `activeSbmtBtn()` — активирует кнопку отправки.

### Success
Экран успешного оформления заказа.
- Отображает финальную сумму и кнопку закрытия.

---

## Презентеры

Презентеры обрабатывают бизнес-логику, связывают модели с представлениями и управляют событиями. Они не изменяют DOM напрямую, а взаимодействуют с View-классами и моделями через события.

### AppPresenter

**Роль:**  
Центральный инициализатор приложения. Управляет закрытием модального окна и очисткой форм.

**Методы:**
- `appInit()` — инициализация слушателей.
- `setModalListeners()` — обработка нажатия кнопки закрытия модального окна.
- `setSuccessListeners()` — обработка нажатия кнопки "успешного" экрана.

### BasketPresenter

**Роль:**  
Отвечает за отображение корзины, обработку её открытия и оформления заказа.

**Методы:**
- `basketInit()` — инициализация слушателей.
- `setHeaderBsktBtnListener()` — слушатель кнопки в хедере.
- `setBasketListener()` — слушатель кнопки оформления в корзине.

### CardPresenter

**Роль:**  
Загружает карточки с сервера и настраивает взаимодействие с ними (добавление в корзину, удаление, просмотр).

**Методы:**
- `cardsInit()` — загрузка карточек, рендеринг, установка событий для каждой карточки:
  - Открытие модального окна.
  - Добавление/удаление из корзины.
  - Обновление счётчика корзины.

### ContactsPresenter

**Роль:**  
Обрабатывает форму контактов: валидация email и телефона, отправка данных заказа.

**Методы:**
- `formInit()` — инициализация формы.
- `setInputsListeners()` — слушатели для ввода email/телефона.
- `setFormListener()` — обработка сабмита формы.
- `post()` — отправка данных на сервер, отображение успешного экрана, сброс состояния.

### OrderPresenter

**Роль:**  
Работает с формой доставки и оплаты, проверяет валидность данных.

**Методы:**
- `formInit()` — инициализация формы.
- `setInputListener()` — слушатель для ввода адреса.
- `setButtonsListener()` — выбор способа оплаты.
- `setFormListener()` — отправка формы, с валидацией.
- `setError()` — отображение ошибки при незаполненной форме.

---

## Взаимодействие презентеров

- `AppPresenter` запускается первым и инициализирует глобальные события для закрытия модального окна и экрана успеха.
- `CardPresenter` загружает данные с сервера и инициализирует карточки. Он управляет добавлением в корзину и взаимодействием с модалкой.
- `BasketPresenter` реагирует на действия в хедере и отображает корзину. При сабмите вызывает открытие формы заказа.
- `OrderPresenter` управляет валидацией формы доставки и передаёт управление `ContactsPresenter`, если данные заполнены.
- `ContactsPresenter` отправляет данные заказа на сервер, управляет отображением успеха и очищает состояние.

Все презентеры связаны через единый `EventEmitter` и не вызывают методы друг друга напрямую — вместо этого они обмениваются событиями.

---


## Лицензия
Этот проект распространяется под MIT License.

