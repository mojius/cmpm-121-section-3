import * as Phaser from "phaser";

import starfieldUrl from "/assets/starfield.png";
import enemyShipUrl from "/assets/enemyShip.png";

export default class Play extends Phaser.Scene {
  fire?: Phaser.Input.Keyboard.Key;
  left?: Phaser.Input.Keyboard.Key;
  right?: Phaser.Input.Keyboard.Key;

  starfield?: Phaser.GameObjects.TileSprite;
  spinner?: Phaser.GameObjects.Shape;
  ship01?: Phaser.GameObjects.Sprite;
  ship02?: Phaser.GameObjects.Sprite;

  moveSpeed = 2 / 10;

  constructor() {
    super("play");
  }
  loadShips() {
    this.load.image("starfield", starfieldUrl);
    this.load.image("enemyShip", enemyShipUrl);
  }
  preload() {
    this.loadShips();
  }

  #addKey(
    name: keyof typeof Phaser.Input.Keyboard.KeyCodes,
  ): Phaser.Input.Keyboard.Key {
    return this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes[name]);
  }

  createKeys() {
    this.fire = this.#addKey("F");
    this.left = this.#addKey("LEFT");
    this.right = this.#addKey("RIGHT");
  }

  create() {
    this.createKeys();
    this.starfield = this.add
      .tileSprite(
        0,
        0,
        this.game.config.width as number,
        this.game.config.height as number,
        "starfield",
      )
      .setOrigin(0, 0);

    this.spinner = this.add.rectangle(100, 400, 50, 50, 0xff5900);
    this.ship01 = this.add.sprite(400, 60, "enemyShip");
    this.ship01.setScale(4, 4);
    this.ship01.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
  }

  update(_timeMs: number, delta: number) {
    this.updateInput(delta);
  }

  updateInput(delta: number) {
    this.starfield!.tilePositionX -= 4;

    if (this.left!.isDown) {
      this.spinner!.x -= delta * this.moveSpeed;
    }
    if (this.right!.isDown) {
      this.spinner!.x += delta * this.moveSpeed;
    }

    if (this.fire!.isDown) {
      this.tweens.add({
        targets: this.spinner,
        scale: { from: 1.5, to: 1 },
        duration: 300,
        ease: Phaser.Math.Easing.Sine.Out,
      });
    }
  }
}
