import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";

import {
  BeltIcon,
  BronzeMedalIcon,
  DefaultPageWrapper,
  KaratekaIcon,
  RealDiamondButton,
} from "components";

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
            psühholoogiline ettevalmistus.
          </p>
          <p className="mb-2 text-lg font-light font-catamaran">
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
            <h1 className="mb-3 text-3xl font-semibold font-catamaran">Herik Tölpt</h1>
            <div className="flex flex-col space-y-10">
              <div className="flex flex-row items-center">
                <BeltIcon />
                <p className="ml-4 text-lg font-light font-catamaran">
                  Klubi Nüke peaõpetaja ja musta vöö 3.aste IV kategooria karatetreener. (Riiklikult
                  atesteeritud).
                </p>
              </div>
              <div className="flex flex-row items-center justify-end max-w-sm ml-auto">
                <BronzeMedalIcon />
                <p className="ml-4 text-lg font-light font-catamaran">
                  Mitmekordne Eesti meister ja paljude rahvusvaheliste turniiride auhinnavõitja.
                </p>
              </div>
              <div className="flex flex-row items-center">
                <KaratekaIcon />
                <p className="ml-4 text-lg font-light font-catamaran">
                  Eesti Karate Föderatsiooni treenerite nõukogu liige ja JKS Estonia instruktor.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Tab.Group>
          <Tab.List className={clsx("relative w-full h-[30rem] mt-16 mb-12")}>
            <Tab as={Fragment}>
              <div className="absolute left-[5%] top-[50%] focus:ring-0 ring-white ring-opacity-0 ring-offset-2 ring-offset-transparent focus:outline-none">
                <RealDiamondButton variant="casualGreen">Visioon</RealDiamondButton>
              </div>
            </Tab>
            <Tab as={Fragment}>
              <div className="absolute bottom-[50%] left-[25%] focus:ring-0 ring-white ring-opacity-0 ring-offset-2 ring-offset-transparent focus:outline-none">
                <RealDiamondButton variant="casualAqua">Missioon</RealDiamondButton>
              </div>
            </Tab>
            <Tab as={Fragment}>
              <div className="absolute top-[40%] left-[45%] focus:ring-0 ring-white ring-opacity-0 ring-offset-2 ring-offset-transparent focus:outline-none">
                <RealDiamondButton size="xl" variant="casualSkyBlue">
                  Eesmärgid
                </RealDiamondButton>
              </div>
            </Tab>
            <Tab as={Fragment}>
              <div className="absolute bottom-[50%] left-[75%] focus:ring-0 ring-white ring-opacity-0 ring-offset-2 ring-offset-transparent focus:outline-none">
                <RealDiamondButton variant="casualSlateBlue">Ajaloost</RealDiamondButton>
              </div>
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>Visioon</Tab.Panel>
            <Tab.Panel>Missioon</Tab.Panel>
            <Tab.Panel>Eesmärgid</Tab.Panel>
            <Tab.Panel>Ajaloost</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </DefaultPageWrapper>
  );
};
