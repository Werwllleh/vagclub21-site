export const productsTypes = [
  {
    title: 'Наклейки',
    url: '/stickers',
    image: 'stickers.jpg',
    active: true,
    label: 'Скоро'
  },
  {
    title: 'Ароматизаторы',
    url: '/flavours',
    image: 'aromatizers.jpg',
    active: true,
    label: 'Скоро'
  },
  {
    title: 'Одежда',
    url: '',
    image: 'merch.jpg',
    active: false,
    label: 'Скоро'
  },
  {
    title: 'Номерные рамки',
    url: '',
    image: 'number-frames.jpg',
    active: false,
    label: 'Скоро'
  },
]

export const menuList = [
  {
    label: 'Авто',
    key: 'cars',
    path: '/cars',
  },
  {
    label: 'Атрибутика',
    key: 'products',
    path: '/products',
    children: [
      {
        label: 'Наклейки',
        key: 'stickers',
        path: '/products/stickers',
      },
      {
        label: 'Ароматизаторы',
        key: 'flavours',
        path: '/products/flavours',
      },
    ]
  },
  {
    label: 'Клуб',
    key: 'club',
    path: '',
    children: [
      {
        label: 'Партнеры',
        key: 'partners',
        path: '/partners',
      },
      {
        label: 'О нас',
        key: 'about',
        path: '/about',
      },
      {
        label: 'Блог',
        key: 'blog',
        path: '/blog',
      },
      {
        label: 'Встречи',
        key: 'meet',
        path: '/meet',
      },
      {
        label: 'Контакты',
        key: 'contacts',
        path: '/contacts',
      },
    ]
  },
  {
    label: 'Профиль',
    key: 'profile',
    path: '/profile',
  },
]