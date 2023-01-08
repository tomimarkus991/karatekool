import { DefaultPageWrapper, DirectionsButton } from "components";

interface ContactHeadingProps {
  children: React.ReactNode;
}
const ContactHeading = ({ children }: ContactHeadingProps) => {
  return <p className="font-catamaran text-[#393939] text-lg font-semibold">{children}</p>;
};

export const ContactPage = () => {
  return (
    <DefaultPageWrapper>
      <div className="mb-4 md:hidden">
        <ContactHeading>Kontakt</ContactHeading>
        <div className="space-y-2 text-[0.9rem]">
          <p>(+372) 57 50 17 33</p>
          <p>info@karatekool.ee</p>
          <p>MTÜ Karate-do klubi Nüke</p>
          <p>EE 2310 1022 0004 3840 13</p>
        </div>
      </div>
      <div className="flex flex-row justify-between mb-5">
        <div className="hidden md:block">
          <div className="flex flex-row items-center justify-center space-x-4">
            <ContactHeading>VHK võimla Vanalinnas</ContactHeading>
            <DirectionsButton />
          </div>
          <p className="text-xl">Vene 22, 10123 Tallinn, Estonia</p>
        </div>
        <div className="flex flex-row md:hidden">
          <div className="flex flex-col items-center justify-center mr-2">
            <ContactHeading>VHK võimla Vanalinnas</ContactHeading>
            <p className="text-[0.9rem]">Vene 22, 10123 Tallinn, Estonia</p>
          </div>
          <DirectionsButton />
        </div>
        <div className="hidden space-y-2 text-lg md:block">
          <ContactHeading>Kontakt</ContactHeading>
          <p>(+372) 57 50 17 33</p>
          <p>info@karatekool.ee</p>
          <p>MTÜ Karate-do klubi Nüke</p>
          <p>EE 2310 1022 0004 3840 13</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mb-4">
          <ContactHeading>Üldine info</ContactHeading>
          <ul className="md:ml-10 ml-6 text-[0.9rem] md:text-base list-disc">
            <li>
              <p>Esimesse trenni tuleb kaasa võtta tavalised spordiriided ja hea tuju.</p>
            </li>
            <li>
              <p>
                Varustust (kimono ja vööd) pole alguses vaja, kuid kui on olemas võib kaasa võtta.
              </p>
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <ContactHeading>Trenni tulek</ContactHeading>
          <p className="max-w-4xl mb-3 text-[0.9rem] md:text-base">
            Vene tänav asub Tallinna vanalinna tasulises parkimistsoonis, soodsaim variant on tulla
            ühistranspordiga. VHK võimla on meeldiva jalutuskäigu kaugusel mitmetest Tallinna
            kesklinna ühistranspordi sõlmedest (Viru Keskus, Vabaduse väljak, Balti jaam).
          </p>
          <p className="max-w-4xl text-[0.9rem] md:text-base">
            Isikliku autoga tulija peab arvestama, et ukse ees Vene tänaval parkimise hind on 1,15
            EUR 15 minuti eest. Lähimad Europarki parklad on aadressidel Aia 18 ja Aia 7 (3,20 EUR
            tund). Ka kesklinna tasulise parkimise tsoon ei asu kaugel, kuid odavamas
            parkimistsoonis (nt. Mere pst. ääres) parkimiskoha leidmine võib nõuda palju aega.
          </p>
        </div>
        <iframe
          title="vhk-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2028.672626802986!2d24.746469916527637!3d59.438534381697195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46929354254d21ff%3A0xaae636211ac67099!2sKarate-DO%20Klubi%20N%C3%9CKE!5e0!3m2!1sen!2see!4v1671877034130!5m2!1sen!2see"
          height="450"
          className="w-full"
          loading="lazy"
        />
        <p className="mt-6 mb-3 text-[0.9rem] md:text-base">
          Trenni tulija peaks sisenema sellest hooviväravast, kust peale sisenemist paistab kohe ka
          võimla. Kollase koolimaja peaukse kaudu trenni ei pääse!
        </p>

        {/* <iframe
          title="vhk-door"
          src="https://www.google.com/maps/embed?pb=!4v1672930327547!6m8!1m7!1sXMecyfKoHC599Gkqk8Escg!2m2!1d59.43866558139087!2d24.74846176838619!3f48.41854115344992!4f3.8139882712168856!5f0.7820865974627469"
          className="w-full"
          height="450"
          loading="lazy"
        /> */}
        <img
          alt="vhk-door"
          src="/general/vhk_door_arrow.jpg"
          className="object-cover aspect-auto"
        />
      </div>
      <div className="flex mt-8 mb-6">
        <div>
          <div className="flex flex-row items-center justify-center space-x-4">
            <ContactHeading>KSG Spordisaal Sikupillis</ContactHeading>
            <DirectionsButton />
          </div>
          <p className="mt-2 text-xl">Mäe maja, Kivimurru 9, 11411 Tallinn, Estonia</p>
        </div>
      </div>

      <div className="mb-8">
        <ContactHeading>Üldine info</ContactHeading>
        <ul className="ml-10 text-lg list-disc">
          <li>
            <p>Esimesse trenni tuleb kaasa võtta tavalised spordiriided ja hea tuju.</p>
          </li>
          <li>
            <p>
              Varustust (kimono ja vööd) pole alguses vaja, kuid kui on olemas võib kaasa võtta.
            </p>
          </li>
        </ul>
      </div>

      <iframe
        title="ksg-map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d590.3914104429309!2d24.78825216698169!3d59.4278017231875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469293b833065b57%3A0x191a22794b1c9d1f!2sKSG%20M%C3%A4e%20maja!5e0!3m2!1sen!2see!4v1671876698031!5m2!1sen!2see"
        className="w-full"
        height="450"
        loading="lazy"
      />
    </DefaultPageWrapper>
  );
};
