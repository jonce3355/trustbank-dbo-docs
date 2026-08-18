var SEARCH_DATA = [
  { title: "Авторизация", desc: "Вход в систему по логину и паролю", url: "pages/login.html", cat: "Начало работы" },
  { title: "Главная страница (Дашборд)", desc: "Счета, статистика, последние платежи, курс валют", url: "pages/dashboard.html", cat: "Главная" },
  { title: "Меню и навигация", desc: "Обзор боковой панели и всех разделов системы", url: "pages/menu.html", cat: "Начало работы" },
  { title: "Профиль пользователя", desc: "Личные данные, безопасность, смена пароля, уведомления", url: "pages/profile.html", cat: "Профиль" },
  { title: "Настройки компании", desc: "Реквизиты, привязанные номера, PIN-код", url: "pages/settings.html", cat: "Настройки" },
  { title: "Пользователи и роли", desc: "Список сотрудников, роли и права доступа", url: "pages/users.html", cat: "Настройки" },
  { title: "Центр уведомлений", desc: "Уведомления компании и пользователя", url: "pages/notifications.html", cat: "Настройки" },
  { title: "Платежи", desc: "Список входящих и исходящих платежей, новый платеж", url: "pages/payments.html", cat: "Банк" },
  { title: "Новый платеж", desc: "Платежное поручение и другие виды платежей", url: "pages/new-payment.html", cat: "Банк" },
  { title: "Черновики и Шаблоны", desc: "Сохраненные незавершенные платежи и шаблоны", url: "pages/drafts-templates.html", cat: "Банк" },
  { title: "Картотека 1 и 2", desc: "Очередь неисполненных платежных документов", url: "pages/kartoteka.html", cat: "Банк" },
  { title: "Платежные требования", desc: "Электронные платежные требования (ЭПТ)", url: "pages/ept.html", cat: "Банк" },
  { title: "Все счета", desc: "Список всех счетов компании и их остатков", url: "pages/accounts.html", cat: "Банк" },
  { title: "Кредиты", desc: "Информация об активных кредитах компании", url: "pages/credits.html", cat: "Продукты" },
  { title: "Депозиты", desc: "Депозиты и заявки на депозиты", url: "pages/deposits.html", cat: "Продукты" },
  { title: "Зарплата (Ведомости)", desc: "Ведомости и сотрудники для зарплатного проекта", url: "pages/salary.html", cat: "Продукты" },
  { title: "Корпоративные карты", desc: "Управление корпоративными картами", url: "pages/cards.html", cat: "Продукты" },
  { title: "ВЭД", desc: "SWIFT, конверсия, обмен валюты, ЕЭИСВО", url: "pages/ved.html", cat: "Продукты" },
  { title: "Контрагенты", desc: "Список контрагентов компании", url: "pages/counterparties.html", cat: "Контрагенты" },
  { title: "Заявки", desc: "Список заявок и их статусы", url: "pages/petitions.html", cat: "Заявки" },
  { title: "Возможные проблемы и их решение", desc: "Ошибки системы, их причины и порядок устранения, troubleshooting, не работает, ошибка", url: "pages/troubleshooting.html", cat: "Справка" },
  { title: "FAQ", desc: "Часто задаваемые вопросы по системе", url: "pages/faq.html", cat: "Справка" }
  ];
function initSearch() {
  var inputs = document.querySelectorAll(".site-search-input");
  inputs.forEach(function (input) {
    var box = input.closest(".search-box");
    var results = box.parentElement.querySelector(".search-results-panel");
    if (!results) return;
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      if (!q) { results.style.display = "none"; results.innerHTML = ""; return; }
      var matches = SEARCH_DATA.filter(function (item) {
        return (item.title + " " + item.desc + " " + item.cat).toLowerCase().indexOf(q) !== -1;
      });
      if (matches.length === 0) {
        results.innerHTML = "<div style=\"padding:14px 16px;color:#667085;font-size:14px\">Ничего не найдено</div>";
      } else {
        results.innerHTML = matches.map(function (m) {
          return "<a href=\"" + rel(m.url) + "\"><div class=\"res-cat\">" + m.cat + "</div>" + m.title + "<div style=\"color:#667085;font-size:12px\">" + m.desc + "</div></a>";
        }).join("");
      }
      results.style.display = "block";
    });
    document.addEventListener("click", function (e) {
      if (!box.contains(e.target) && !results.contains(e.target)) results.style.display = "none";
    });
  });
}
function rel(url) {
  var depth = document.body.getAttribute("data-depth") || "0";
  if (depth === "1") return "../" + url;
  return url;
}
function initLightbox() {
  var lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = "<img src=\"\">";
  document.body.appendChild(lb);
  var lbImg = lb.querySelector("img");
  document.addEventListener("click", function (e) {
    var wrap = e.target.closest(".shot-wrap");
    if (wrap) {
      var img = wrap.querySelector("img");
      lbImg.src = img.src;
      lb.classList.add("open");
    }
  });
  lb.addEventListener("click", function () {
    lb.classList.remove("open");
  });
}
function markActiveNav() {
  var links = document.querySelectorAll(".sidebar a");
  var here = location.pathname.split("/").pop();
  links.forEach(function (a) {
    var href = a.getAttribute("href").split("/").pop();
    if (href === here) a.classList.add("active");
  });
}
document.addEventListener("DOMContentLoaded", function () {
  initSearch();
  initLightbox();
  markActiveNav();
});
