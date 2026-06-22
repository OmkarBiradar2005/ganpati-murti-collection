import { useCountdown } from '../hooks/useCountdown';
import { siteConfig } from '../data/siteConfig';

export const CountdownBanner = () => {
  const { days, hours, minutes, seconds } = useCountdown(siteConfig.festivalDate);

  const items = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <div className="glass-panel rounded-[2rem] p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-saffron-600 dark:text-saffron-300">Festive Countdown</p>
          <h3 className="mt-2 text-2xl font-display font-bold">Until Ganesh Chaturthi</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="rounded-2xl bg-stone-950 px-4 py-3 text-center text-white dark:bg-white/10">
              <div className="text-2xl font-bold">{String(item.value).padStart(2, '0')}</div>
              <div className="text-xs uppercase tracking-[0.25em] text-stone-300">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
