import 'yuki-createjs/lib/easeljs-0.8.2.combined';
import Point from './point';

const stage = new createjs.Stage('stage');

export default class Main {

  constructor(config) {
    this.stage = stage;
    this.points = [];

    const { maxPoints, interval } = config;

    createjs.Ticker.setInterval(interval);
    createjs.Ticker.addEventListener('tick', this.handleTick.bind(this));
    window.addEventListener('resize', this.setCanvasSize.bind(this));

    this.setCanvasSize();

    for (let i = 0; i < maxPoints; i++) {
      this.points.push(new Point(stage, i, config));
    }

    stage.update();
  }

  setCanvasSize() {
    this.stage.canvas.width = window.innerWidth;
    this.stage.canvas.height = window.innerHeight;
  }

  handleTick() {
    this.points.forEach(p => p.tick());
    this.stage.update();
  }
}
