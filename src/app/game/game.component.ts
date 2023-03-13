import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent {
  indexes: number[] = [];
  haiku = '';
  haikus = [
    'Aneta stwierdziła gdy rano wstała, że się zakopała.',
    'Aneta stwierdziła gdy rano wstała, że się zakochała',
    'Przeszedłwszy przez rzeczkę złamał poprzeczkę, ojć!',
    'Zawszę się wzruszam hej gdy pierwszeństwo wymuszam.',
    'Zawżdy chciałem Cię przytulić ale jestem komputerem',
  ];

  text = '';
  button2 = 'Następne haiku';
  score = '';
  ticksSum = 0;
  searchValue = '';
  miliSecs = 0;
  secs = 0;
  minutes = 0;
  interval: any;
  result = 0;
  newTime = true;
  time = '0:00,0s';
  ticks = 0;
  totalScore = '';

  startTimer(): void {
    this.interval = setInterval(() => {
      this.miliSecs++;
      this.ticks++;
      if (this.miliSecs >= 10) {
        this.secs++;
        this.miliSecs = 0;
        if (this.secs >= 60) {
          this.minutes++;
          this.secs = 0;
        }
      }
      this.time =
        this.minutes +
        ':' +
        this.secs.toString().padStart(2, '0') +
        ',' +
        this.miliSecs +
        's';
      if (this.text == this.haiku) {
        this.endTimer();
      }
    }, 1);
  }

  endTimer(): void {
    clearInterval(this.interval);
    this.score = this.time;
    this.miliSecs = this.secs = this.minutes = 0;
    this.newTime = true;
    this.caluclateTotalScore();
  }

  caluclateTotalScore(): void {
    this.ticksSum = this.ticksSum + this.ticks;
    var m = Math.floor(this.ticksSum / 600);
    var s: string = (this.ticksSum % 600).toString().padStart(3, '0');
    console.log(s);
    this.totalScore = m + ':' + s.slice(0, 2) + ',' + s[2] + 's';
    this.ticks = 0;
  }

  generateText(): string {
    // generate next haiku

    while (true) {
      // randomly select index of the haiku
      var index = Math.floor(Math.random() * this.haikus.length);

      if (!this.indexes.includes(index) && this.indexes.length < 1) {
        // if index is not included in indexes yet
        this.indexes.push(index);
        this.button2 = 'Następne haiku';
        this.haiku = this.haikus[index];

        if (this.indexes.length >= 1) {
          // if all haiku were shown
          this.button2 = 'Spróbuj raz jeszcze';
          this.indexes = [];
          break;
        } else {
          break;
        }
      }
    }
    this.text = '';
    this.time = '0:00,0s';
    return this.haiku;
  }

  onInput(value: string): void {
    this.text = value;
    if (this.newTime) {
      this.startTimer();
    }
    this.newTime = false;
  }

  compare(char: string, enteredChar: string): string {
    if (!enteredChar) {
      return 'grey';
    }
    return char === enteredChar ? 'good' : 'bad';
  }

  
  fake: string = this.generateText();
}
