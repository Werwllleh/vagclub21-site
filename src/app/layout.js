import "@/styles/index.scss";


export const metadata = {
  title: "VAGCLUB21 - Скоро открытие!",
  description: "Клубный сайт самого лучшего автомобильного сообщества в г. Чебоксары",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}
