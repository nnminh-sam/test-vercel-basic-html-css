const letters = document.querySelectorAll(".letter");
const lettersContainer = document.querySelector(".letters");
let zIndexCounter = 10;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const shuffledThings = Array.from(letters);
shuffleArray(shuffledThings);

shuffledThings.forEach((letter) => {
  lettersContainer.appendChild(letter);
  const center =
    document.querySelector(".cssletter").offsetWidth / 2 -
    letter.offsetWidth / 2;
  letter.style.left = `${center}px`;

  function isOverflown(element) {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }

  if (!isOverflown(letter)) {
    letter.classList.add("center");
  }
  let offsetX, offsetY;
  letter.addEventListener("mousedown", (e) => {
    if (e.target.tagName !== "BUTTON") {
      const rect = e.target.getBoundingClientRect();

      letter.style.position = "fixed";
      letter.style.left = `${rect.left}px`;
      letter.style.top = `${rect.top}px`;

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      letter.style.zIndex = zIndexCounter++;
      const moveAt = (posX, posY) => {
        letter.style.left = `${posX - offsetX}px`;
        letter.style.top = `${posY - offsetY}px`;
      };
      const onMouseMove = (moveEvent) =>
        moveAt(moveEvent.clientX, moveEvent.clientY);
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  });
});
document.querySelector("#openEnvelope").addEventListener("click", () => {
  document.querySelector(".envelope").classList.add("active");
});
const closeButtons = document.querySelectorAll(".closeLetter");
closeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const letter = e.target.closest(".letter");
    if (letter) {
      letter.style.display = "none";
    }
  });
});
