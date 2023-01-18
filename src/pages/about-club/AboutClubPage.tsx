import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";

import { AboutPanel, DefaultPageWrapper, RealDiamondButton, ResizablePanel } from "components";

interface Props {
  icon: React.ReactNode;
  text: string;
}

const IconText = ({ icon, text }: Props) => {
  return (
    <>
      <div className="w-[20%] flex justify-center items-center">{icon}</div>

      <p className="ml-2 w-[80%] text-base font-light md:ml-4 md:text-lg font-catamaran">{text}</p>
    </>
  );
};

export const AboutClubPage = () => {
  return (
    <DefaultPageWrapper>
      <div className="max-w-4xl m-auto">
        <div className="mb-5">
          <h1 className="mb-3 text-xl font-semibold font-catamaran">Nüke klubist</h1>
          <p className="mb-2 text-base font-light md:text-lg font-catamaran">
            Nükes õpetatakse Shotokan karated. Õppe-ja treeningtegevus, kus omandatakse karate ja
            spordialaseid põhiväärtusi, on väga mitmekesine, mahutades nii karate kui spordi
            teoreetiline, kehaline, tehniline, taktikaline kui ka eetilis-moraalne ja
            psühholoogiline ettevalmistus.
          </p>
          <p className="mb-2 text-base font-light md:text-lg font-catamaran">
            Algperioodil tehakse trenni 3 korda nädalas, hiljem vastavalt õpilase tasemele ja
            soovile treeningute arv kasvab.Soovijatel on võimalus käia ka võistlemas. Klubis
            korraldatakse aastaringselt karatelaagreid, seminare ja võistlusi. Mitmekesine ning
            tasakaalustatud õppe- ja treeningprogramm on mõeldud selleks, et trenni tulnust
            kasvatada tõeline karateka; kujundada tema iseloomu ja väärtushoiakuid, veenda teda
            elama ja harjutama õige elumaneeri kohaselt.
          </p>
        </div>
        <h1 className="mb-3 text-xl font-semibold font-catamaran">Nüke treener</h1>
        <div className="flex flex-col md:flex-row">
          {/* <div className="w-[30rem] h-[30rem] bg-stone-200 mr-5">treeneri pilt</div> */}
          <img
            alt="treener-herik"
            src="/icons/herik.jpg"
            className="object-cover mr-16 aspect-auto h-80 w-80 rounded-3xl"
          />
          <div className="flex flex-col">
            <h1 className="mt-6 mb-3 text-xl font-semibold md:text-2xl font-catamaran">
              Herik Tölpt
            </h1>
            <div className="flex flex-col space-y-5 md:space-y-10">
              <div className="flex flex-row items-center justify-center">
                <IconText
                  text="Klubi Nüke peaõpetaja ja musta vöö 3.aste IV kategooria karatetreener. (Riiklikult
                  atesteeritud)."
                  icon={<img alt="belt" className="w-[3.5rem] sm:w-[4rem]" src="/icons/belt.svg" />}
                />
              </div>
              <div className="flex flex-row items-center justify-end max-w-sm ml-auto">
                <IconText
                  text="Mitmekordne Eesti meister ja paljude rahvusvaheliste turniiride auhinnavõitja."
                  icon={
                    <img alt="medal" className="w-[2.5rem] sm:w-[3rem]" src="/icons/medal.svg" />
                  }
                />
              </div>
              <div className="flex flex-row items-center">
                <IconText
                  text="Eesti Karate Föderatsiooni treenerite nõukogu liige ja JKS Estonia instruktor."
                  icon={
                    <img
                      alt="karateka"
                      className="w-[3rem] sm:w-[3.5rem]"
                      src="/icons/karateka.svg"
                    />
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <Tab.Group>
          <Tab.List
            className={clsx(
              "relative w-full h-[16rem] sm:h-[20rem] md:h-[30rem] md:mt-16 mb-12 overflow-hidden"
            )}
          >
            <Tab as={Fragment}>
              <div className="remove-ring absolute left-[5%] top-[50%]">
                <RealDiamondButton variant="casualGreen">Visioon</RealDiamondButton>
              </div>
            </Tab>
            <Tab as={Fragment}>
              <div className="remove-ring absolute bottom-[50%] md:bottom-[50%] sm:bottom-[45%] left-[25%]">
                <RealDiamondButton variant="casualAqua">Missioon</RealDiamondButton>
              </div>
            </Tab>
            <Tab as={Fragment}>
              <div className="remove-ring absolute top-[50%] sm:top-[40%] left-[45%]">
                <RealDiamondButton size="xl" variant="casualSkyBlue">
                  Eesmärgid
                </RealDiamondButton>
              </div>
            </Tab>
            <Tab as={Fragment}>
              <div className="remove-ring absolute bottom-[50%] md:bottom-[50%] sm:bottom-[45%] left-[70%] md:left-[75%]">
                <RealDiamondButton variant="casualSlateBlue">Ajaloost</RealDiamondButton>
              </div>
            </Tab>
          </Tab.List>
          <div className="px-4 py-6 overflow-hidden bg-white rounded-2xl">
            <Tab.Panels as={ResizablePanel} duration={1}>
              <AboutPanel id="visioon">
                <div>
                  <p className="mb-2 text-xl font-semibold">Visioon</p>
                  <p>
                    Karate-do klubi Nüke visiooniks on karate-do kui spordi-, iseloomu- ja
                    väärtuspõhise kasvatussüsteemi propageerimine ja õpetamine.
                  </p>
                </div>
              </AboutPanel>
              <AboutPanel id="missioon">
                <div>
                  <p className="mb-2 text-xl font-semibold">Missioon</p>
                  <p>
                    Karate-do klubi Nüke missioon on targa, heasoovliku, tugeva tahte ja iseloomuga
                    ning aktiivse ja sportliku eluhoiakuga inimese kasvatamine karate-do ja laiemalt
                    spordi kaudu.
                  </p>
                </div>
              </AboutPanel>
              <AboutPanel id="eesmargid">
                <div>
                  <p className="mb-2 text-xl font-semibold">Eesmärgid</p>
                  <ul className="ml-8 list-disc">
                    <li>
                      luua tingimused süvendatud karate- ja spordialaseks eneseteostamiseks ja
                      õppeks
                    </li>
                    <li>
                      organiseerida karate kui spordi ning iseloomu- ja väärtuspõhise
                      kasvatussüsteemi teoreetiline ja praktiline ettevalmistus ja õpe
                    </li>
                    <li>
                      äratada õpilastes huvi karate õppimise, spordi ja pideva enesetäiustamise
                      vastu
                    </li>
                    <li>
                      anda karate õppimiseks, sportimiseks ning enese- ja iseloomukasvatuseks
                      vajalike teadmisi ja oskusi.
                    </li>
                  </ul>
                </div>
              </AboutPanel>
              <AboutPanel id="ajaloost">
                <div>
                  <p className="mb-2 text-xl font-semibold">Ajaloost</p>
                  <p>
                    Karate-do klubi Nüke on Eesti kõige pikema traditsiooniga karateklubi. Nüke
                    loodi 1978. aastal.
                  </p>
                  <p>
                    1984. aastal karate harjutamine Eestis keelati ning karated tuli harjutada edasi
                    salaja „põranda all“. 1989. aastal keeluaeg lõppes. See oli aeg, mil Nüke loodi
                    taas ning klubi jätkas oma tegevust.
                  </p>
                </div>
              </AboutPanel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </DefaultPageWrapper>
  );
};
