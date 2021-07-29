export type Assets = {
  baseUrl: string;
  images:{ key:string, url:string }[];
};
export default {
  baseUrl: './assets/img',
  images: [
    {
      key: 'goku_blue',
      url: 'gokublue.jpg',
    },
    {
      key: 'goku_ui',
      url: 'ultraInstinct.jpg',
    },
    {
      key: 'vegita_blue',
      url: 'vegitaBlue.jpg',
    },
    {
      key: 'vegita_super_blue',
      url: 'vegitaSuperBlue.jpg',
    },
    {
      key: 'goku-ss',
      url: 'ssgoku.png',
    },
    {
      key: 'dino',
      url: 'dino.json',
    },
    {
      key: 'back',
      url: 'cardback.png',
    },
    {
      key: 'front',
      url: 'smilies.jpg',
    },
  ],
};
