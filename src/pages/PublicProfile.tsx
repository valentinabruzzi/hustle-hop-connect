import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  MapPin,
  Star,
  Briefcase,
  Languages,
  Award,
  Mail,
  Phone,
  Instagram,
  Linkedin
} from "lucide-react";

const PublicProfile = () => {
  const { id } = useParams();

  // Mock profile data
  const profile = {
    id: id || "mario-rossi",
    firstName: "Mario",
    lastName: "Rossi",
    city: "Milano",
    province: "MI",
    role: "Hostess & Steward",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop",
    ],
    bio: "Professionista con 5 anni di esperienza nel settore eventi e hospitality. Specializzato in eventi corporate, fashion e sportivi. Appassionato di comunicazione e relazioni con il pubblico.",
    rating: 4.8,
    reviewsCount: 24,
    completedJobs: 56,
    physicalInfo: {
      height: "178 cm",
      size: "M",
      shoeSize: "42",
      eyeColor: "Castani",
      hairColor: "Castano scuro"
    },
    languages: [
      { name: "Italiano", level: "Madrelingua" },
      { name: "Inglese", level: "C1 - Fluente" },
      { name: "Francese", level: "B1 - Intermedio" }
    ],
    experiences: [
      {
        title: "Hostess Fashion Week Milano",
        company: "Fashion Events SRL",
        period: "2024",
        description: "Gestione accoglienza ospiti VIP e assistenza durante le sfilate"
      },
      {
        title: "Steward Eventi Sportivi",
        company: "Sport Events Italia",
        period: "2023-2024",
        description: "Coordinamento flussi pubblico in grandi eventi sportivi"
      },
      {
        title: "Promoter Brand Luxury",
        company: "Luxury Marketing",
        period: "2022-2023",
        description: "Promozione brand di lusso in centri commerciali ed eventi"
      }
    ],
    certifications: [
      "Certificazione HACCP",
      "Primo Soccorso",
      "Patente B"
    ],
    socialMedia: {
      instagram: "@mario.rossi",
      linkedin: "mario-rossi-events"
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Header Card */}
            <Card className="mb-6">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img 
                      src={profile.avatar} 
                      alt={`${profile.firstName} ${profile.lastName}`}
                      className="w-32 h-32 rounded-full object-cover border-4 border-background shadow-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">
                          {profile.firstName} {profile.lastName}
                        </h1>
                        <div className="flex items-center gap-2 text-muted-foreground mb-3">
                          <MapPin className="h-4 w-4" />
                          <span>{profile.city}, {profile.province}</span>
                        </div>
                        <Badge variant="outline" className="text-sm">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {profile.role}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-warning text-warning" />
                        <span className="font-semibold text-lg">{profile.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({profile.reviewsCount} recensioni)
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">{profile.completedJobs}</span>
                        <span className="text-muted-foreground"> lavori completati</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {profile.bio}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6 pt-6 border-t border-border">
                  <Button className="bg-gradient-primary">
                    <Mail className="h-4 w-4 mr-2" />
                    Invita per Lavoro
                  </Button>
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Contatta
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                {/* Photo Gallery */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Galleria Foto</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {profile.gallery.map((photo, index) => (
                        <div 
                          key={index}
                          className="aspect-[4/3] rounded-lg overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
                        >
                          <img 
                            src={photo} 
                            alt={`Foto ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Experiences */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      Esperienze Principali
                    </h3>
                    <div className="space-y-4">
                      {profile.experiences.map((exp, index) => (
                        <div key={index} className="border-l-2 border-primary pl-4">
                          <h4 className="font-semibold">{exp.title}</h4>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                          <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                          <p className="text-sm">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Languages */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Languages className="h-5 w-5 text-primary" />
                      Lingue
                    </h3>
                    <div className="space-y-3">
                      {profile.languages.map((lang, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="font-medium">{lang.name}</span>
                          <Badge variant="outline">{lang.level}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Physical Info */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Dati Fisici</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Altezza:</span>
                        <span className="font-medium">{profile.physicalInfo.height}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Taglia:</span>
                        <span className="font-medium">{profile.physicalInfo.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Scarpe:</span>
                        <span className="font-medium">{profile.physicalInfo.shoeSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Occhi:</span>
                        <span className="font-medium">{profile.physicalInfo.eyeColor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Capelli:</span>
                        <span className="font-medium">{profile.physicalInfo.hairColor}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Certificazioni
                    </h3>
                    <div className="space-y-2">
                      {profile.certifications.map((cert, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-success mt-2"></div>
                          <span className="text-sm">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Social Media</h3>
                    <div className="space-y-3">
                      {profile.socialMedia.instagram && (
                        <a 
                          href={`https://instagram.com/${profile.socialMedia.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                        >
                          <Instagram className="h-4 w-4" />
                          <span>{profile.socialMedia.instagram}</span>
                        </a>
                      )}
                      {profile.socialMedia.linkedin && (
                        <a 
                          href={`https://linkedin.com/in/${profile.socialMedia.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                        >
                          <Linkedin className="h-4 w-4" />
                          <span>{profile.socialMedia.linkedin}</span>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PublicProfile;
