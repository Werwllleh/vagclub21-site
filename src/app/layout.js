import "@/styles/index.scss";

export const metadata = {
  title: "VAGCLUB21 - Скоро открытие!",
  description: "Клубный сайт самого лучшего автомобильного сообщества в г. Чебоксары",
};

export default function RootLayout({ children }) {

  // console.log(process.env.NODE_ENV)

  return (
    <html lang="ru">
    <head>
      {process.env.NODE_ENV === "production" && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) {return;}}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                
                ym(${process.env.NEXT_PUBLIC_YM_ID}, "init", {
                  clickmap: true,
                  trackLinks: true,
                  accurateTrackBounce: true,
                  webvisor: true
                });`,
            }}
          />
          <noscript>
            <div>
              <img
                src={`https://mc.yandex.ru/watch/${process.env.NEXT_PUBLIC_YM_ID}`}
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
        </>
      )}
    </head>
    <body>{children}</body>
    </html>
  );
}
