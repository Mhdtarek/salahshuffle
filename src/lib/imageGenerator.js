import html2canvas from "html2canvas";

export async function saveImage(salahTimesContainer) {
    // create a canvas from the Salah times container with padding
    const canvas = await html2canvas(salahTimesContainer, {
      backgroundColor: "black",
      x: -200,
      y: -50, // add 50 pixels of padding at the top
      height: salahTimesContainer.offsetHeight + 100, // add 100 pixels of padding (50 top + 50 bottom)
      width: 500,
    });

    // convert the canvas to a data URL
    const dataUrl = canvas.toDataURL("image/png");

    // create a link element to download the image
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "salah-times.png";

    // trigger a click event on the link to download the image
    link.click();
  }