import "@/styles/index.scss";
import SnowMode from "@/components/snow-mode";
import Providers from "@/app/providers";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "VAGCLUB21-Сайт авто сообщества в Чебоксарах!",
  description: "Клубный сайт авто сообщества в Чебоксарах, где автолюбители могут делиться опытом, участвовать в мероприятиях и общаться.",
  keywords: "VAGCLUB21, автомобильный клуб, Чебоксары, автосообщество, автолюбители, мероприятия, автомобили",
};

export default function RootLayout({children}) {

  return (
    <html lang="ru">
    <head>
      <link rel="canonical" href="https://vagclub21.ru/"/>
      <meta name="yandex-verification" content="e1783a4d4e4edd5b"/>
      {process.env.START_MODE === "production" && (
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
                style={{position: "absolute", left: "-9999px"}}
                alt=""
              />
            </div>
          </noscript>
        </>
      )}
    </head>
    <body>
    <Providers>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </Providers>
    {/*<SnowMode/>*/}
    </body>
    </html>
  );
}
