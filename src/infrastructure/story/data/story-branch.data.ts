import { Branch } from '../../../domain/story/branch.entity';

export const STORY_BRANCH: Branch = {
  title: 'Begin',
  sub_title: 'Missing Child',
  image: 'https://cdn.example.com/story/begin.png',
  option: 'Begin',
  text:
    "You're an experienced detective. A mysterious woman seeks your help to find a missing child.",
  question: "What's your initial choice?",
  options: [
    {
      text: 'Interview the bustling market crowd for leads.',
      question: 'Who stands out to you?',
      options: [
        {
          option: 'Cooperative shopkeeper',
          next_chapter_id: 'chapter-market-01',
          text: 'The shopkeeper remembers a cloaked traveler leading a child away.',
          question: 'Do you follow the traveler trail?',
          options: [
            {
              title: 'Trail Lost',
              sub_title: 'Fog overtakes the path',
              image: 'https://cdn.example.com/story/ending-trail.png',
              text: 'You pursued the wrong figure and the trail runs cold.',
            },
          ],
        },
        {
          text: 'Question the stable hand stationed at the city gates.',
          question: 'What clue do you press for?',
          options: [
            {
              title: 'Fresh Tracks',
              sub_title: 'Hoof prints in the mud',
              image: 'https://cdn.example.com/story/ending-hoof.png',
              text: 'The hoof prints point north, narrowing your options.',
            },
          ],
        },
      ],
    },
    {
      option: 'Search the manor',
      next_chapter_id: 'chapter-manor-entrance',
      text: "You inspect the Baronet's manor for hidden passages.",
      question: 'Where do you start searching?',
      options: [
        {
          text: 'Examine the study for secret compartments.',
          question: 'Do you disturb the desk or the bookshelf?',
          options: [
            {
              title: 'Hidden Ledger',
              sub_title: 'Contraband records',
              image: 'https://cdn.example.com/story/ending-ledger.png',
              text: 'The ledger exposes a smuggling ring tied to the child.',
            },
          ],
        },
      ],
    },
  ],
};

