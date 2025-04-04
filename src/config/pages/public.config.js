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
  PARTNERS = {
    TITLE: 'Партнеры',
    SEO_TITLE: 'VAGClub21 | Партнеры клуба',
    SEO_DESCRIPTION: 'VAGClub21 | Партнеры клуба',
    URL: '/partners'
  }
  NEWS = {
    TITLE: 'Новости',
    SEO_TITLE: 'VAGClub21 | Жизнь клуба',
    SEO_DESCRIPTION: 'VAGClub21 | Жизнь клуба',
    URL: '/news'
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
  AUTH = '/auth'

  LOGIN = `${this.AUTH}/login`
  // REGISTER = `${this.AUTH}/register`

}

export const PUBLIC_PAGES = new PublicPages()
