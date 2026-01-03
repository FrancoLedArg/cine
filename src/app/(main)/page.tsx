import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";

const navigationItems = [
  {
    id: "movies",
    title: "Películas",
    description: "Gestiona y visualiza las películas disponibles",
    href: "/movies",
    icon: Film,
  },
];

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Sistema de Gestión de Cine
          </h1>
          <p className="text-muted-foreground">
            Accede a las secciones principales del sistema
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full" size="lg">
                    <Link href={item.href}>Ver {item.title}</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
