"use client";

import { Badge } from "@/registry/ui/badge";
import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function BadgeDemo() {
  const t = useTranslations("components.badge");
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge>{t("default")}</Badge>
        <Badge variant="destructive">{t("destructive")}</Badge>
        <Badge variant="outline">{t("outline")}</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="info">{t("info")}</Badge>
        <Badge variant="secondary">{t("secondary")}</Badge>
        <Badge variant="success">{t("success")}</Badge>
        <Badge variant="warning">{t("warning")}</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="default" icon={<Lock size={12} />}>
          {t("secure")}
        </Badge>
        {isVisible && (
          <Badge
            variant="outline"
            removable
            onRemove={() => setIsVisible(false)}
          >
            {t("removable")}
          </Badge>
        )}
      </div>
    </div>
  );
}
