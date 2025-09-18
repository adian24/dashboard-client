import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cx } from "@/utils";
import { X } from "lucide-react";

export const daysStatusText = (days?: number | null) => {
  if (days == null) return "-";
  if (days < 0) return `Overdue ${Math.abs(days)} hari`;
  if (days === 0) return "Jatuh tempo hari ini";
  return `Due dalam ${days} hari`;
};

export const statusBadge = (days?: number | null) => {
  if (days == null)
    return (
      <Badge variant="secondary" className="rounded-full">
        -
      </Badge>
    );
  if (days < 0) return <Badge className="rounded-full">Overdue</Badge>;
  if (days === 0)
    return (
      <Badge variant="destructive" className="rounded-full">
        Due Today
      </Badge>
    );
  return (
    <Badge variant="outline" className="rounded-full">
      Due in {days}d
    </Badge>
  );
};

export const StageBadge = ({ stage }: { stage?: string | null }) => {
  const txt = stage ?? "-";
  const isS1 = (stage ?? "").toLowerCase().includes("surveillance 1");
  const isS2 = (stage ?? "").toLowerCase().includes("surveillance 2");
  return (
    <Badge
      variant={isS1 ? "outline" : isS2 ? "secondary" : "outline"}
      className="rounded-full"
    >
      {txt}
    </Badge>
  );
};

export const UrgencyBadge = ({ level }: { level?: string | null }) => {
  const lv = (level ?? "").toLowerCase();
  const cls =
    lv === "critical"
      ? "bg-destructive text-destructive-foreground"
      : lv === "high"
      ? "bg-orange-500 text-white"
      : lv === "medium"
      ? "bg-yellow-500 text-black"
      : lv === "low"
      ? "bg-emerald-500 text-white"
      : "bg-muted text-muted-foreground";

  return (
    <Badge className={cx("rounded-full", cls)}>
      {level ? humanize(level) : "Unknown"}
    </Badge>
  );
};

export const humanize = (s: string) => {
  return s
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (m) => m.toUpperCase());
};

export const ActiveFilterChips = ({
  q,
  stage,
  urgency,
  iso,
  onClear,
  onClearAll,
}: {
  q: string;
  stage: "all" | "s1" | "s2";
  urgency: "all" | "low" | "medium" | "high" | "critical";
  iso: string;
  onClear: (key: "q" | "stage" | "urgency" | "iso") => void;
  onClearAll: () => void;
}) => {
  const chips: Array<{
    key: "q" | "stage" | "urgency" | "iso";
    label: string;
    value: string;
  }> = [];

  if (q) chips.push({ key: "q", label: "Search", value: q });
  if (stage !== "all")
    chips.push({
      key: "stage",
      label: "Stage",
      value: stage === "s1" ? "Surveillance 1" : "Surveillance 2",
    });
  if (urgency !== "all")
    chips.push({
      key: "urgency",
      label: "Urgency",
      value: capitalize(urgency),
    });
  if (iso !== "all") chips.push({ key: "iso", label: "ISO", value: iso });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <Badge key={c.key} variant="secondary" className="gap-1 pr-1">
          <span className="font-medium">{c.label}:</span> {c.value}
          <button
            className="ml-1 rounded-sm hover:bg-muted p-0.5"
            aria-label={`Clear ${c.label}`}
            onClick={() => onClear(c.key)}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </Badge>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-muted-foreground"
      >
        Clear all
      </Button>
    </div>
  );
};

export const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
