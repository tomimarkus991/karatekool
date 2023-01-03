import clsx from "clsx";

interface Props {
  title: string;
  content: React.ReactNode;
  className?: string;
}

export const AccordionContentList = ({ title, content, className }: Props) => {
  return (
    <div className={clsx(className)}>
      <p className="text-lg font-medium">{title}</p>
      <div className="px-6 pt-2">
        <ul className="list-disc text-base text-gray-700 space-y-1">{content}</ul>
      </div>
    </div>
  );
};
