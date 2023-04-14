import html2canvas from "html2canvas";

export async function saveImage(salahTimesContainer) {
  // calculate the horizontal and vertical center positions of the container
  const containerRect = salahTimesContainer.getBoundingClientRect();
  const centerX = containerRect.left + containerRect.width / 2;
  const centerY = containerRect.top + containerRect.height / 2;

  // calculate the x and y options to center the content
  const x = centerX - window.innerWidth / 2;
  const y = centerY - window.innerHeight / 2;

  // create a canvas from the Salah times container with padding
  const canvas = await html2canvas(salahTimesContainer, {
    backgroundColor: "#426eed",
    x,
    y,
    height: salahTimesContainer.offsetHeight + Math.abs(y),
    width: salahTimesContainer.offsetWidth,
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
