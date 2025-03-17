import Header from "@/components/header";
import Footer from "@/components/footer";
import SocialLinks from "@/components/social-links";


export default function Home() {
  
  return (
    <>
      <Header/>
      <main>
        <div className="page-soon">
          <div className="container">
            <div className="page-soon__body">
              <div className="page-soon__information">
                <h1 className="page-soon__title">Сайт в разработке</h1>
                <div className="page-soon__links">
                  <p className="page-soon__links-text">Вступайте в нашу беседу и подписывайтесь на соц. сети</p>
                  <SocialLinks />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}
