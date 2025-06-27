import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SafeService } from '../service/safe-service';

@Component({
  selector: 'app-safe-form',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './safe-form.html',
  styleUrl: './safe-form.css'
})
export class SafeForm {
  constructor(private safeService: SafeService){}

   lock_slots = [
    {id: 1, value: 0, correct: false},
    {id: 2, value: 0, correct: false},
    {id: 3, value: 0, correct: false},
    {id: 4, value: 0, correct: false},
    {id: 5, value: 0, correct: false},
    {id: 6, value: 0, correct: false},
    {id: 7, value: 0, correct: false},
    {id: 8, value: 0, correct: false},
    {id: 9, value: 0, correct: false},
    {id: 10, value: 0, correct: false},
  ]

  correctCode: string | null = null;
  tries = 0;
  solved = false;
  timer: any = null;
  elapsedTime: number = 0;
  timerRunning: boolean = false;

  attemptHistory: any[] = [];

 

  //Adding and subtracting
  increasing(id: number){
    this.lock_slots[id].value = (this.lock_slots[id].value + 1) % 10;
  }

  decreasing(id: number){
    this.lock_slots[id].value = (this.lock_slots[id].value + 9) % 10;
  }


  //Submitting combo attempts
 submitCode() {

  if (this.solved){
    this.codeSolved();
    return;
  }

  if (!this.timerRunning){
    this.timerRunning = true;
    this.startTimer();
  }

  const code = this.lock_slots.map(slot => slot.value).join('');
  const payload = {
    code: code,
    time_taken: this.elapsedTime
  };

  this.safeService.crackSafe(payload).subscribe({
    next: (res) => {
      console.log('Result:', res);
      // Optionally assign to a result variable and show in UI
       this.tries++;

      this.lock_slots.forEach((slot, index)=>{
        slot.correct = res.correct_position[index];
      });
    
      this.attemptHistory.push({
        code: res.correct_code,
        correct_position: res.correct_position,
        success: res.success,
        time: res.time,
      })

      if(res.success){
        this.stopTimer();
        this.solved=true;
        alert('Code Cracked')
      }
      
      if(res.correct_code){
        this.correctCode = res.correct_code;
      }
    },
    error: (err) => {
      console.error('Error cracking safe:', err);
    }
  });
}

  getAttempts(){
    this.safeService.getAttemptHistory().subscribe({
      next:(res)=>{
        this.attemptHistory = res;
        console.log('Attempt history:', res)
      },
      error: (err) =>{
        console.log('Error:', err);
      }
    });
  }


 restart(){

       this.safeService.resetLock().subscribe({
      next:(res) =>{
        console.log('Lock reset:', res);
        this.lock_slots = [
        {id: 1, value: 0, correct: false},
        {id: 2, value: 0, correct: false},
        {id: 3, value: 0, correct: false},
        {id: 4, value: 0, correct: false},
        {id: 5, value: 0, correct: false},
        {id: 6, value: 0, correct: false},
        {id: 7, value: 0, correct: false},
        {id: 8, value: 0, correct: false},
        {id: 9, value: 0, correct: false},
        {id: 10, value: 0, correct: false},
        ];

        this.tries = 0;
        this.solved=false;
        this.correctCode= null;
        this.resetTimer();
        this.startTimer();
      },
      error: (err) =>{
        console.log('Error:',err)
      }
    });
  }


//Timer
startTimer(){
  this.elapsedTime = 0;
  this.timer = setInterval(() =>{
    this.elapsedTime++;
  }, 1000)
}
stopTimer(){
  if(this.timer){
    clearInterval(this.timer);
    this.timerRunning = false;
  }
}
resetTimer(){
  this.elapsedTime = 0;
  this.stopTimer();
}

//Alerts
codeSolved(){
  alert('Code has been solved!')
}

}
