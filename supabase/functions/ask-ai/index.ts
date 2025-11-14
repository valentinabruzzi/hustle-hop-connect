import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.81.1';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userType } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Query profiles with experiences to provide real data
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select(`
        id,
        first_name,
        last_name,
        city,
        bio,
        average_rating,
        total_reviews,
        completed_jobs,
        experiences (
          title,
          company
        )
      `)
      .eq('profile_active', true)
      .order('average_rating', { ascending: false })
      .limit(10);

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
    }

    // Create context with real data
    const profilesContext = profiles && profiles.length > 0
      ? `\n\nProfili disponibili sulla piattaforma:\n${profiles.map(p => 
          `- ${p.first_name} ${p.last_name} (${p.city || 'Città non specificata'}): ${p.bio || 'Nessuna bio'}, Rating: ${p.average_rating || 0}/5 (${p.total_reviews || 0} recensioni), Lavori completati: ${p.completed_jobs || 0}. Esperienze: ${p.experiences?.map(e => e.title).join(', ') || 'Nessuna esperienza'}`
        ).join('\n')}`
      : '\n\nAttualmente non ci sono profili attivi sulla piattaforma.';

    const systemPrompt = userType === 'azienda' 
      ? `Sei un assistente AI per trovare lavoratori. REGOLE CRITICHE: 1) Rispondi in 2-3 frasi MASSIMO, senza formattazione. 2) Se chiedi una figura specifica (modella, hostess, ecc.) cerca nei profili disponibili. 3) Se trovi profili, dì solo: "Ho trovato [nome] da [città], rating [X]/5" 4) Se NON trovi profili, dì solo: "Attualmente non ci sono [figura] sulla piattaforma". 5) NO elenchi puntati, NO asterischi, NO hashtag, NO markdown.${profilesContext}`
      : `Sei un assistente AI per lavoratori. Rispondi in 2-3 frasi massimo, senza formattazione. Consigli pratici e diretti. NO elenchi, NO asterischi, NO markdown.${profilesContext}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite di richieste superato. Riprova tra poco." }), 
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crediti esauriti. Contatta il supporto." }), 
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Errore nella comunicazione con l'AI");
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: aiResponse }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in ask-ai function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Errore sconosciuto" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
