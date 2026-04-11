import { Users, Package, ShieldCheck, Clock } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import WaveDivider from '@/components/WaveDivider';

const STATS = [
  { icon: Users, value: '27+', label: 'lainanantajaa' },
  { icon: Package, value: '50+', label: 'lainatuotetta' },
  { icon: ShieldCheck, value: '100%', label: 'ilmainen' },
  { icon: Clock, value: '2 min', label: 'vertailuaika' },
];

export default function StatsSection() {
  return (
    <section className="relative">
      <WaveDivider color="#0B1F3F" />
      <div className="bg-navy py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {STATS.map((stat, idx) => (
              <ScrollReveal key={stat.label} delay={idx * 100}>
                <div className="text-center">
                  <stat.icon className="h-6 w-6 text-accent-400 mx-auto mb-3" strokeWidth={1.8} />
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-400 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
      <WaveDivider color="#F8FAFC" />
    </section>
  );
}
