import { HiAcademicCap } from "react-icons/hi";

import { DefaultPageWrapper } from "components";

export const AboutClubPage = () => {
  return (
    <DefaultPageWrapper>
      <div className="max-w-4xl m-auto">
        <div className="mb-5">
          <h1 className="mb-3 text-xl font-semibold font-catamaran">Nüke klubist</h1>
          <p className="mb-2 text-lg font-light font-catamaran">
            Nükes õpetatakse Shotokan karated. Õppe-ja treeningtegevus, kus omandatakse karate ja
            spordialaseid põhiväärtusi, on väga mitmekesine, mahutades nii karate kui spordi
            teoreetiline, kehaline, tehniline, taktikaline kui ka eetilis-moraalne ja
            psühholoogiline ettevalmistus. Algperioodil tehakse trenni 3 korda nädalas, hiljem
            vastavalt õpilase tasemele ja soovile treeningute arv kasvab.Soovijatel on võimalus käia
            ka võistlemas. Klubis korraldatakse aastaringselt karatelaagreid, seminare ja võistlusi.
            Mitmekesine ning tasakaalustatud õppe- ja treeningprogramm on mõeldud selleks, et trenni
            tulnust kasvatada tõeline karateka; kujundada tema iseloomu ja väärtushoiakuid, veenda
            teda elama ja harjutama õige elumaneeri kohaselt. Nüke õppe- ja treeningprogramm saab
            PDF failina allalaadida, klikates SIIA.
          </p>
        </div>
        <h1 className="mb-3 text-xl font-semibold font-catamaran">Nüke treener</h1>
        <div className="flex flex-col md:flex-row">
          <div className="w-[30rem] h-[30rem] bg-stone-200 mr-5">treeneri pilt</div>
          <div className="flex flex-col">
            <h1 className="mb-3 text-3xl font-semibold font-catamaran">Herik Tölpt</h1>
            <div className="flex flex-col space-y-10">
              <div className="flex flex-row">
                <HiAcademicCap />
                <p className="mb-2 text-lg font-light font-catamaran">
                  Klubi Nüke peaõpetaja ja musta vöö 3.aste IV kategooria karatetreener. (Riiklikult
                  atesteeritud).
                </p>
              </div>
              <div className="flex flex-row justify-end max-w-xs ml-auto">
                <HiAcademicCap />
                <p className="mb-2 text-lg font-light font-catamaran">
                  Mitmekordne Eesti meister ja paljude rahvusvaheliste turniiride auhinnavõitja.
                </p>
              </div>
              <div className="flex flex-row">
                <HiAcademicCap />
                <p className="mb-2 text-lg font-light font-catamaran">
                  Eesti Karate Föderatsiooni treenerite nõukogu liige ja JKS Estonia instruktor.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[30rem] bg-stone-200 mt-12"></div>
      </div>
    </DefaultPageWrapper>
  );
};
