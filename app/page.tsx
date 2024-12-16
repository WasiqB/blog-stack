import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenLine, Rocket, Calendar, Share2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-primary mb-6">
              Write Once, Publish Everywhere
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Create, schedule, and publish your blogs across multiple platforms
              with ease. Connect your Medium and Hashnode accounts to reach a
              wider audience.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <PenLine className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Rich Markdown Editor
              </h3>
              <p className="text-muted-foreground">
                Write your blogs with our powerful markdown editor with live
                preview support.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <Calendar className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Scheduling</h3>
              <p className="text-muted-foreground">
                Schedule your posts for the perfect time to reach your audience.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <Share2 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Cross-Platform Publishing
              </h3>
              <p className="text-muted-foreground">
                Publish simultaneously to Medium, Hashnode, and more platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Blogging Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of writers who trust our platform for their content
            management needs.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">Start Writing Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
