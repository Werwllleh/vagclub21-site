import {SOCIAL} from "@/constants";

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
        label: 'Встреча',
        key: 'meet',
        path: '/meet',
      },
      /*{
        label: 'Контакты',
        key: 'contacts',
        path: '/contacts',
      },*/
    ]
  },
  {
    label: 'Профиль',
    key: 'profile',
    path: '/profile',
    children: [
      {
        label: 'Авто',
        key: 'profile-cars',
        path: '/profile?section=cars',
      },
      {
        label: 'Компании',
        key: 'profile-companies',
        path: '/profile?section=companies',
      },
    ]
  },
]

export const footerMenuList = [
  {
    groupName: 'Клуб',
    list: [
      {
        label: 'Авто',
        path: '/cars'
      },
      {
        label: 'Атрибутика',
        path: '/products'
      },
      {
        label: 'Партнеры',
        path: '/partners'
      },
      {
        label: 'Встреча',
        path: '/meet'
      },
    ]
  },
  {
    groupName: 'Информация',
    list: [
      {
        label: 'О клубе',
        path: '/about'
      },
      {
        label: 'Политика конфиденциальности',
        path: '/policy'
      },
    ]
  },
  {
    groupName: 'Социальные сети',
    list: [
      {
        icon: 'telegram',
        openOnOtherWindow: true,
        path: SOCIAL.TELEGRAM
      },
      {
        icon: 'instagram',
        openOnOtherWindow: true,
        path: SOCIAL.INSTAGRAM
      },
    ]
  },
]

export const placeholderBlur = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCA1LjEuOBtp6qgAAAC2ZVhJZklJKgAIAAAABQAaAQUAAQAAAEoAAAAbAQUAAQAAAFIAAAAoAQMAAQAAAAIAAAAxAQIAEAAAAFoAAABphwQAAQAAAGoAAAAAAAAAYAAAAAEAAABgAAAAAQAAAFBhaW50Lk5FVCA1LjEuOAADAACQBwAEAAAAMDIzMAGgAwABAAAAAQAAAAWgBAABAAAAlAAAAAAAAAACAAEAAgAEAAAAUjk4AAIABwAEAAAAMDEwMAAAAACrgCETU544KAAAABhJREFUKFNjvHHjBgNuwASlcYCRKc3AAAAZHwKc3sNPBgAAAABJRU5ErkJggg==";
