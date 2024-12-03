import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FlashcardService } from '../services/flashcard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  flashcards: any[] = [];

  constructor(
    private alertCtrl: AlertController,
    private flashcardService: FlashcardService
  ) {}

  ngOnInit() {
    this.loadFlashcards();
  }

  loadFlashcards() {
    this.flashcardService.getFlashcards().subscribe(
      (response) => {
        if (response && Array.isArray(response.data)) {
          this.flashcards = response.data.map((card) => ({
            ...card,
            isFlipped: false, 
          }));
        }
      },
      (error) => {
        console.error('Error fetching flashcards:', error);
      }
    );
  }

  toggleFlip(card: any) {
    card.isFlipped = !card.isFlipped; 
  }

  shuffleFlashcards() {
    this.flashcards = this.flashcards.sort(() => Math.random() - 0.5);
  }

  handleSwipe(event: any) {
    if (event.direction === 16 && this.flashcards.length > 1) {
      this.flashcards.shift(); 
    }
  }
  getCardTransform(index: number): string {
  const offset = index; 
  const scale = 1 - offset * 0.05; 
  const translateY = offset * 20; 
  return `scale(${scale}) translateY(${translateY}px)`;
}


  async openFlashcardForm() {
    const alert = await this.alertCtrl.create({
      header: 'Add Flashcard',
      inputs: [
        { name: 'question', type: 'text', placeholder: 'Enter question' },
        { name: 'answer', type: 'textarea', placeholder: 'Enter answer' },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add',
          handler: (data) => {
            this.createFlashcard(data);
          },
        },
      ],
    });
    await alert.present();
  }

  createFlashcard(data: any) {
    this.flashcardService.createFlashcard(data).subscribe(
      () => this.loadFlashcards(),
      (error) => console.error('Error creating flashcard:', error)
    );
  }
}
