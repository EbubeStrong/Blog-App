import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { PlusCircle } from "lucide-react";
import ProfileCard from "@/components/profile/profile-card";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";


async function ProfilePage() {
  const session =  await auth.api.getSession({
    headers: await headers()
  });

  if (!session || !session.user) {
    // Handle unauthenticated access, e.g., redirect to login
    redirect('/');
  }

  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Profile</h1>
          </div>

          <Button asChild>
            <Link href={"/post/create"}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Post
            </Link>
          </Button>
        </div>

        <Card className="mb-6 max-w-[550px] mx-auto">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your Profile Information</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-2">
              {/* Client component handles inline edit */}
              <ProfileCard name={session.user.name || ""} email={session.user.email || ""} />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default ProfilePage