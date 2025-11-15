import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Calendar, User, ArrowRight, ArrowLeft } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Come Creare un Profilo Hostess di Successo",
      excerpt: "I segreti per distinguersi e ricevere più inviti dalle aziende. Consigli pratici su foto, bio e presentazione.",
      author: "Team LastMinute.it",
      date: "15 Nov 2024",
      category: "Guide",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Le 10 Competenze Più Richieste nel 2024",
      excerpt: "Scopri quali sono le skill che le aziende cercano di più in hostess, steward e promoter per eventi di successo.",
      author: "Maria Bianchi",
      date: "10 Nov 2024",
      category: "Carriera",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Eventi Fashion: Cosa Aspettarsi",
      excerpt: "Una guida completa su come prepararsi per lavorare negli eventi di moda. Dress code, comportamenti e opportunità.",
      author: "Laura Rossi",
      date: "5 Nov 2024",
      category: "Eventi",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=400&fit=crop"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <section className="py-20 bg-gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog LastMinute.it
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Guide, consigli e novità dal mondo degli eventi
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-20">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna alla Home
            </Link>
          </Button>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <Link 
                      to={`/blog/${post.id}`}
                      className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Leggi
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Nuovi articoli in arrivo! Torna a trovarci presto.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
