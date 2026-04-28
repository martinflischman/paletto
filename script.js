const seedColor = document.getElementById("seed-color");
const colorStyle = document.getElementById("color-style");
const generateBtn = document.getElementById("generate-btn");
const swatchColors = document.getElementById("swatch-colors");
const hexCodes = document.getElementById("hex-codes");

generateBtn.addEventListener("click", () => {
  async function getColorInfo() {
    const response = await fetch(
      `https://www.thecolorapi.com/scheme?hex=${seedColor.value.slice(1, 7)}&mode=${colorStyle.value}`,
    );
    const data = await response.json();

    swatchColors.innerHTML = data.colors
      .map(
        (color) =>
          `<div class="flex-1" style="background-color: ${color.hex.value}; height: 30px"></div>`,
      )
      .join("");

    hexCodes.innerHTML = data.colors
      .map(
        (code) => `
            <div>
                <p>
                    ${code.hex.value}
                </p>
            </div>
        `,
      )
      .join("");
  }

  getColorInfo();
});
