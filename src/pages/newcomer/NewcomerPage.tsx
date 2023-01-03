import { Accordion } from "@redlotus/ui";

import { AccordionContentList, DefaultPageWrapper } from "components";

export const NewcomerPage = () => {
  const className = "h-8 w-8 text-[#E50815]";
  return (
    <DefaultPageWrapper>
      <div className="flex flex-col justify-center items-center space-y-4 mb-8">
        <Accordion
          key="Uute liikmete vastuvõtt"
          title={"Uute liikmete vastuvõtt"}
          body={
            <div className="mb-2">
              <div className="text-lg px-4 pb-2 mb-2 text-gray-700">
                Uute liikmete vastuvõtt on taas avatud septembris 2023.
              </div>

              <div className="px-4 py-2 text-xl mb-2 text-gray-700">
                Treeningud <b>algklasside lastele</b>, VHK spordisaalis (Vene 22):
              </div>
              <ul className="list-disc pl-8 mb-4">
                <li className="font-bold text-lg mb-2 text-gray-800">V-grupp:</li>
                <ul className="list-disc pl-8 text-base text-gray-700">
                  <li>TEISIPÄEVAL kell 15:00 – 16:00</li>
                  <li>KOLMAPÄEVAL kell 15:00 – 16:00</li>
                  <li>REEDEL kell 15:00 – 16:00</li>
                </ul>
              </ul>

              <div className="px-4 py-2 text-xl mb-2 text-gray-700">
                Treeningud <b>noortele ja täiskasvanutele</b>, VHK spordisaalis (Vene 22):
              </div>
              <ul className="list-disc pl-8 mb-4">
                <li className="font-bold text-lg mb-2 text-gray-800">A-grupp:</li>
                <ul className="list-disc pl-8 text-base text-gray-700">
                  <li>TEISIPÄEVAL kell 16:30-17:45</li>
                  <li>NELJAPÄEVAL kell 16:30-17:45</li>
                  <li>LAUPÄEVAL kell 11:15-12:45 (vastavalt treeninggraafikule)</li>
                </ul>
              </ul>
            </div>
          }
          iconClassName={className}
        />
        <Accordion
          key="Miks tulla harjutama just Nüke klubisse?"
          title={"Miks tulla harjutama just Nüke klubisse?"}
          body={
            <div className="px-6 mb-2">
              <ul className="list-disc text-base text-gray-700 space-y-1">
                <li>
                  Klubi Nüke on kõige pikema traditsiooniga karateklubi Eestis. Meil on heade
                  kogemuste ja oskustega treenerid, selle tunnistuseks on rahulolevate harjutajate
                  suur hulk.
                </li>
                <li>
                  Nükes järgitakse karate-do alusväärtusi, mille põhirõhk on asetatud iseloomu- ja
                  väärtuskasvatusele.
                </li>
                <li>Karate õppimine on Nükes protsessi ja harrastajakeskne.</li>
                <li>
                  Tähtis ei ole mitte õpilase võit ega kaotus, vaid õpilase areng, treeningutel
                  rõhutatakse tööpanust ja pingutuse määra.
                </li>
                <li>Nükes saavad karated õppida nii suuremad kui väiksemad poisid ja tüdrukud.</li>
                <li>
                  Palju on täiskasvanud harrastajate hulgas ka emasid ja isasid, kelle lapsed
                  harjutavad meie klubis.
                </li>
                <li>Klubi korraldab aastaringselt karatelaagreid, seminare ja võistlusi.</li>
                <li>Lastel on võimalus soovi korral käia ka võistlustel.</li>
                <li>
                  Klubisisesed võistlused on treeningprogrammi osa, klubist väljaspool võistlevad
                  klubi koondise liikmed.
                </li>
                <li>
                  Nükes on meeldivad ja sõbralikud klubiliikmed, kellega koos on hea harjutada.
                </li>
              </ul>
            </div>
          }
          iconClassName={className}
        />
        <Accordion
          key="Miks peaks karated õppima?"
          title={"Miks peaks karated õppima?"}
          body={
            <div>
              <AccordionContentList
                title="Nii füüsilise kui ka vaimse võimekuse paranemisega tuleneb ka elukvaliteedi tõus ja
                heaolu."
                content={
                  <>
                    <li>
                      Karated õppides ja harjutades omandab õpilane enesearendamiseks ja eluks
                      vajalikke teadmisi, oskusi ja võimeid.
                    </li>
                    <li>
                      Kujuneb välja mõtlemis-, mõistmis- ja analüüsimisvõime, enese- ja
                      sihiteadlikus, karate-, tervise-, ja spordialane intelligentsus, õpioskused
                      jne.
                    </li>
                    <li>
                      Karateõpilasel kujuneb aja jooksul välja kindel iseloom ja psühholoogiline
                      võimekus (kõlbeline eluhoiak ja eetiline distsipliin, vägivallatu ja
                      rahumeelne suhtlemisoskus, enesekontroll, kannatlikkus, meelekindlus,
                      pühendatus).
                    </li>
                    <li>
                      Sotsiaalne aspekt: meie trennides pannakse rõhku omavahelistele headele
                      suhetele. Riiukukki ja kaklejaid meil pole, karates on mõttetöö ülioluline.
                    </li>
                    <li>
                      Läbi karatetreeningute omandab õpilane kahevõitlus- ja enesekaitseoskusi,
                      kaitse- ja ründetehnikaid nii ühe, kui mitme vastase vastu, kaitsevõtteid
                      relvade vastu.
                    </li>
                    <li>
                      Kujuneb välja nii füüsiline kui ka vaimne valmisolek, enesekindlus, julgus,
                      tähelepanelikkus, kiire reageerimisvõime ja taiplikus.
                    </li>
                    <li>
                      Enesekaitseoskusest tulenev tasakaal aitab vältida konfliktseid olukordi.
                      Rünnatakse ja kiusatakse eelkõige nõrgemaid, karate harjutaja pole kerge saak.
                    </li>
                    <li>
                      Süstemaatiline karatega tegelemine arendab kehalisi võimeid, tagab keha
                      harmoonilise arengu, annab hea rühi, parandab liikumiskoordinatsiooni,
                      karastab organismi, parandab tervist, tõstab kehalist tublidust ja töövõimet.
                    </li>
                  </>
                }
              />
            </div>
          }
          iconClassName={className}
        />
        <Accordion
          key="Kellele karate sobib?"
          title={"Kellele karate sobib?"}
          body={
            <div>
              <AccordionContentList
                title="Üks karate laialdase leviku põhjuseid on see, et karate harjutamiseks pole vaja
                palju eeldusi."
                content={
                  <>
                    <li>Karatega tegelevad edukalt mõlemast soost inimesed.</li>
                    <li>
                      Karatega võib meie klubis hakata tegelema alates 7.-ndast eluaastast kuid
                      vanuselist ülempiiri pole. Meie klubis on alustanud harjutamist ka üsnagi
                      soliidses eas inimesed. Peaasi on “treenida ajudega”, ehk siis oma võimete
                      kohaselt järjekindlalt edasi areneda.
                    </li>
                    <li>
                      Karate sobib nii neile, kes soovivad tegeleda ka võistlemisega (meie klubi
                      koondislased võistlevad palju väljaspool klubi) kui ka neile, kes soovivad
                      harjutada lihtsalt enda jaoks.
                    </li>
                    <li>
                      Karatega võivad hakata tegelema nii heas kui ka kehvas füüsilises vormis
                      inimesed. Oluline on võimetekohane treening ning seeläbi järjepidev arenemine.
                    </li>
                  </>
                }
                className="mb-4"
              />
              <AccordionContentList
                title="Vajalikud eeldused:"
                content={
                  <>
                    <li>
                      Tahe. Soov ennast liigutada. “Terves kehas terve vaim”- sellel ütlusel on tõsi
                      taga. Vaimne ja füüsiline pool elust saavad areneda vaid harmoonias, seda õpib
                      mõistma iga karate harjutaja.
                    </li>
                    <li>
                      Iseloom. Meie klubisse sobivad sõbralikud ja teistega arvestavad inimesed.
                      Meil kaklema ei õpita, karatekal on oluline õppida just konflikte vältima.
                    </li>
                  </>
                }
                className="mb-2"
              />
            </div>
          }
          iconClassName={className}
        />
        <Accordion
          key="Milline näeb välja treeningriietus?"
          title={"Milline näeb välja treeningriietus?"}
          body={
            <>
              <AccordionContentList
                title="Karate treeningutega alustamine on rahakotile sõbralik."
                content={
                  <>
                    <li>
                      Meie treeningutel ollakse paljajalu, seega on treeningjalanõud kõigil omast
                      käest võtta.
                    </li>
                    <li>
                      Treeninguid võib alustada oma spordiriietes. Kui soov treeninmiseks püsib,
                      tuleks soetada endale treeningriietus (karate gi).
                    </li>
                    <li>Mõnda aega möödudes on vaja osta ka käekaitsed vabavõitluse tarbeks.</li>
                  </>
                }
                className="mb-4"
              />
              <AccordionContentList
                title="Üldine:"
                content={
                  <>
                    <li>
                      Karated harjutatakse paljajalu ning spetsiaalses treeningriietuses, mida
                      kutsutakse kimono või karate gi.
                    </li>
                    <li>
                      Karate gi ja ka muu võitluskunstide varustuse ostmiseks soovitame Budopunkti,
                      mis asub aadressil Laki 26, Tallinn.
                    </li>
                    <li>
                      Küsimuste korral treeningriietuse ja ka muu varustuse kohta tasuks kindlasti
                      pöörduda instruktori poole. Nõu võivad anda ka kogenumad trennikaaslased.
                      Küsida võib alati.
                    </li>
                  </>
                }
                className="mb-2"
              />
            </>
          }
          iconClassName={className}
        />
        <Accordion
          key="Nõuded treeningutel"
          title={"Nõuded treeningutel"}
          body={
            <div>
              <AccordionContentList
                title="Selleks, et treening oleks meeldiv ja ohutu, on vaja kinni pidada elementaarsetest
                nõuetest:"
                content={
                  <>
                    <li>
                      Nätsu, kommi või mistahes muu toiduga suus on treenida lubamatu, see on ohtlik
                      eelkõige treenijale endale.
                    </li>
                    <li>
                      Kõik ehted (sõrmused, kaelaehted, kõrvarõngad, metallist juukseklambrid jne.)
                      tuleb enne treeningu alustamist eemaldada kuna need võivad vigastada nii
                      trennikaaslast kui ka kandjat ennast.
                    </li>
                    <li>
                      Pikemad juuksed, mis näo ette vajuvad, tuleb kinni panna kas juuksekummiga või
                      mõnel muul ohutul viisil.
                    </li>
                  </>
                }
                className="mb-2"
              />
            </div>
          }
          iconClassName={className}
        />
        <Accordion
          key="Treeningtasu"
          title={"Treeningtasu"}
          body={
            <div className="px-6 space-y-6 mb-2">
              <p>
                Treeningtasu makstakse kord kuus, enne uue treeningtsükli algust. Selle kohta
                saadetakse info iga kuu e-maili teel, koos uue kuu treeninggraafikuga.
              </p>
              <p>
                Üks treeningtsükkel kestab 4 nädalat, 2-3 treeningut nädalas, kokku 10-12
                treeningkorda kuus.
              </p>
            </div>
          }
          iconClassName={className}
        />
      </div>
    </DefaultPageWrapper>
  );
};
