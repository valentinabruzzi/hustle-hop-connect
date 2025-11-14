import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProfiles } from "@/hooks/useProfiles";
import { InviteWorkerDialog } from "@/components/InviteWorkerDialog";
import { 
  MapPin, 
  Star,
  Briefcase,
  Filter,
  Users,
  Plane,
  Award,
  Send
} from "lucide-react";

const ExploreProfiles = () => {
  const [filters, setFilters] = useState({
    city: "",
    minRating: 0,
    availableForTravel: undefined as boolean | undefined
  });
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const { data: profiles = [], isLoading } = useProfiles(filters);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Trova Lavoratori</h1>
            <p className="text-muted-foreground">
              {isLoading ? 'Caricamento...' : `${profiles.length} ${profiles.length === 1 ? 'profilo disponibile' : 'profili disponibili'}`}
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Filter className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Filtri</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Città</Label>
                      <Input
                        id="city"
                        placeholder="Es. Milano"
                        value={filters.city}
                        onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rating">Valutazione minima</Label>
                      <Select 
                        value={filters.minRating.toString()} 
                        onValueChange={(value) => setFilters({...filters, minRating: parseFloat(value)})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Tutte le valutazioni" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Tutte le valutazioni</SelectItem>
                          <SelectItem value="3">3+ stelle</SelectItem>
                          <SelectItem value="4">4+ stelle</SelectItem>
                          <SelectItem value="4.5">4.5+ stelle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="travel">Disponibilità trasferte</Label>
                      <Select 
                        value={filters.availableForTravel === undefined ? "all" : filters.availableForTravel.toString()} 
                        onValueChange={(value) => setFilters({
                          ...filters, 
                          availableForTravel: value === "all" ? undefined : value === "true"
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Tutti" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tutti</SelectItem>
                          <SelectItem value="true">Disponibili</SelectItem>
                          <SelectItem value="false">Non disponibili</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setFilters({ city: "", minRating: 0, availableForTravel: undefined })}
                    >
                      Reset Filtri
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profiles Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {isLoading ? (
                  <Card className="p-12 text-center md:col-span-2">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground mt-4">Caricamento profili...</p>
                  </Card>
                ) : profiles.length === 0 ? (
                  <Card className="p-12 text-center md:col-span-2">
                    <div className="flex flex-col items-center gap-4">
                      <Users className="h-12 w-12 text-muted-foreground" />
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Nessun profilo trovato</h3>
                        <p className="text-muted-foreground mb-4">
                          Prova a modificare i filtri di ricerca
                        </p>
                        <Button 
                          variant="outline"
                          onClick={() => setFilters({ city: "", minRating: 0, availableForTravel: undefined })}
                        >
                          Reset Filtri
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  profiles.map((profile) => (
                    <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4 mb-4">
                          {/* Avatar */}
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl overflow-hidden">
                            {profile.avatar_url ? (
                              <img 
                                src={profile.avatar_url} 
                                alt={`${profile.first_name} ${profile.last_name}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-1">
                              {profile.first_name} {profile.last_name}
                            </h3>
                            {profile.city && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                                <MapPin className="h-3 w-3" />
                                <span>{profile.city}, {profile.province}</span>
                              </div>
                            )}
                            
                            {/* Rating and Stats */}
                            <div className="flex items-center gap-3 text-sm">
                              {profile.average_rating !== null && profile.average_rating > 0 && (
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{profile.average_rating.toFixed(1)}</span>
                                  <span className="text-muted-foreground">({profile.total_reviews})</span>
                                </div>
                              )}
                              {profile.completed_jobs !== null && profile.completed_jobs > 0 && (
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Briefcase className="h-3 w-3" />
                                  <span>{profile.completed_jobs} lavori</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Bio */}
                        {profile.bio && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {profile.bio}
                          </p>
                        )}

                        {/* Experiences Preview */}
                        {profile.experiences && profile.experiences.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Award className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">Esperienze</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {profile.experiences.slice(0, 3).map((exp: any) => (
                                <Badge key={exp.id} variant="secondary" className="text-xs">
                                  {exp.title}
                                </Badge>
                              ))}
                              {profile.experiences.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{profile.experiences.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                          {profile.available_for_travel && (
                            <Badge variant="secondary" className="text-xs">
                              <Plane className="h-3 w-3 mr-1" />
                              Disponibile per trasferte
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button asChild variant="outline" className="flex-1">
                          <Link to={`/profilo/${profile.id}`}>Vedi Profilo</Link>
                        </Button>
                        <Button 
                          onClick={() => setSelectedProfile(profile.id)}
                          className="flex-1"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Invita
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      <InviteWorkerDialog
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
        workerId={selectedProfile || ''}
      />
    </div>
  );
};

export default ExploreProfiles;
