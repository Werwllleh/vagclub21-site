import {Suspense} from 'react'
import QuestTaskContent from "@/app/quest/[id]/quest-task-content";
import QuestService from "@/services/quest.service";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: 'VagClub21 | Квест',
  description: 'VagClub21 | Квест',
};

const Page = async ({params}) => {

  const {id} = await params;

  const {data} = await QuestService.fetchQuestTask(id)

  return (
    <>
      <Header/>
      <div className="page-quest">
        <div className="container">
          {data ? (
            <Suspense fallback={null}>
              {data && <QuestTaskContent data={data}/>}
            </Suspense>
          ) : (
            <div className="page-quest__not-found">
              <h2>Задание не найдено</h2>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Page;
