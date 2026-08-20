"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditLinkDialog } from "@/components/edit-link-dialog";
import { DeleteLinkDialog } from "@/components/delete-link-dialog";

interface LinkListItemProps {
  link: {
    id: number;
    originalUrl: string;
    shortCode: string;
    createdAt: Date;
  };
}

export function LinkListItem({ link }: LinkListItemProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="truncate">{link.originalUrl}</CardTitle>
            <CardDescription className="mt-1">
              Created {new Date(link.createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <EditLinkDialog 
              linkId={link.id}
              currentUrl={link.originalUrl}
              shortCode={link.shortCode}
            />
            <DeleteLinkDialog 
              linkId={link.id}
              shortCode={link.shortCode}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Short URL:</span>
          <code className="rounded bg-muted px-2 py-1 text-sm">
            /{link.shortCode}
          </code>
        </div>
      </CardContent>
    </Card>
  );
}
