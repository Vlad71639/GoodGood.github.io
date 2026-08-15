(function () {
  "use strict";

  var PROMO_CODE = "DOG2026";

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var input = document.createElement("textarea");
      input.value = text;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();

      try {
        document.execCommand("copy") ? resolve() : reject();
      } catch (error) {
        reject(error);
      } finally {
        input.remove();
      }
    });
  }

  function initializeConversionBlock() {
    var aside = document.querySelector(".aside");
    if (!aside || aside.querySelector(".promo-box")) {
      return;
    }

    var logo = document.querySelector(".logo img");
    if (logo) {
      logo.src = "DOG3.png";
      logo.loading = "eager";
      logo.fetchPriority = "high";
    }

    var promo = document.createElement("div");
    promo.className = "promo-box";
    promo.innerHTML =
      '<span class="promo-eyebrow">Эксклюзивный промокод</span>' +
      '<p class="promo-offer">Бонусы до 2 000 $ и 425 фриспинов</p>' +
      '<button class="promo-copy" type="button" aria-label="Скопировать промокод ' + PROMO_CODE + '">' +
      '<span class="promo-code">' + PROMO_CODE + '</span>' +
      '<span class="promo-copy-label" aria-live="polite">Копировать</span>' +
      "</button>";

    var subtitle = aside.querySelector(".ctaSub");
    var firstButton = aside.querySelector(".btn");
    aside.insertBefore(promo, firstButton || (subtitle ? subtitle.nextSibling : aside.firstChild));

    var copyButton = promo.querySelector(".promo-copy");
    var copyLabel = promo.querySelector(".promo-copy-label");
    copyButton.addEventListener("click", function () {
      copyText(PROMO_CODE).then(function () {
        copyLabel.textContent = "Скопировано ✓";
        copyButton.setAttribute("aria-label", "Промокод " + PROMO_CODE + " скопирован");
        window.setTimeout(function () {
          copyLabel.textContent = "Копировать";
          copyButton.setAttribute("aria-label", "Скопировать промокод " + PROMO_CODE);
        }, 2200);
      }).catch(function () {
        copyLabel.textContent = "Код: " + PROMO_CODE;
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeConversionBlock);
  } else {
    initializeConversionBlock();
  }
})();
