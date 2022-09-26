import cars from '../../../static/_cars.js';

const contents = JSON.stringify(
  cars.map((car) => {
    return car;
  })
);

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(contents);
}
