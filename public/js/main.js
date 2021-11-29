//  Знаю что это костыль ,но придумал только такой способ при загрузке
// всей страницы делать клик на все кнопки рефреш для обновления данных

let allCard2 = document.querySelectorAll(".refresh_btn");
// записываем в переменную все кнопки с классом


if (allCard2) {
  // делаем проверку есть ли переменная с кнопками
  document.addEventListener("DOMContentLoaded", function () {
    //   перебираем все кнопки
    allCard2.forEach((item) => {
    // клик на каждой найденной кнопке
      item.click();
    //   console.log('click')
    });
  });
}
