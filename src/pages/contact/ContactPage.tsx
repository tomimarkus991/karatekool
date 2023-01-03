import { DefaultPageWrapper } from "components";

import { DirectionsButton } from "./DirectionsButton";

export const ContactPage = () => {
  return (
    <DefaultPageWrapper>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <div>
            <div className="flex flex-row justify-center items-center space-x-4">
              <p className="text-4xl font-medium">VHK võimla Vanalinnas</p>
              <DirectionsButton />
            </div>
            <p className="text-xl">Vene 22, 10123 Tallinn, Estonia</p>
          </div>
        </div>
        <div className="space-y-2 text-lg">
          <p>(+372) 57 50 17 33</p>
          <p>info@karatekool.ee</p>
          <p>MTÜ Karate-do klubi Nüke</p>
          <p>EE 2310 1022 0004 3840 13</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mb-8">
          <p className="text-2xl font-medium mb-2 mt-4">Üldine info</p>
          <ul className="list-disc ml-10 text-lg">
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
        <div className="mb-8">
          <p className="text-2xl font-medium mb-2">Trenni tulek</p>
          <p className="mb-3 max-w-4xl">
            Vene tänav asub Tallinna vanalinna tasulises parkimistsoonis, soodsaim variant on tulla
            ühistranspordiga. VHK võimla on meeldiva jalutuskäigu kaugusel mitmetest Tallinna
            kesklinna ühistranspordi sõlmedest (Viru Keskus, Vabaduse väljak, Balti jaam).
          </p>
          <p className="max-w-4xl">
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
        <p className="mt-6 mb-3">
          Trenni tulija peaks sisenema sellest hooviväravast, kust peale sisenemist paistab kohe ka
          võimla. Kollase koolimaja peaukse kaudu trenni ei pääse!
        </p>

        <iframe
          title="vhk-door"
          src="https://www.google.com/maps/embed?pb=!4v1672586292325!6m8!1m7!1sWoylyElRgEjZ4AMPK4W0gg!2m2!1d59.43875058234357!2d24.74853988221851!3f76.67107239277681!4f-12.538823574173904!5f0.7820865974627469"
          className="w-full"
          height="450"
          loading="lazy"
        />
      </div>

      <div className="flex mt-8 mb-6">
        <div>
          <div className="flex flex-row justify-center items-center space-x-4">
            <p className="text-3xl font-medium">KSG Spordisaal Sikupillis</p>
            <DirectionsButton />
          </div>
          <p className="text-xl mt-2">Mäe maja, Kivimurru 9, 11411 Tallinn, Estonia</p>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-2xl font-medium mb-2">Üldine info</p>
        <ul className="list-disc ml-10 text-lg">
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
