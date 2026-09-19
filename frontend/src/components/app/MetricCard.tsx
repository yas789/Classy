import { type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type MetricCardProps = {
  label: string;
  value: string;
  chip: string;
  tone?: "success" | "warning" | "muted";
  icon: LucideIcon;
};

export function MetricCard({ label, value, chip, tone = "muted", icon: Icon }: MetricCardProps) {
  return (
    <Card className="flex flex-col justify-between p-5">
      <div className="flex items-center justify-between text-[#5e5d6b]">
        <span className="text-[11px] font-medium uppercase tracking-[0.08em]">{label}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eff4ff] text-[#4648d4]">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
      <div className="my-3 text-[34px] font-semibold leading-tight tracking-tight text-[#0b1c30]">{value}</div>
      <Badge className="w-fit" variant={tone}>{chip}</Badge>
    </Card>
  );
}
