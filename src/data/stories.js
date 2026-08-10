import sunriseJourney from '../assets/images/sunrise-journey.png'
import forestRiverSpread from '../assets/images/forest-river-spread.png'
import starsHomeSpread from '../assets/images/stars-home-spread.png'

export const littleTraveler = {
  id: 'little-traveler',
  title: 'The Little Traveler',
  subtitle: 'A story about looking beyond the horizon',
  cover: sunriseJourney,
  spreads: [
    {
      art: sunriseJourney,
      left: {
        kicker: 'Once upon a time…',
        title: 'A town of mountains & dreams',
        text: 'In a small town surrounded by mountains and dreams, there lived a curious soul with a heart full of wonder.',
        caption: 'He loved to watch the sunrise, listen to the birds, and imagine places far beyond the horizon.',
        scene: 'sunrise',
      },
      right: {
        kicker: 'And so, the journey began.',
        title: 'A pocketful of courage',
        text: 'With a backpack, a camera, and a heart full of dreams, he set out to explore the world and collect stories.',
        caption: 'New places, new people, new lessons… every step became a story.',
        scene: 'journey',
      },
    },
    {
      art: forestRiverSpread,
      left: {
        kicker: 'Beyond the valley…', title: 'The forest that hummed',
        text: 'Past the last little house, a friendly forest began to sing in the breeze. Every leaf seemed to know his name.',
        caption: '“Keep your eyes open,” whispered the wind. “A wonderful thing might be hiding nearby.”', scene: 'forest',
      },
      right: {
        kicker: 'At the river bend…', title: 'A map made of stars',
        text: 'By a silver river, he met a fox who pointed one curious paw toward the moonlit hills.',
        caption: 'He took a picture, made a new friend, and tucked the moment safely into his story bag.', scene: 'river',
      },
    },
    {
      art: starsHomeSpread,
      left: {
        kicker: 'When evening came…', title: 'A sky full of stories',
        text: 'Under a blanket of stars, the little traveler remembered every smile, every song, and every winding path.',
        caption: 'The biggest adventures, he discovered, begin with one small, brave step.', scene: 'night',
      },
      right: {
        kicker: 'And wherever he went…', title: 'Home came along',
        text: 'He knew there were still more horizons to see. But he also knew exactly where his next story would begin.',
        caption: 'The end… or perhaps the beginning of another beautiful journey.', scene: 'homecoming',
      },
    },
  ],
}

export const library = [littleTraveler, { id: 'bear-stars', title: 'The Bear Who Loved the Stars', comingSoon: true }, { id: 'milo-moon', title: 'Milo and the Moon', comingSoon: true }]
