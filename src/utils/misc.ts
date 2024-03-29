import colors from '../colors.json';

export const getSelectionRange = (
  element: HTMLElement,
  collapseRange?: boolean
): Promise<Selection | null> => {
  const range = document.createRange(); //Create a range (a range is a like the selection but invisible)
  const selection = window.getSelection(); //get the selection object (allows you to change selection);
  //Firefox, Chrome, Opera, Safari, IE 9+

  range.selectNodeContents(element); //Select the entire contents of the element with the range

  if (collapseRange) {
    range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
  }

  selection?.removeAllRanges(); //remove any selections already made
  selection?.addRange(range); //make the range you have just created the visible selection

  return Promise.resolve(selection);
};

const returnColoursArray = () => {
  const _colors = colors as any;
  const resultantArray = [] as { name: string; rgb: string }[];

  for (const name in _colors) {
    const rgb = _colors[name].rgbVal;

    if (rgb) {
      resultantArray.push({
        name,
        rgb: `rgb(${rgb.join(',')})`
      });
    }
  }

  return resultantArray;
};

export const colorsArray = Array.from(
  new Set(returnColoursArray().map((color) => color.rgb))
);
