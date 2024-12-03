export interface Flashcard {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  isFlipped?: boolean; 
  fadeOut?: boolean;   
}


export interface FlashcardResponse {
  status: string;
  data: Flashcard[];
}
