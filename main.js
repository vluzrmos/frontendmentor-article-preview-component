const setupCardActions = (card) => {
  const authorShareIcon = card.querySelector(
    ".card__author__container .share_icon"
  );

  const cardShareIcon = card.querySelector(".card__share__actions .share_icon");

  const cardShareActions = card.querySelector(".card__share__actions");

  authorShareIcon.addEventListener("click", function (e) {
    e.preventDefault();

    card.classList.toggle("card--sharing");

    if (card.classList.contains("card--sharing")) {
      setAuthorShareIconPosition(card);
    }
  });

  cardShareIcon.addEventListener("click", function (e) {
    e.preventDefault();

    cardShareIcon.closest(".card").classList.remove("card--sharing");
  });

  const setAuthorShareIconPosition = () => {
    const top =
      authorShareIcon.getBoundingClientRect().top -
      cardShareActions.getBoundingClientRect().height -
      authorShareIcon.getBoundingClientRect().height;

    const left =
      authorShareIcon.getBoundingClientRect().left -
      0.5 * cardShareActions.getBoundingClientRect().width +
      0.5 * authorShareIcon.getBoundingClientRect().width;

    card.style.setProperty("--share_icon_top", `${top}px`);
    card.style.setProperty("--share_icon_left", `${left}px`);
  };

  window.addEventListener("resize", () => {
    setAuthorShareIconPosition();
  });

  //click outside of the share actions to close
  document.addEventListener("click", function (e) {
    if (!card.classList.contains("card--sharing")) {
      return;
    }

    if (
      !e.target.closest(".card__share__actions") && !e.target.closest(".share_icon__container")
    ) {
      card.classList.remove("card--sharing");
    }
  });
};

setupCardActions(document.querySelector(".card"));
