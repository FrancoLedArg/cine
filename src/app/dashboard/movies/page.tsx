import { getAllMovies } from "@/actions/movies";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Page() {
  const { data: movies } = await getAllMovies();

  if (!movies || movies.length === 0) {
    return (
      <div className="w-full max-w-4xl p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            No hay películas disponibles
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Películas</h1>
        <p className="text-muted-foreground">
          Lista de todas las películas disponibles
        </p>
      </div>

      <div className="space-y-4">
        {movies?.length === 0 ? (
          <Card>
            <CardContent className="py-6 text-center text-muted-foreground">
              No hay películas disponibles
            </CardContent>
          </Card>
        ) : (
          movies?.map((movie) => (
            <Card key={movie.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{movie.title}</CardTitle>
                {movie.description && (
                  <CardDescription>{movie.description}</CardDescription>
                )}
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
