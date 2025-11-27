import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { usePublicProfile } from "@/hooks/useProfile";
import { 
  MapPin,
  Star,
  Briefcase,
  Languages,
  Award,
  Mail,
  Instagram,
  Linkedin,
  Loader2,
  Car,
  Plane,
  ArrowLeft,
  Facebook,
  Calendar,
  Phone,
  Home
} from "lucide-react";
import { useState } from "react";

const PublicProfile = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { data: profile, isLoading } = usePublicProfile(id);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    job: "",
    message: "",
  });
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Mock jobs for invitation
  const availableJobs = [
    { id: "1", title: "Hostess per Fashion Week Milano - 15-18 Dic" },
    { id: "2", title: "Promoter Evento Sportivo - 20 Dic" },
    { id: "3", title: "Steward per Concerto Arena - 18 Dic" },
  ];

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Invito inviato!",
      description: `Invito per ${profile?.first_name} inviato con successo.`,
    });
    setInviteDialogOpen(false);
    setInviteForm({ job: "", message: "" });
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Messaggio inviato!",
      description: `Il tuo messaggio è stato inviato a ${profile?.first_name}.`,
    });
    setContactDialogOpen(false);
    setContactForm({ name: "", email: "", message: "" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Profilo non trovato</h2>
            <p className="text-muted-foreground mb-4">Il profilo richiesto non esiste o non è attivo.</p>
            <Button asChild>
              <Link to="/">Torna alla Home</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const profilePicture = profile.gallery_photos?.find(p => p.is_profile_picture)?.photo_url || 
                         profile.avatar_url ||
                         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop";
  
  const galleryImages = profile.gallery_photos?.map(p => p.photo_url) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/esplora-profili">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna ai Profili
            </Link>
          </Button>
          <div className="max-w-5xl mx-auto">
            {/* Header Card */}
            <Card className="mb-6">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img 
                      src={profilePicture} 
                      alt={`${profile.first_name} ${profile.last_name}`}
                      className="w-32 h-32 rounded-full object-cover border-4 border-background shadow-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">
                          {profile.first_name} {profile.last_name}
                        </h1>
                        {(profile.city || profile.province) && (
                          <div className="flex items-center gap-2 text-muted-foreground mb-3">
                            <MapPin className="h-4 w-4" />
                            <span>{profile.city}{profile.province && `, ${profile.province}`}</span>
                          </div>
                        )}
                        <Badge variant="outline" className="text-sm">
                          <Briefcase className="h-3 w-3 mr-1" />
                          Dipendente
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-warning text-warning" />
                        <span className="font-semibold text-lg">{profile.average_rating?.toFixed(1) || '0.0'}</span>
                        <span className="text-sm text-muted-foreground">
                          ({profile.total_reviews || 0} recensioni)
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">{profile.completed_jobs || 0}</span>
                        <span className="text-muted-foreground"> lavori completati</span>
                      </div>
                    </div>

                    {profile.bio && (
                      <p className="text-muted-foreground leading-relaxed">
                        {profile.bio}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                  <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-primary">
                        <Mail className="h-4 w-4 mr-2" />
                        Invita per Lavoro
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Invita {profile.first_name} per un Lavoro</DialogTitle>
                        <DialogDescription>
                          Seleziona un lavoro e invia un invito diretto a questo professionista
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleInvite} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="job">Seleziona Lavoro</Label>
                          <Select
                            value={inviteForm.job}
                            onValueChange={(value) => setInviteForm({ ...inviteForm, job: value })}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Scegli un lavoro" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableJobs.map((job) => (
                                <SelectItem key={job.id} value={job.id}>
                                  {job.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Messaggio</Label>
                          <Textarea
                            id="message"
                            value={inviteForm.message}
                            onChange={(e) => setInviteForm({ ...inviteForm, message: e.target.value })}
                            rows={4}
                            placeholder="Scrivi un messaggio personalizzato..."
                          />
                        </div>
                        <Button type="submit" className="w-full bg-gradient-primary">
                          Invia Invito
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        Contatta
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Contatta {profile.first_name}</DialogTitle>
                        <DialogDescription>
                          Invia un messaggio diretto a questo professionista
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleContact} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Il tuo nome</Label>
                          <Input
                            id="name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">La tua email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-message">Messaggio</Label>
                          <Textarea
                            id="contact-message"
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            rows={4}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-gradient-primary">
                          Invia Messaggio
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Photo Gallery */}
            {galleryImages.length > 0 && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Gallery Foto</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((photo, idx) => (
                      <img 
                        key={idx}
                        src={photo} 
                        alt={`Foto ${idx + 1}`}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {/* Physical Info */}
              {(profile.height || profile.weight || profile.size || profile.shoe_size || profile.eye_color || profile.hair_color) && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Caratteristiche Fisiche
                    </h2>
                    <div className="space-y-3">
                      {profile.height && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Altezza</span>
                          <span className="font-medium">{profile.height} cm</span>
                        </div>
                      )}
                      {profile.weight && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Peso</span>
                          <span className="font-medium">{profile.weight} kg</span>
                        </div>
                      )}
                      {profile.size && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Taglia</span>
                          <span className="font-medium">{profile.size}</span>
                        </div>
                      )}
                      {profile.shoe_size && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Numero Scarpe</span>
                          <span className="font-medium">{profile.shoe_size}</span>
                        </div>
                      )}
                      {profile.eye_color && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Colore Occhi</span>
                          <span className="font-medium">{profile.eye_color}</span>
                        </div>
                      )}
                      {profile.hair_color && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Colore Capelli</span>
                          <span className="font-medium">{profile.hair_color}</span>
                        </div>
                      )}
                      {profile.hair_length && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Lunghezza Capelli</span>
                          <span className="font-medium">{profile.hair_length}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Additional Info */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Informazioni Aggiuntive</h2>
                  <div className="space-y-3">
                    {profile.birth_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span>Nato il {new Date(profile.birth_date).toLocaleDateString('it-IT')}</span>
                      </div>
                    )}
                    {profile.birth_place && (
                      <div className="flex items-center gap-2">
                        <Home className="h-5 w-5 text-muted-foreground" />
                        <span>Nato a {profile.birth_place}</span>
                      </div>
                    )}
                    {profile.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <span>{profile.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Car className="h-5 w-5 text-muted-foreground" />
                      <span>{profile.has_driving_license ? 'Patente B' : 'Nessuna patente'}</span>
                    </div>
                    {profile.has_own_car && (
                      <div className="flex items-center gap-2">
                        <Car className="h-5 w-5 text-muted-foreground" />
                        <span>Auto propria</span>
                      </div>
                    )}
                    {profile.available_for_travel && (
                      <div className="flex items-center gap-2">
                        <Plane className="h-5 w-5 text-muted-foreground" />
                        <span>Disponibile per trasferte</span>
                      </div>
                    )}
                    {profile.tattoos && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Tatuaggi</span>
                      </div>
                    )}
                    {profile.piercings && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Piercing</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Languages */}
            {profile.languages && profile.languages.length > 0 && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Languages className="h-5 w-5" />
                    Lingue
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {profile.languages.map((lang: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">{lang.name}</span>
                        <Badge variant="secondary">{lang.level}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Experiences */}
            {profile.experiences && profile.experiences.length > 0 && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Esperienze Lavorative
                  </h2>
                  <div className="space-y-6">
                    {profile.experiences.map((exp: any, idx: number) => (
                      <div key={idx} className="border-l-2 border-primary pl-4">
                        <h3 className="font-semibold text-lg">{exp.title}</h3>
                        <p className="text-primary mb-1">{exp.company}</p>
                        <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                        {exp.description && (
                          <p className="text-sm text-muted-foreground">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Certifications */}
            {profile.certifications && profile.certifications.length > 0 && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Certificazioni
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.certifications.map((cert: any, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-sm">
                        {cert.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Social Media */}
            {(profile.instagram || profile.linkedin || profile.facebook || profile.tiktok) && (
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Social Media</h2>
                  <div className="flex flex-wrap gap-4">
                    {profile.instagram && (
                      <a 
                        href={`https://instagram.com/${profile.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Instagram className="h-5 w-5" />
                        <span>{profile.instagram}</span>
                      </a>
                    )}
                    {profile.linkedin && (
                      <a 
                        href={`https://linkedin.com/in/${profile.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span>{profile.linkedin}</span>
                      </a>
                    )}
                    {profile.facebook && (
                      <a 
                        href={`https://facebook.com/${profile.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Facebook className="h-5 w-5" />
                        <span>{profile.facebook}</span>
                      </a>
                    )}
                    {profile.tiktok && (
                      <a 
                        href={`https://tiktok.com/@${profile.tiktok.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                        </svg>
                        <span>{profile.tiktok}</span>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PublicProfile;
