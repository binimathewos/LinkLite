import { getUserLinks } from "@/data/links";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { CreateLinkDialog } from "@/components/create-link-dialog";
import { LinkListItem } from "@/components/link-list-item";

export default async function DashboardPage() {
  const userLinks = await getUserLinks();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Links</h1>
          <p className="text-muted-foreground mt-2">
            Manage and view all your shortened links
          </p>
        </div>
        <CreateLinkDialog />
      </div>

      {userLinks.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No links yet. Create your first shortened link!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {userLinks.map((link) => (
            <LinkListItem key={link.id} link={link} />
          ))}
        </div>
      )}
    </div>
  );
}
