interface Props {
  icon: string;
  value?: number;
  title: string;
}

export const InsightsNumbersComponents = ({ icon, title, value }: Props) => {
  return (
    <div className="flex-1 bg-white/20 backdrop-blur-3xl rounded-lg p-4">
      <div className="flex flex-row gap-2 items-center mb-2">
        <img src={icon} className="size-12" />
        <p className="font-bold text-lg text-white">{title}</p>
      </div>

      <h3 className="font-bold text-3xl text-white text-center">
        {value || 0}
      </h3>
    </div>
  );
};
