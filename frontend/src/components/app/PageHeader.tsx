import { type ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        {eyebrow ? <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#4648d4]">{eyebrow}</p> : null}
        <h1 className="text-2xl font-semibold tracking-tight text-[#0b1c30] sm:text-3xl">{title}</h1>
        {description ? <p className="mt-1 text-sm leading-6 text-[#464554]">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
