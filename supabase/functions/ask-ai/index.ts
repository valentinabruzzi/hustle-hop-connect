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
    const { message, userType, conversationId } = await req.json();
    console.log('Request received:', { userType, hasConversationId: !!conversationId });
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error("Authorization header is missing");
    }
    
    // Initialize Supabase clients
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    const supabaseUser = createClient(
      SUPABASE_URL!,
      SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: authHeader,
          },
        },
      }
    );

    // Get user
    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      console.error('Auth error:', userError);
      throw new Error("User not authenticated");
    }
    console.log('User authenticated:', user.id);

    // Get or create conversation
    let currentConversationId = conversationId;
    if (!currentConversationId) {
      console.log('Creating new conversation for user:', user.id);
      const { data: newConv, error: convError } = await supabaseUser
        .from('ai_conversations')
        .insert({ user_id: user.id })
        .select()
        .single();
      
      if (convError) {
        console.error('Error creating conversation:', convError);
        throw convError;
      }
      currentConversationId = newConv.id;
      console.log('New conversation created:', currentConversationId);
    }

    // Get conversation history
    console.log('Fetching history for conversation:', currentConversationId);
    const { data: history, error: historyError } = await supabaseUser
      .from('ai_messages')
      .select('role, content')
      .eq('conversation_id', currentConversationId)
      .order('created_at', { ascending: true })
      .limit(20);

    if (historyError) {
      console.error('Error fetching history:', historyError);
      throw historyError;
    }
    console.log('History fetched:', history?.length || 0, 'messages');

    // Save user message
    console.log('Saving user message');
    const { error: saveError } = await supabaseUser
      .from('ai_messages')
      .insert({
        conversation_id: currentConversationId,
        role: 'user',
        content: message
      });
    
    if (saveError) {
      console.error('Error saving user message:', saveError);
      throw saveError;
    }

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
      ? `Sei un assistente AI per aziende. Puoi aiutare a: 1) Trovare lavoratori nella piattaforma 2) Creare annunci di lavoro accattivanti. 

QUANDO L'UTENTE VUOLE CREARE UN ANNUNCIO:
- Fai domande una alla volta per raccogliere: titolo lavoro, tipo (hostess/steward/promoter/etc), descrizione, città, provincia, date inizio/fine, compenso, numero posti, requisiti, dress code, benefit
- Sii conversazionale e chiedi in modo naturale
- Dopo aver raccolto tutte le info, usa la funzione create_job per creare l'annuncio

QUANDO L'UTENTE CERCA LAVORATORI:
- Cerca nei profili disponibili e suggerisci candidati con rating e esperienze
- Se non trovi profili adatti, dillo chiaramente

Rispondi in 2-3 frasi, senza formattazione markdown.${profilesContext}`
      : `Sei un assistente AI per lavoratori. Rispondi in 2-3 frasi massimo, senza formattazione. Consigli pratici e diretti. NO elenchi, NO asterischi, NO markdown.${profilesContext}`;

    // Define tools for job creation
    const tools = userType === 'azienda' ? [
      {
        type: "function",
        function: {
          name: "create_job",
          description: "Crea un nuovo annuncio di lavoro sulla piattaforma",
          parameters: {
            type: "object",
            properties: {
              title: { type: "string", description: "Titolo del lavoro" },
              type: { type: "string", enum: ["hostess", "steward", "promoter", "modella", "modello", "cameriere", "barista", "cuoco", "altro"], description: "Tipo di lavoro" },
              description: { type: "string", description: "Descrizione dettagliata e accattivante del lavoro" },
              company_name: { type: "string", description: "Nome dell'azienda" },
              city: { type: "string", description: "Città dove si svolge il lavoro" },
              province: { type: "string", description: "Provincia" },
              start_date: { type: "string", description: "Data inizio formato YYYY-MM-DD" },
              end_date: { type: "string", description: "Data fine formato YYYY-MM-DD" },
              duration: { type: "string", description: "Durata del lavoro (es. 1 giorno, 3 ore)" },
              compensation: { type: "string", description: "Compenso offerto" },
              total_spots: { type: "number", description: "Numero totale di posti disponibili" },
              requirements: { type: "string", description: "Requisiti richiesti (opzionale)" },
              dress_code: { type: "string", description: "Dress code richiesto (opzionale)" },
              benefits: { type: "string", description: "Benefit offerti (opzionale)" },
              urgent: { type: "boolean", description: "Se l'annuncio è urgente" }
            },
            required: ["title", "type", "description", "company_name", "city", "province", "start_date", "end_date", "duration", "compensation", "total_spots"]
          }
        }
      }
    ] : [];

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
          ...(history || []),
          { role: "user", content: message }
        ],
        ...(tools.length > 0 && { tools, tool_choice: "auto" })
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
    const choice = data.choices[0];
    const aiMessage = choice.message;
    console.log('AI response received', { hasToolCalls: !!aiMessage.tool_calls });

    // Handle tool calls
    if (aiMessage.tool_calls && aiMessage.tool_calls.length > 0) {
      const toolCall = aiMessage.tool_calls[0];
      console.log('Tool call detected:', toolCall.function.name);
      
      if (toolCall.function.name === 'create_job') {
        try {
          const jobData = JSON.parse(toolCall.function.arguments);
          console.log('Creating job with data:', jobData);
          
          // Create job in database
          const { data: newJob, error: jobError } = await supabase
            .from('jobs')
            .insert({
              ...jobData,
              created_by: user.id,
              filled_spots: 0
            })
            .select()
            .single();
          
          if (jobError) {
            console.error('Error creating job:', jobError);
            throw jobError;
          }
          
          console.log('Job created successfully:', newJob.id);
          
          const successMessage = `Perfetto! Ho creato l'annuncio "${jobData.title}". L'annuncio è ora visibile sulla piattaforma e i lavoratori potranno candidarsi.`;
          
          // Save assistant message
          await supabaseUser
            .from('ai_messages')
            .insert({
              conversation_id: currentConversationId,
              role: 'assistant',
              content: successMessage
            });
          
          return new Response(
            JSON.stringify({ 
              response: successMessage,
              conversationId: currentConversationId,
              jobCreated: true,
              jobId: newJob.id
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        } catch (error) {
          console.error('Error in job creation:', error);
          const errorMessage = "Mi dispiace, c'è stato un errore nella creazione dell'annuncio. Riprova.";
          
          await supabaseUser
            .from('ai_messages')
            .insert({
              conversation_id: currentConversationId,
              role: 'assistant',
              content: errorMessage
            });
          
          return new Response(
            JSON.stringify({ 
              response: errorMessage,
              conversationId: currentConversationId
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
      }
    }

    // Normal text response
    const aiResponse = aiMessage.content;
    console.log('Saving assistant message');
    const { error: saveAssistantError } = await supabaseUser
      .from('ai_messages')
      .insert({
        conversation_id: currentConversationId,
        role: 'assistant',
        content: aiResponse
      });
    
    if (saveAssistantError) {
      console.error('Error saving assistant message:', saveAssistantError);
    }

    console.log('Request completed successfully');
    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        conversationId: currentConversationId
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in ask-ai function:", error);
    const errorMessage = error instanceof Error ? error.message : "Errore sconosciuto";
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error("Error details:", { message: errorMessage, stack: errorStack });
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: errorStack 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
