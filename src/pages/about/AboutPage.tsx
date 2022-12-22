import { DefaultPageWrapper, EventCreator } from "components";

export const AboutPage = () => {
  return (
    <DefaultPageWrapper>
      <div className="flex w-full flex-col justify-center items-center">
        <EventCreator></EventCreator>
      </div>
    </DefaultPageWrapper>
  );
};
