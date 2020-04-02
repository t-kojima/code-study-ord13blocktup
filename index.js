const compare = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

exports.run = input => {
  const numbers = input.split('').map(_ => Number(_));
  const max = Math.max(...numbers);
  let boxes = numbers.map(_ => [
    ...Array(_).fill('b'),
    ...Array(max - _).fill('w')
  ]);
  while (true) {
    const before = JSON.parse(JSON.stringify(boxes));
    // console.log(boxes)
    const changed = boxes.map((box, i) => {
      if (i === 0 || i === boxes.length - 1) {
        // 最初と最後
        return box.map(_ => (_ === 'w' ? '' : _));
      }
      {
        const prev = boxes[i - 1];
        const index = prev.indexOf('');
        index >= 0 &&
          [...Array(max).keys()].forEach(_ => {
            if (_ >= index && box[_] === 'w') {
              box[_] = '';
            }
          });
      }
      {
        const next = boxes[i + 1];
        const index = next.indexOf('');
        index >= 0 &&
          [...Array(max).keys()].forEach(_ => {
            if (_ >= index && box[_] === 'w') {
              box[_] = '';
            }
          });
      }
      if (box.every(_ => _ === 'w' || _ === '')) {
        box.fill('')
      }
      return box;
    });
    if (compare(changed, before)) {
      break;
    } else {
      boxes = changed;
    }
  }

  // console.log(boxes);
  return boxes.reduce((x, y) => [...x, ...y]).filter(_ => _ === 'w').length.toString()
};
