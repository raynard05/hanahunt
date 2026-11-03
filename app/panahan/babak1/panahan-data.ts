export interface RoundQuestion {
  round: number;
  questionText: string;
  correctAnswer: number; // 1 to 6
  options: {
    index: number;
    image: string;
  }[];
}

export const ROUNDS_DATA: RoundQuestion[] = [
  {
    round: 1,
    questionText:
      'Saka aksara ing ngisor iki, temokna endi sing kalebu Aksara Murda "Na" nganggo panah iki!',
    correctAnswer: 1,
    options: [
      { index: 1, image: "/assets/babak1/question_answer/round1/1.png" },
      { index: 2, image: "/assets/babak1/question_answer/round1/2.png" },
      { index: 3, image: "/assets/babak1/question_answer/round1/3.png" },
      { index: 4, image: "/assets/babak1/question_answer/round1/4.png" },
      { index: 5, image: "/assets/babak1/question_answer/round1/5.png" },
      { index: 6, image: "/assets/babak1/question_answer/round1/6.png" },
    ],
  },
  {
    round: 2,
    questionText:
      'Saka aksara ing ngisor iki, temokna endi sing kalebu Aksara Murda "Ka" nganggo panah iki!',
    correctAnswer: 5,
    options: [
      { index: 1, image: "/assets/babak1/question_answer/round2/1.png" },
      { index: 2, image: "/assets/babak1/question_answer/round2/2.png" },
      { index: 3, image: "/assets/babak1/question_answer/round2/3.png" },
      { index: 4, image: "/assets/babak1/question_answer/round2/4.png" },
      { index: 5, image: "/assets/babak1/question_answer/round2/5.png" },
      { index: 6, image: "/assets/babak1/question_answer/round2/6.png" },
    ],
  },
  {
    round: 3,
    questionText:
      'Saka aksara ing ngisor iki, temokna endi sing kalebu Aksara Murda "Ta" nganggo panah iki!',
    correctAnswer: 5,
    options: [
      { index: 1, image: "/assets/babak1/question_answer/round3/1.png" },
      { index: 2, image: "/assets/babak1/question_answer/round3/2.png" },
      { index: 3, image: "/assets/babak1/question_answer/round3/3.png" },
      { index: 4, image: "/assets/babak1/question_answer/round3/4.png" },
      { index: 5, image: "/assets/babak1/question_answer/round3/5.png" },
      { index: 6, image: "/assets/babak1/question_answer/round3/6.png" },
    ],
  },
  {
    round: 4,
    questionText:
      'Saka aksara ing ngisor iki, temokna endi sing kalebu Aksara Murda "Sa" nganggo panah iki!',
    correctAnswer: 3,
    options: [
      { index: 1, image: "/assets/babak1/question_answer/round4/1.png" },
      { index: 2, image: "/assets/babak1/question_answer/round4/2.png" },
      { index: 3, image: "/assets/babak1/question_answer/round4/3.png" },
      { index: 4, image: "/assets/babak1/question_answer/round4/4.png" },
      { index: 5, image: "/assets/babak1/question_answer/round4/5.png" },
      { index: 6, image: "/assets/babak1/question_answer/round4/6.png" },
    ],
  },
  {
    round: 5,
    questionText:
      'Saka aksara ing ngisor iki, temokna endi sing kalebu Aksara Murda "Pa" nganggo panah iki!',
    correctAnswer: 2,
    options: [
      { index: 1, image: "/assets/babak1/question_answer/round5/1.png" },
      { index: 2, image: "/assets/babak1/question_answer/round5/2.png" },
      { index: 3, image: "/assets/babak1/question_answer/round5/3.png" },
      { index: 4, image: "/assets/babak1/question_answer/round5/4.png" },
      { index: 5, image: "/assets/babak1/question_answer/round5/5.png" },
      { index: 6, image: "/assets/babak1/question_answer/round5/6.png" },
    ],
  },
  {
    round: 6,
    questionText:
      'Saka aksara ing ngisor iki, temokna endi sing kalebu Aksara Murda "Nya" nganggo panah iki!',
    correctAnswer: 4,
    options: [
      { index: 1, image: "/assets/babak1/question_answer/round6/1.png" },
      { index: 2, image: "/assets/babak1/question_answer/round6/2.png" },
      { index: 3, image: "/assets/babak1/question_answer/round6/3.png" },
      { index: 4, image: "/assets/babak1/question_answer/round6/4.png" },
      { index: 5, image: "/assets/babak1/question_answer/round6/5.png" },
      { index: 6, image: "/assets/babak1/question_answer/round6/6.png" },
    ],
  },
  {
    round: 7,
    questionText:
      'Saka aksara ing ngisor iki, temokna endi sing kalebu Aksara Murda "Ga" nganggo panah iki!',
    correctAnswer: 4,
    options: [
      { index: 1, image: "/assets/babak1/question_answer/round7/1.png" },
      { index: 2, image: "/assets/babak1/question_answer/round7/2.png" },
      { index: 3, image: "/assets/babak1/question_answer/round7/3.png" },
      { index: 4, image: "/assets/babak1/question_answer/round7/4.png" },
      { index: 5, image: "/assets/babak1/question_answer/round7/5.png" },
      { index: 6, image: "/assets/babak1/question_answer/round7/6.png" },
    ],
  },
];
