import { DefaultPageWrapper, Calendar } from "components";

export const HomePage = () => {
  return (
    <DefaultPageWrapper RightSide={<div></div>}>
      <div>Home</div>
      <Calendar />
    </DefaultPageWrapper>
  );
};
