import type { CVData, TemplateId } from "@/types/cv-types";

export interface CVDocument {
  id?: string;

  userId: string;

  title: string;

  template: TemplateId;

  data: CVData;

  createdAt?: Date;

  updatedAt?: Date;
}
