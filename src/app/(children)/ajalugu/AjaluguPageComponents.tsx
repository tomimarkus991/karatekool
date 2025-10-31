"use client";

import clsx from "clsx";
import Image from "next/image";

import { AnimationWrapper, animations } from "../../../components";
import { LetterDecryptor } from "../../../components/elements/LetterDecryptor";
import { useAnimateScroll } from "../../../hooks";

import Foto0 from "./images/Foto-0.png";
import Foto1 from "./images/Foto-1.png";
import Foto2 from "./images/Foto-2.png";
import Foto3 from "./images/Foto-3.png";
import Foto4 from "./images/Foto-4.png";
import Foto5 from "./images/Foto-5.png";
import Foto6 from "./images/Foto-6.png";
import Foto7 from "./images/Foto-7.png";
import Foto8 from "./images/Foto-8.png";
import Foto9 from "./images/Foto-9.png";

const ImageWithCaption = ({
  caption,
  children,
  className = "my-8",
}: {
  caption: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx(className)}>
      <div className="flex justify-center">{children}</div>
      <p className="mx-8 mt-2 text-sm italic text-center sm:mx-16 text-text-caption">{caption}</p>
    </div>
  );
};

export const AjaluguPageComponents = () => {
  const { control: MainTextControl, ref: MainTextRef } = useAnimateScroll();
  const { control: Foto0TextControl, ref: Foto0TextRef } = useAnimateScroll();
  const { control: Foto1TextControl, ref: Foto1TextRef } = useAnimateScroll();
  const { control: Foto2TextControl, ref: Foto2TextRef } = useAnimateScroll();
  const { control: Foto3TextControl, ref: Foto3TextRef } = useAnimateScroll();
  const { control: Foto4TextControl, ref: Foto4TextRef } = useAnimateScroll();
  const { control: interlopeTextControl, ref: interlopeTextRef } = useAnimateScroll();
  const { control: interlope2TextControl, ref: interlope2TextRef } = useAnimateScroll();
  const { control: Foto5TextControl, ref: Foto5TextRef } = useAnimateScroll();
  const { control: Foto6TextControl, ref: Foto6TextRef } = useAnimateScroll();
  const { control: Foto7TextControl, ref: Foto7TextRef } = useAnimateScroll();
  const { control: Foto72TextControl, ref: Foto72TextRef } = useAnimateScroll();
  const { control: tulemusedTextControl, ref: tulemusedTextRef } = useAnimateScroll();
  const { control: erkoTextControl, ref: erkoTextRef } = useAnimateScroll();

  return (
    <div className="max-w-2xl m-auto">
      <p className="mt-16 font-sans text-lg font-medium text-center md:text-3xl">
        <LetterDecryptor delay={200} time={1000}>
          KARATE-DO KLUBI NÜKE
        </LetterDecryptor>
      </p>
      <p className="mb-10 font-sans text-lg font-medium text-center md:text-3xl">
        <LetterDecryptor delay={200} time={1000}>
          LÜHIAJALUGU JA MISSIOON
        </LetterDecryptor>
      </p>
      {/* main text */}
      <AnimationWrapper
        animate={MainTextControl}
        ref={MainTextRef}
        variants={animations.pageItems.fadeInFromBottom}
        className="mb-10 sm:mb-20"
      >
        <p>
          Karate-Do klubi Nüke ajalugu käsitledes võib tõmmata paralleele kogu Eesti karate
          ajalooga. Nüket võib julgelt pidada Eesti kõige pikema traditsiooniga karateklubiks.
          Karateklubi Nüke loojaks oli Mart Rosmann (1943-2023), kes ise alustas karate õpinguid
          1968 aastal esimeses teada olevas karategrupis Eestis. <br />
          See esimene entusiastide grupp, ammutas karate teadmisi ühest jaapani raamatust, mida
          jupikaupa tõlgiti. Karatehuvilised vedasid raamatust näpuga järge ja kõik nähtu püüti kohe
          praktikasse viia. See grupp pani aluse ja hoo sisse kogu Eesti karate liikumisele.
          <br />
          Esimesed karate võistlused peeti 1972 aastal, mille võitjaks osutus Nüke klubi looja Mart
          Rosmann. See oli sügav Nõukogude – vene okupatsiooni aeg, kus kõik oli range kontrolli
          all.
          <br />
          Kahjuks ei saanud karated harjutada kaua, juba 1973 aastal kuulutati karate kehalise
          kasvatuse meetodina Nõukogude inimestele sobimatuks.
          <br />
          <br />
          Tänu julgetele entusiastidele, harjutati karated edasi salaja. Klubi looja Mart Rosmann
          hakkas karated õpetama „põranda all“ 1975 aastal. Selleks ajaks oli ta saanud Eesti üheks
          tuntumaiks karateõpetajaks. 1980 aastaks sai Moskva õiguse korraldada suve Olümpiamänge ja
          kuna Rahvusvaheline Olümpiakomitee tunnustas ülemaailmset karateorganisatsiooni WUKO
          tegevust, siis oli see ka üks põhjusi, miks karate 1978 aastal enne Moskva Olümpiamänge
          Nõukogude Liidus, taas ametliku loa sai.
          <br />
          <br />
          See oli ka aeg, mil Mart Rosmann lõi nüüd juba ametlikult Karate-Do klubi Nüke. Miks pani
          Mart Rosmann oma klubile nimeks „NÜKE“? M. Rosmanni kommentaar:“ Nüke on eestikeelne sõna,
          mis tähendab kavalat võtet või nutikat ja taiplikku teguviisi ja kuna karate õpetamises,
          õppimises ja võistlemises on vaja kõige rohkem taiplikkust, siis seetõttu paningi klubile
          sellise nime. Tipptasemel karatekade hulgas on paremad need, kelle pea on rohkem väärt.“
        </p>
      </AnimationWrapper>
      {/* foto 0 */}
      <div className="flex flex-col items-center mb-8 sm:mb-20 sm:flex-row">
        <ImageWithCaption
          className="my-8 sm:ml-12 sm:hidden"
          caption="FOTO „Herik Tölpt judo trennis 1974.a.“ (fotol ülemine rida vasakult kolmas)"
        >
          <Image
            src={Foto0}
            loading="eager"
            priority
            alt="FOTO „Herik Tölpt judo trennis 1974.a.“(fotol ülemine rida vasakult kolmas)"
            className="w-[40rem]"
            width={700}
            quality={100}
            placeholder="blur"
          />
        </ImageWithCaption>

        <AnimationWrapper
          animate={Foto0TextControl}
          ref={Foto0TextRef}
          variants={animations.pageItems.fadeInFromLeft}
          className="max-w-[18rem]"
        >
          <p>
            Aastatel 1978 – 1984, oli Eesti karate NSVL tugevaim. Eesti sai üheks karateliikumise
            esmaarendajaks Nõukogude Liidus. Tallinn oli kohaks, kus korraldati 1979 aastal esimene
            üle Nõukogude Liiduline karateturniir. Esimesel võistlustel osales 150 sportlast 12
            liiduvabariigist, sealhulgas ka Leningradist ja Moskvast. Ka Nüke klubi liikmed, M.
            Rosmanni õpilased Villu Mengel ja Igor Neemre, võitsid Nõukogude Liidu meistrivõistluste
            tiitleid nii katas kui kumites. See oli aeg, kui 1980 aastal, liitusin ka mina Herik
            Tölpt koos vennaga Nüke klubi treeningutega. Enne karated, nooremas koolieas, õppisin 7
            aastat judot. Judotreeninguid alustasin juba 1974. aastal 7. aastasena, siis panin selga
            esmakordselt ka jaapanikimono.
          </p>
        </AnimationWrapper>
        <ImageWithCaption
          className="hidden my-8 sm:ml-12 sm:block"
          caption="FOTO „Herik Tölpt judo trennis 1974.a.“ (fotol ülemine rida vasakult kolmas)"
        >
          <Image
            src={Foto0}
            loading="lazy"
            alt="FOTO „Herik Tölpt judo trennis 1974.a.“(fotol ülemine rida vasakult kolmas)"
            className="w-[40rem]"
            width={700}
            quality={100}
            placeholder="blur"
          />
        </ImageWithCaption>
      </div>
      {/* foto 1 */}
      <div className="flex flex-col items-center mb-8 sm:mb-20 sm:flex-row">
        <ImageWithCaption className="my-8 sm:mr-12" caption="Karate võistlused, Herik Tölpt">
          <Image
            src={Foto1}
            alt="Karate võistlused, Herik Tölpt"
            className="w-[40rem]"
            loading="lazy"
            width={700}
            quality={100}
            placeholder="blur"
          />
        </ImageWithCaption>
        <AnimationWrapper
          animate={Foto1TextControl}
          ref={Foto1TextRef}
          variants={animations.pageItems.fadeInFromRight}
          className="max-w-[18rem]"
        >
          <p className="max-w-[18rem]">
            Kuna mul oli judo põhi all, siis karate õpingud edenesid kiiresti. Juunioride klassis
            olin Nüke koondise üks perspektiivikam võistleja. Võitsin ENSV 1982-1983 aasta meistri
            tiitleid nii noorte kui juunioride klassis. 16. aastaselt võistlesin edukalt ka juba
            täiskasvanute klassis. 1983 aastal, omistati mulle Eesti parima karatejuuniori tiitel.
          </p>
        </AnimationWrapper>
      </div>
      {/* foto 2 */}
      <div className="flex flex-col items-center mb-8 sm:mb-20 sm:flex-row">
        <AnimationWrapper
          animate={Foto2TextControl}
          ref={Foto2TextRef}
          variants={animations.pageItems.fadeInFromLeft}
          className="max-w-[18rem]"
        >
          <p>
            Kuid võistluskarjäär jäi mul ja kogu eesti karatekoondisel kahjuks üpris üürikeseks,
            sest 1984. aastal läks karate taas range keelu alla. NSVL kuulutati karate ühiskonnale
            taas ohtlikuks spordialaks. Vastutusele lubati võtta kõik, kes õpetasid või harjutasid
            karated. See tähendas Eesti karatele suurt tagasilööki. Enamus selle põlvkonna
            karatekadest lõpetasid karatealase tegevuse. Mina ja mitmed teised, harjutasime karated
            edasi salaja „põranda all“, seljas dressid ja lukustatud uste taga. Saalis olid
            käeulatuses topispallid selleks, et kui tulid kontrollid, hakkasime topispallidega kohe
            üldkehalisi harjutusi tegema. Nii tegutseski Karate-Do klubi Nüke „põranda all“ edasi.
            <br />
            <br />
            1989. aastal hakkasid Eestis puhuma „vabaduse tuuled“, lõppes laastav keeluaeg. See oli
            aeg, kus taastati ja taas loodi karateklubi Nüke, nüüd juba minu ja venna Avo Tölpt
            eestvedamisel. 1991. aastal vabanes Eesti Nõukogude Liidu ikke alt, taas loodi iseseisev
            Eesti Vabariik. Alates 1993. aastast on Eesti Karate Föderatsioon nii Euroopa kui ka
            Maailma Karate Föderatsiooni liige.
            <br />
            <br />
            Pärast klubi Nüke taasloomist jätkasin võistlusspordiga, tulin veel mitmel korral Eesti
            meistriks ning mul õnnestus võita mitmeid auhinnakohti kõrgetel rahvusvahelistel
            võistlustel. 1993. aastal osalesin koos Eesti koondisega esmakordselt Euroopa MV Prahas,
            selleks ajaks olin 26. aastane ning taas eesti karatekoondise liige.
          </p>
        </AnimationWrapper>
        <ImageWithCaption
          className="mt-6 sm:ml-12 sm:mt-0"
          caption="Esimesed Eesti MV pärast keeluaega Herik Tölpt, 1989.a.“"
        >
          <Image
            src={Foto2}
            loading="lazy"
            alt="Esimesed Eesti MV pärast keeluaega Herik Tölpt, 1989.a.“"
            className="w-[40rem]"
            width={700}
            quality={100}
            placeholder="blur"
          />
        </ImageWithCaption>
      </div>
      {/* foto 3 */}
      <div className="flex flex-col items-center mb-8 sm:mb-20 sm:flex-row">
        <ImageWithCaption
          className="hidden my-8 sm:mr-12 sm:block"
          caption="HERIK TÖLPT heidet sooritamas"
        >
          <Image
            src={Foto3}
            alt="HERIK TÖLPT heidet sooritamas"
            className="w-[40rem]"
            loading="lazy"
            width={700}
            quality={100}
            placeholder="blur"
          />
        </ImageWithCaption>
        <AnimationWrapper
          animate={Foto3TextControl}
          ref={Foto3TextRef}
          variants={animations.pageItems.fadeInFromRight}
          className="max-w-[18rem]"
        >
          <p>
            Nüke looja Mart Rosmann õpetas klubis karated, mis oli üles ehitatud traditsioonilisele
            karatele (kihon, kata, kumite). Õpetajad rõhutasid karate vaimsust ning selle
            distsipliini olulisust. M. Rosmann juhindus põhiliselt shotokan karate stiili alustest.
            Muidugi oli see kõik kodukootud, otse raamatust õpitud. Tol ajal Eestis Jaapanist
            meistreid ei käinud ning tuli leiutada, proovida ja aru saada, mida see jaapani karate
            endast kujutab. <br />
            Hiljem, 1995 aastast, kui tekkisid kontaktid jaapani meistritega, eelkõige Sensei
            Sadashige Kato’ga, tuli põhimõtteliselt kõik, mis puudutas shotokan karated, ümber
            õppida. Mustavöö 2. ja 3. Dan eksamid andsin Sensei S. Katole ja hiljem 4. Dan JKS-is.
          </p>
        </AnimationWrapper>
        <ImageWithCaption
          className="my-8 sm:hidden sm:mr-12"
          caption="HERIK TÖLPT heidet sooritamas"
        >
          <Image
            src={Foto3}
            alt="HERIK TÖLPT heidet sooritamas"
            className="w-[40rem]"
            loading="lazy"
            width={700}
            quality={100}
            placeholder="blur"
          />
        </ImageWithCaption>
      </div>
      {/* foto 4 */}
      <div className="flex flex-col items-center mb-8 sm:mb-20 sm:flex-row">
        <AnimationWrapper
          animate={Foto4TextControl}
          ref={Foto4TextRef}
          variants={animations.pageItems.fadeInFromLeft}
          className="max-w-[18rem]"
        >
          <p>
            Tänaseks on karateklubist Nüke saanud üks aktiivseim shotokan karate-do’d harrastav
            klubi Eestis. Klubi treeninguid, kus õpetatakse shotokan karate-do põhiväärtusi, on
            mitmekesised – sinna mahub nii kehaline, tehniline, kui ka teoreetiline ja
            psühholoogiline ettevalmistus. Soovijatel on võimalus käia ka võistlemas. Klubi
            korraldab aastaringselt oma klubi liikmetele erinevaid karatelaagreid, -seminare ja
            -võistlusi. Klubi võistlejad on võitnud palju tiitleid Eesti MV. Võidetud on medaleid ka
            Euroopa- ja Maailma MV-tel, nii WKF kui JKS (shotokan) arvestuses.
          </p>
        </AnimationWrapper>
        <ImageWithCaption
          className="mt-6 sm:ml-12 sm:mt-0"
          caption="„Mitmekordsed Eesti meistrid ja JKS Euroopa meistrid – KATRIN KUKK ja ELIISE LIND“"
        >
          <Image
            src={Foto4}
            loading="lazy"
            alt="„Mitmekordsed Eesti meistrid ja JKS Euroopa meistrid – KATRIN KUKK ja ELIISE LIND“"
            className="w-[40rem]"
            width={700}
            quality={100}
            placeholder="blur"
          />
        </ImageWithCaption>
      </div>
      {/* interlope */}
      <AnimationWrapper
        animate={interlopeTextControl}
        ref={interlopeTextRef}
        variants={animations.pageItems.fadeInFromBottom}
        className="max-w-xs m-auto mb-16"
      >
        <p>
          Mitmekesine ning tasakaalustatud õppe- ja treeningprogramm on mõeldud selleks, et trenni
          tulnust kasvatada tõeline karateka; kujundada tema iseloomu ja väärtushoiakuid, veenda
          teda elama ja harjutama õige elumaneeri kohaselt.
        </p>{" "}
      </AnimationWrapper>

      {/* foto 5 */}
      <div className="flex flex-col items-center mb-8 sm:mb-20 sm:flex-row">
        <div>
          <AnimationWrapper
            ref={Foto5TextRef}
            animate={Foto5TextControl}
            variants={animations.pageItems.fadeInFromLeft}
          >
            <p className="mb-2 font-sans text-lg font-medium md:text-2xl max-w-[18rem]">
              NÜKE VISIOON
            </p>
            <p className="max-w-[18rem]">
              Shotokan karate-do kui iseloomu- ja väärtuspõhise kasvatussüsteemi propageerimine ja
              õpetamine.
            </p>
          </AnimationWrapper>
        </div>
        <ImageWithCaption className="mt-6 sm:ml-12 sm:mt-0" caption="Nüke koondis">
          <Image
            src={Foto5}
            loading="lazy"
            alt="Nüke koondis"
            className="w-[40rem]"
            width={700}
            quality={100}
            placeholder="blur"
          />
        </ImageWithCaption>
      </div>
      {/* interlope 2 */}
      <AnimationWrapper
        animate={interlope2TextControl}
        ref={interlope2TextRef}
        variants={animations.pageItems.fadeInFromLeft}
        className="max-w-md mb-8 text-left sm:mb-16"
      >
        <p className="mb-2 font-sans text-2xl font-semibold sm:text-3xl">NÜKE MISSIOON</p>
        <p className="text-lg font-medium sm:text-xl">
          Shotokan karate-do ja spordi õpetamise kaudu – terve, targa, heasoovliku, tugeva tahte ja
          iseloomuga ning aktiivse ja sportliku eluhoiakuga inimese kasvatamine.
        </p>
      </AnimationWrapper>
      {/* foto 6 */}
      <div className="flex flex-col items-center mb-8 sm:mb-20 sm:flex-row">
        <AnimationWrapper
          ref={Foto6TextRef}
          animate={Foto6TextControl}
          variants={animations.pageItems.fadeInFromLeft}
          className="max-w-[18rem]"
        >
          <p>
            “Karateklubi Nüke õppe-treeningsüsteem on mitme tasandine struktuur, milles kajastuvad
            õpetamise, treenimise ja kasvatamise erinevad aspektid. Shotokan karate-do õpetus seab
            esiplaanile õpilase tervikliku arengu. Õpilast püütakse õpetada, treenida ja kujundada
            kui tervikut, oluliseks peetakse nii tema vaimset, emotsionaalset, sotsiaalset kui ka
            kehalist ja karatealast arengut. Karate-Do klubi Nüke usub, et karate abil on võimalik
            kasvatada tarku, julgeid ja heatahtlikke inimesi. Teame, et karatest tõuseb tulu kogu
            eluks – süveneb võime keskenduda, pingutada ja endast parimat anda.”
          </p>
          <p className="mt-4 text-sm">-Karate-Do klubi Nüke Peainstruktor Herik Tölpt</p>
        </AnimationWrapper>
        <ImageWithCaption className="mb-12 sm:ml-12" caption="Nüke karateõpetaja Herik Tölpt">
          <Image
            src={Foto6}
            loading="lazy"
            alt="Nüke karateõpetaja Herik Tölpt"
            className="w-[40rem]"
            width={700}
            quality={100}
            placeholder="blur"
          />
        </ImageWithCaption>
      </div>
      {/* foto 7 */}
      <div className="mb-8 sm:mb-20">
        <div className="flex flex-col items-center sm:flex-row">
          <AnimationWrapper
            ref={Foto7TextRef}
            animate={Foto7TextControl}
            variants={animations.pageItems.fadeInFromLeft}
            className="max-w-[32rem]"
          >
            <p className="mb-4 text-lg font-semibold">
              Nüke karateõpetaja Herik Tölpt Riiklikult atesteeritud vanemtreener, 6. tase
              Tulemused:
            </p>
          </AnimationWrapper>

          <ImageWithCaption
            className="mb-6 sm:ml-12 sm:mb-0"
            caption="Nüke karateõpetaja Herik Tölpt tegemas kumited"
          >
            <Image
              src={Foto7}
              loading="lazy"
              alt="Nüke karateõpetaja Herik Tölpt tegemas kumited"
              className="w-[40rem]"
              width={700}
              quality={100}
              placeholder="blur"
            />
          </ImageWithCaption>
        </div>
        <AnimationWrapper
          ref={Foto72TextRef}
          animate={Foto72TextControl}
          variants={animations.pageItems.fadeInFromLeft}
        >
          <p className="sm:-mt-24">
            Alustasin judo treeningutega 1974.a.
            <div className="mb-2 sm:mb-0" />
            Alustasin karate treeningutega 1980.a.
            <div className="mb-2 sm:mb-0" />
            1989 – 1994.a. kuulus Eesti karatekoondisesse.
            <div className="mb-2 sm:mb-0" />
            1982.a. ENSV MV, noored, kumite 1-koht, Tallinn <div className="mb-2 sm:mb-0" />
            1983.a. ENSV MV, juuniorid, kumite, 1-koht, Tallinn. <div className="mb-2 sm:mb-0" />
            1983.a. ENSV parim juunior. <div className="mb-2 sm:mb-0" />
            1989.a. Hispaania rahvusvaheline karateturniir, kumite, 5-koht.
            <div className="mb-2 sm:mb-0" />
            1989.a. Tallinna rahvusvaheline karateturniir, kumite, 2-koht.
            <div className="mb-2 sm:mb-0" />
            1989.a. Eesti MV, kumite, 1-koht, Tallinn. <div className="mb-2 sm:mb-0" />
            1990.a. Eesti MV, kumite, 1-koht, Tallinn. <div className="mb-2 sm:mb-0" />
            1991.a. Prantsusmaa rahvusvaheline turniir (Wasquehal Cup), 2-koht.
            <div className="mb-2 sm:mb-0" />
            1991.a., 1992.a. Eesti parim karatetreener. <div className="mb-2 sm:mb-0" />
            1992.a. Eesti MV, kumite, 1-koht, Tallinn. <div className="mb-2 sm:mb-0" />
            1993.a. Euroopa MV, kumite, Praha. <div className="mb-2 sm:mb-0" />
            1993.a. Eesti parima treeneri kandidaat. <div className="mb-2 sm:mb-0" />
            1993.a. Eesti MV, kumite, 1-koht, Tallinn <div className="mb-2 sm:mb-0" />
            1994.a. Euroopa MV, kumite, Birmingham. 2011.a., 2014.a., 2016.a. EOK tänab tulemusliku
            töö eest.
          </p>
        </AnimationWrapper>
      </div>
      {/* foto 8 */}
      <div className="flex flex-col items-center justify-center">
        <ImageWithCaption
          className="mb-12 sm:ml-12"
          caption="„Vasakul MATTHIAS JAAKSOO Põhjamaade meister kumites ja TANEL PÄRSS Euroopa hõbe kumites“"
        >
          <Image
            src={Foto8}
            loading="lazy"
            alt="„Vasakul MATTHIAS JAAKSOO Põhjamaade meister kumites ja TANEL PÄRSS Euroopa hõbe kumites“"
            className="w-[30rem]"
            width={700}
            quality={100}
            placeholder="blur"
          />
        </ImageWithCaption>
      </div>
      {/* õpilaste tulemused */}
      <AnimationWrapper
        ref={tulemusedTextRef}
        animate={tulemusedTextControl}
        variants={animations.pageItems.fadeInFromLeft}
        className="mb-16"
      >
        <p className="mb-2 text-lg font-semibold">
          Karate-Do klubi Nüke parimate õpilaste tulemused
          <br /> rahvusvahelistel võistlustel:
        </p>
        <p className="text-sm">
          1993.a. MK Ungari / noored, 2. koht Tõnu Tõnov ja 3. koht Hannes Laaser ja Margus Sinimets
          <div className="mb-2 sm:mb-0" />
          1994.a. MK Ungari / noored, 1. koht, Tanel Pärss.
          <div className="mb-2 sm:mb-0" />
          <span className="font-semibold">
            Märkimisväärseid kohti on võidetud ka kadettide ja juunioride võistlustel.
          </span>
          <div className="mb-2 sm:mb-0" />
          1994.a. EM Madriid, 5. koht Margus Lepvalts.
          <div className="mb-2 sm:mb-0" />
          1996.a. EM Istanbul, meeskonna 5. koht, Ivo Kolk ja indiv. 7. koht, Tõnu Tõnov
          <div className="mb-2 sm:mb-0" />
          1997.a. EM Sofia, 5. koht Ivo Kolk.
          <div className="mb-2 sm:mb-0" />
          1998.a. EM Ateena, 5. koht, Mattias Jaaksoo.
          <div className="mb-2 sm:mb-0" />
          2000.a. MM juuniorid Bulgaaria, 7. koht, Mattias Jaaksoo.
          <div className="mb-2 sm:mb-0" />
          2000.a. EM Jugoslaavia, 2. koht, Tanel Pärss.
          <div className="mb-2 sm:mb-0" />
          2004.a. EM IJKS Küpros, 3. koht, Ave Karp
          <div className="mb-2 sm:mb-0" />
          2011.a. MM JKS Scotland, 3. koht, Kristin Tölpt juuniorid kumite ja 3. koht kata
          <div className="mb-2 sm:mb-0" />
          2011.a. MM JKS Scotland, 3. koht, Ove Liis Mahhov, juuniorid kumite.
          <div className="mb-2 sm:mb-0" />
          2012.a. Põhjamaade MV Norra, 2. koht, täiskasvanud grupikata Kristin Tölpt, Greete Tölpt,
          Eilin Sepp.
          <div className="mb-2 sm:mb-0" />
          2013.a. Põhjamaade MV Rootsi, 3. koht, täiskasvanud grupikata Kristin Tölpt, Greete Tölpt,
          Ann Leen Mahhov.
          <div className="mb-2 sm:mb-0" />
          2013.a. EM Portugal, 9. koht, Erko Tölpt, kadetid kata.
          <div className="mb-2 sm:mb-0" />
          2014.a. EM JKS Taani, 1. koht Katrin Kukk, noored kumite.
          <div className="mb-2 sm:mb-0" />
          2014.a. EM JKS Taani, 1. koht Eliise Lind, kadetid kumite.
          <div className="mb-2 sm:mb-0" />
          2014.a. EM JKS Taani, 1. koht segavõistkond kata, Erko, Greete ja Kristin Tölpt
          <div className="mb-2 sm:mb-0" />
          2016.a. MM JKS Scotland, 1. koht Ken-Erik Kalme, kadetid kumite.
          <div className="mb-2 sm:mb-0" />
          2016.a. MM JKS Scotland, 2. koht Katrin Kukk, kadetid kumite.
          <div className="mb-2 sm:mb-0" />
          2016.a. MM JKS Scotland, 2. koht tüdrukute (14.-16.a.) võistkonna kumite.
          <div className="mb-2 sm:mb-0" />
          2016.a. MM JKS Scotland, 3. koht poiste (11.-13.a.) võistkonna kata.
          <div className="mb-2 sm:mb-0" />
          2017.a. EM JKS Belgia, 1. koht Eliise Lind (16.-17.a.) kumite.
          <div className="mb-2 sm:mb-0" />
          2017.a. EM JKS Belgia, 2. koht Erko Tölpt (16.-17.a.) kumite.
          <div className="mb-2 sm:mb-0" />
          2017.a. EM JKS Belgia, 3. koht Katrin Kukk (16.-17.a.) kumite.
          <div className="mb-2 sm:mb-0" />
          2019.a. Põhjamaade MV Soome, Erko Tölpt, 2. koht meeskonna kumite.
          <div className="mb-2 sm:mb-0" />
          2023.a. Põhjamaade MV Rootsi, 3. koht, tüdrukute võistkonna kata Johanna Rael Nagel, Kaisa
          Peegel, Louise Grete Josepson.
          <div className="mb-2 sm:mb-0" />
          2024.a. Põhjamaade MV Island, 2. koht, naiste võistkonna kata Johanna Rael Nagel, Mia
          Mirtel Kitt, Kaisa Peegel, Helena Pallo.
          <div className="mb-2 sm:mb-0" />
          2024.a. Põhjamaade MV Island, 3. koht meeste võistkonna kata Johann Kristjan Laurits,
          Aleksander Laasik, Jakob Mikkin, Aaron Norman Pukk.
          <div className="mb-2 sm:mb-0" />
        </p>
      </AnimationWrapper>
      {/* foto 9 */}
      <AnimationWrapper
        ref={erkoTextRef}
        animate={erkoTextControl}
        variants={animations.pageItems.fadeInFromRight}
        className="flex flex-col items-center justify-center"
      >
        <ImageWithCaption
          className="mb-12 sm:ml-12"
          caption="ERKO TÖLPT mitmekordne Eesti meister nii katas kui kumites, Põhjamaade hõbe kumites"
        >
          <Image
            src={Foto9}
            loading="lazy"
            alt="ERKO TÖLPT mitmekordne Eesti meister nii katas kui kumites, Põhjamaade hõbe kumites"
            className="w-[36rem]"
            width={700}
            quality={100}
            placeholder="blur"
          />
        </ImageWithCaption>
      </AnimationWrapper>
    </div>
  );
};
