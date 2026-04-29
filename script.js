const seedColor = document.getElementById("seed-color");
const colorStyle = document.getElementById("color-style");
const generateBtn = document.getElementById("generate-btn");
const swatchColors = document.getElementById("swatch-colors");
const hexCodes = document.getElementById("hex-codes");
const copyMsg = document.getElementById("copy-msg");

const copyHexCode = (hex) => {
  navigator.clipboard.writeText(hex);
  copyMsg.classList.remove("hidden");
  setTimeout(() => {
    copyMsg.classList.add("hidden");
  }, 2000);
};

generateBtn.addEventListener("click", () => {
  async function getColorInfo() {
    const response = await fetch(
      `https://www.thecolorapi.com/scheme?hex=${seedColor.value.slice(1, 7)}&mode=${colorStyle.value}`,
    );
    const data = await response.json();

    swatchColors.innerHTML = data.colors
      .map(
        (color) =>
          `<div 
              class="flex-1 h-96" 
              style="background-color: ${color.hex.value};" 
              onclick="copyHexCode('${color.hex.value}')">
          </div>`,
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
