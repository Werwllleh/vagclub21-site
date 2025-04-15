class PublicPages {
  HOME = {
    TITLE: 'Главная',
    SEO_TITLE: 'VAGClub21 | Главная',
    SEO_DESCRIPTION: 'VAGClub21 | Крупнейшее авто сообщество г.Чебоксары',
    URL: '/'
  }
  PRODUCTS = {
    TITLE: 'Атрибутика',
    SEO_TITLE: 'VAGClub21 | Атрибутика клуба',
    SEO_DESCRIPTION: 'VAGClub21 | Атрибутика клуба',
    URL: '/products'
  }
  CARS = {
    TITLE: 'Клубные авто',
    SEO_TITLE: 'VAGClub21 | Клубные авто',
    SEO_DESCRIPTION: 'VAGClub21 | Клубные авто',
    URL: '/cars'
  }
  PARTNERS = {
    TITLE: 'Партнеры',
    SEO_TITLE: 'VAGClub21 | Партнеры клуба',
    SEO_DESCRIPTION: 'VAGClub21 | Партнеры клуба',
    URL: '/partners'
  }
  BLOG = {
    TITLE: 'Блог',
    SEO_TITLE: 'VAGClub21 | Жизнь клуба',
    SEO_DESCRIPTION: 'VAGClub21 | Жизнь клуба',
    URL: '/blog'
  }
  ABOUT = {
    TITLE: 'О нас',
    SEO_TITLE: 'VAGClub21 | О клубе',
    SEO_DESCRIPTION: 'VAGClub21 | О клубе',
    URL: '/about'
  }
  CONTACTS = {
    TITLE: 'Контакты',
    SEO_TITLE: 'VAGClub21 | Контакты',
    SEO_DESCRIPTION: 'VAGClub21 | Контакты',
    URL: '/contacts'
  }
  POLICY = {
    TITLE: 'Политика',
    SEO_TITLE: 'VAGClub21 | Политика пользовательского соглашения',
    SEO_DESCRIPTION: 'VAGClub21 | Политика пользовательского соглашения',
    URL: '/policy'
  }

  AUTH = '/auth'

  LOGIN = `${this.AUTH}/login`
  // REGISTER = `${this.AUTH}/register`

}

export const PUBLIC_PAGES = new PublicPages()
