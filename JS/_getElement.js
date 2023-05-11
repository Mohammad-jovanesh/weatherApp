export default function getElement(elm) {
  let myElm = document.querySelector(elm);
  if (myElm) {
    return myElm;
  } else {
    throw new Error("wrong Element !");
  }
}
