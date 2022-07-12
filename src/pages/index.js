import "./index.css";
//скрол
const conteiner = document.querySelector(".order__slider"); //окно просмотра слайдов
const track = document.querySelector(".order__slider-track"); //линейка со слайдами
const items = document.querySelectorAll(".order__slider-item");

const prev = document.querySelector(".order__button-prev");
const next = document.querySelector(".order__button-next");

let itemId;
let clickScore = 0;
let position = 0; //это значение будем переопределять когда будем скролить
const slidesToShow = 2; //показываем желаемое кол-во элементов
const slidesToScroll = 1; //кол-во элементов которые будем скролить

const itemWidth = conteiner.offsetWidth / slidesToShow; //просчитываем размеры для каждого айтема в треке
const itemsCount = items.length; //получаем кол-во наших элементов

const movePosition = slidesToScroll * itemWidth; //переменная для скрола трека

//функция изменения позиции
function setPosition() {
  track.style.transform = `translateX(${position - 14 * clickScore}px)`;
}

//функция проверки кнопок
function checkBtn() {
  prev.disabled =
    position === 0
      ? prev.classList.add("order__button_inactive")
      : prev.classList.remove("order__button_inactive");
  next.disabled =
    position <= -(itemsCount - slidesToShow) * itemWidth
      ? next.classList.add("order__button_inactive")
      : next.classList.remove("order__button_inactive");
}

//задаем ширину для каждого айтема
items.forEach((item) => {
  item.style.minWidth = `${itemWidth}px`;
});

prev.addEventListener("click", () => {
  clickScore -= 1;
  const itemsLeft = Math.abs(position) / itemWidth;
  position +=
    itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  setPosition();
  checkBtn();
});

next.addEventListener("click", () => {
  clickScore += 1;
  const itemsLeft =
    itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
  position -=
    itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
  setPosition();
  checkBtn();
});

checkBtn();

//свайп
conteiner.addEventListener("touchstart", handleTouchStart);
conteiner.addEventListener("touchmove", handleTouchMove);

const result = document.getElementById("result");

// Здесь будем хранить координаты прикосновения
const touchCoords = {
  x: 0,
  y: 0,
};

function handleTouchStart(event) {
  const firstTouch = event.touches[0];
  // Сохраняем начальные координаты когда прикоснулись
  touchCoords.x = firstTouch.clientX;
  touchCoords.y = firstTouch.clientY;
}

const DETECT_TRESHHOLD = 100;

function handleTouchMove(event) {
  if (!touchCoords.x || !touchCoords.y) {
    return;
  }

  const { x, y } = touchCoords;

  // Сохраняем текущие координаты
  const xUp = event.touches[0].clientX;
  const yUp = event.touches[0].clientY;

  // Вычисляем разницу
  const xDiff = x - xUp;
  const yDiff = y - yUp;

  // Определяем в какую сторону было больше движения
  const isHorizontal = Math.abs(xDiff) > Math.abs(yDiff);

  if (isHorizontal) {
    // Реагируем только если движение было существенным
    if (Math.abs(xDiff) > DETECT_TRESHHOLD) {
      if (xDiff > 0) {
        const itemsLeft =
          itemsCount -
          (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
        position -=
          itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
        setPosition();
        checkBtn();
      } else {
        const itemsLeft = Math.abs(position) / itemWidth;
        position +=
          itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
        setPosition();
        checkBtn();
      }
    }
  }
}

//на каждый айтем вешаю клик для выбора данного спс доставки
items.forEach((item, i) => {
  item.addEventListener("click", () => {
    itemId = i;

    Array.from(items).find((item, i) => {
      itemId === i
        ? item.classList.add("order__slider-item_active")
        : item.classList.remove("order__slider-item_active");
    });
  });
});
