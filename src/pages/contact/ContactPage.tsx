import { DefaultPageWrapper } from "components";

export const ContactPage = () => {
  return (
    <DefaultPageWrapper>
      <p>ContactPage</p>
      <iframe
        title="vhk-map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2028.672626802986!2d24.746469916527637!3d59.438534381697195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46929354254d21ff%3A0xaae636211ac67099!2sKarate-DO%20Klubi%20N%C3%9CKE!5e0!3m2!1sen!2see!4v1671877034130!5m2!1sen!2see"
        width="1000"
        height="450"
        loading="lazy"
      />
      <iframe
        title="ksg-map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d590.3914104429309!2d24.78825216698169!3d59.4278017231875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469293b833065b57%3A0x191a22794b1c9d1f!2sKSG%20M%C3%A4e%20maja!5e0!3m2!1sen!2see!4v1671876698031!5m2!1sen!2see"
        width="1000"
        height="450"
        loading="lazy"
      />
    </DefaultPageWrapper>
  );
};
